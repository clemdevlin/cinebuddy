import { Box, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Dot = motion(Box);

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const dotVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const dotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut',
};

export const TypingIndicator = () => {
  return (
    <HStack spacing={1} justify="center" align="flex-end" h="20px">
      <Dot
        variants={containerVariants}
        initial="start"
        animate="end"
        display="flex"
        gap="4px"
      >
        <Dot
          bg="gray.400"
          w="6px"
          h="6px"
          borderRadius="full"
          variants={dotVariants}
          transition={dotTransition}
        />
        <Dot
          bg="gray.400"
          w="6px"
          h="6px"
          borderRadius="full"
          variants={dotVariants}
          transition={dotTransition}
        />
        <Dot
          bg="gray.400"
          w="6px"
          h="6px"
          borderRadius="full"
          variants={dotVariants}
          transition={dotTransition}
        />
      </Dot>
    </HStack>
  );
};
