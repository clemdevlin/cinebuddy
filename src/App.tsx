import { useState, useEffect } from 'react';
import { Grid, GridItem, useToast, Box } from '@chakra-ui/react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { Message } from './types';
import { supabase } from './lib/supabaseClient';
import { getGeminiResponse } from './lib/geminiClient';
import { RealtimeChannel } from '@supabase/supabase-js';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: 'Error Fetching History',
          description: 'Could not fetch chat history from the database.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setMessages(data || []);
      }
      setIsLoadingMessages(false);
    };

    fetchMessages();

    const channel: RealtimeChannel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleSendMessage = async (text: string) => {
    const userMessage = { text, sender: 'user' as const };

    const { error: userError } = await supabase
      .from('messages')
      .insert(userMessage);

    if (userError) {
      toast({
        title: 'Message Not Sent',
        description: 'Could not save your message to the database.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setMessages((prev) => [...prev, userMessage]);
    
    setIsTyping(true);

    try {
      const aiResponseText = await getGeminiResponse(text);
      const aiMessage = { text: aiResponseText, sender: 'ai' as const };
      
      const { error: aiError } = await supabase
        .from('messages')
        .insert(aiMessage);

      if (aiError) {
        throw new Error('Could not save the AI response to the database.');
      }

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      console.error(error);
      toast({
        title: 'AI Response Error',
        description: errorMessage,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Box h="100vh" w="100vw" bg="gray.900">
      <Grid
        templateColumns={{ base: '1fr', md: '320px 1fr' }}
        templateRows={{ base: 'auto 1fr', md: '1fr' }}
        h="full"
        w="full"
        overflow="hidden"
      >
        <GridItem 
          display={{ base: 'none', md: 'block' }}
          overflowY="auto"
        >
          <Sidebar onSuggestionClick={handleSendMessage} />
        </GridItem>
        <GridItem overflowY="auto">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            isLoadingMessages={isLoadingMessages}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
