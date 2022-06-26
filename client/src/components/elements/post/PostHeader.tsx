import { Avatar, Box, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { UserAvatar } from '../user/UserAvatar';

export interface HeaderProps {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  image: string;
}

interface HeaderWithCreated extends HeaderProps {
  created_at: string;
}

export const PostHeader = ({
  userId,
  username,
  firstname,
  lastname,
  image,
  created_at,
}: HeaderWithCreated) => {
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      spacing={4}
      w='100%'
      justifyContent='center'
      alignItems={{ base: 'center', sm: 'flex-start' }}
    >
      <UserAvatar
        avatarData={{ userId, username, firstname, lastname, image }}
        label={`@ ${username}`}
      />
      <Spacer />
      <Text color={'gray.500'}>
        {new Date(created_at!).toLocaleDateString()}
      </Text>
    </Stack>
  );
};
