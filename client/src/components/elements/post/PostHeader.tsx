import { Avatar, Box, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface HeaderProps {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  image: string;
  created_at: string;
}

export const PostHeader = ({
  userId,
  username,
  firstname,
  lastname,
  image,
  created_at,
}: HeaderProps) => {
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      spacing={4}
      w='100%'
      justifyContent='center'
      alignItems={{ base: 'center', sm: 'flex-start' }}
    >
      <Box _hover={{ cursor: 'pointer' }}>
        <Avatar src={image} />
      </Box>
      <Stack direction={'column'} spacing={0} fontSize={'sm'}>
        <Link href={`/user/${userId}`}>
          <Heading
            fontSize={'lg'}
            fontFamily={'body'}
            _hover={{ cursor: 'pointer' }}
          >
            {`${firstname} ${lastname}`}
          </Heading>
        </Link>
        <Link href={`/user/${userId}`}>
          <Text
            fontWeight={600}
            color={'gray.500'}
            size='sm'
            mb={4}
            _hover={{ cursor: 'pointer' }}
          >
            @{username}
          </Text>
        </Link>
      </Stack>
      <Spacer />
      <Text color={'gray.500'}>
        {new Date(created_at).toLocaleDateString()}
      </Text>
    </Stack>
  );
};
