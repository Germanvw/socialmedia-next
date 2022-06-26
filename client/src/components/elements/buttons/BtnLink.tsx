import { Box, Button, Stack } from '@chakra-ui/react';
import React from 'react';

export const BtnLink = ({
  text,
  onClick,
  icon,
}: {
  text: string;
  onClick: () => void;
  icon: any;
}) => {
  return (
    <Button
      bg='transparent'
      _hover={{ bg: 'transparent', color: 'primary' }}
      _active={{ bg: 'transparent' }}
      onClick={() => onClick()}
    >
      <Box pr={4} fontSize={20}>
        {icon}
      </Box>
      {text}
    </Button>
  );
};
