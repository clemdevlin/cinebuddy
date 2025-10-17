import { Box, VStack, Heading, Text, Button, Wrap, WrapItem, HStack } from '@chakra-ui/react';
import { Film } from 'lucide-react';

interface SidebarProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "Underrated sci-fi from the 2010s",
  "Cozy movie for a rainy night",
  "Movies like Inception",
  "Light-hearted for a Friday night",
];

export const Sidebar = ({ onSuggestionClick }: SidebarProps) => {
  return (
    <VStack
      h="full"
      w="full"
      p={{ base: 6, md: 8 }}
      spacing={8}
      align="flex-start"
      borderRight={{ md: '1px solid' }}
      borderColor={{ md: 'gray.700' }}
      bg="gray.800"
    >
      <HStack spacing={3}>
        <Film size={32} color="var(--chakra-colors-brand-400)" />
        <Heading size="lg">CineBuddy</Heading>
      </HStack>
      <VStack spacing={3} align="flex-start">
        <Text fontSize="md" color="gray.300">
          Your personal AI film expert.
        </Text>
        <Text fontSize="sm" color="gray.400">
          Ask me for movie recommendations based on genre, mood, actors, or anything else you can think of!
        </Text>
      </VStack>
      <VStack w="full" align="flex-start" spacing={4}>
        <Text fontSize="sm" fontWeight="medium" color="gray.400">Try these prompts:</Text>
        <Wrap>
          {suggestions.map((text) => (
            <WrapItem key={text}>
              <Button
                size="sm"
                variant="suggestion"
                onClick={() => onSuggestionClick(text)}
              >
                {text}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </VStack>
  );
};
