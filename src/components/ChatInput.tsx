import { useState, FormEvent } from 'react';
import { Box, HStack, Input, IconButton } from '@chakra-ui/react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" p={{ base: 4, md: 6 }}>
      <HStack>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask for a movie recommendation..."
          bg="gray.700"
          border="1px solid"
          borderColor="gray.600"
          _hover={{ borderColor: 'gray.500' }}
          _focus={{ borderColor: 'brand.400', boxShadow: `0 0 0 1px var(--chakra-colors-brand-400)` }}
          isDisabled={isLoading}
        />
        <IconButton
          aria-label="Send message"
          icon={<Send size={20} />}
          type="submit"
          colorScheme="brand"
          isLoading={isLoading}
          isDisabled={!inputValue.trim()}
        />
      </HStack>
    </Box>
  );
};
