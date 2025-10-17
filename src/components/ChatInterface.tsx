import { useRef, useEffect } from 'react';
import { VStack, Box, Text, Flex, Spinner, HStack } from '@chakra-ui/react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  isLoadingMessages: boolean;
}

export const ChatInterface = ({ messages, onSendMessage, isTyping, isLoadingMessages }: ChatInterfaceProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (isLoadingMessages) {
    return (
      <Flex direction="column" h="100vh" bg="gray.900" justify="center" align="center">
        <Spinner size="xl" color="brand.400" />
        <Text mt={4} color="gray.400">Loading Chat History...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" h="100vh" bg="gray.900">
      <Box p={4} borderBottom="1px solid" borderColor="gray.700">
        <HStack>
          <Text fontWeight="bold">CineBuddy</Text>
          <Box w={2} h={2} bg="green.400" borderRadius="full" />
          <Text fontSize="sm" color="gray.400">Online</Text>
        </HStack>
      </Box>

      <VStack ref={scrollRef} flex={1} spacing={4} py={4} overflowY="auto">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
              layout
            >
              <MessageBubble message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%' }}
            layout
          >
            <MessageBubble message={{ id: 'typing', sender: 'ai', text: '', created_at: '' }} isTyping />
          </motion.div>
        )}
      </VStack>
      
      <ChatInput onSendMessage={onSendMessage} isLoading={isTyping} />
    </Flex>
  );
};
