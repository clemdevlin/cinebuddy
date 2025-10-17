import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { Bot } from 'lucide-react';
import { Message } from '../types';
import { TypingIndicator } from './TypingIndicator';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export const MessageBubble = ({ message, isTyping = false }: MessageBubbleProps) => {
  const isAI = message.sender === 'ai';

  return (
    <Flex
      w="full"
      justify={isAI ? 'flex-start' : 'flex-end'}
      px={{ base: 4, md: 6 }}
    >
      <Flex
        maxW={{ base: '80%', md: '65%' }}
        align="flex-start"
        direction={isAI ? 'row' : 'row-reverse'}
        gap={3}
      >
        {isAI && (
          <Avatar
            size="sm"
            icon={<Bot size={20} />}
            bg="brand.600"
            color="white"
          />
        )}
        <Box
          bg={isAI ? 'gray.700' : 'brand.500'}
          color={isAI ? 'gray.50' : 'white'}
          px={4}
          py={isTyping ? 2 : 2}
          borderRadius="lg"
          borderTopLeftRadius={isAI ? 'none' : 'lg'}
          borderTopRightRadius={isAI ? 'lg' : 'none'}
          minH="40px"
          display="flex"
          alignItems="center"
        >
          {isTyping ? <TypingIndicator /> : <Text whiteSpace="pre-wrap">{message.text}</Text>}
        </Box>
      </Flex>
    </Flex>
  );
};
