import { Avatar, Box, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { HeaderProps } from '../post/PostHeader';

export const UserAvatar = ({ avatarData }: any) => {
  const { image, userId, firstname, lastname, username } = avatarData;
  return (
    <>
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
    </>
  );
};
