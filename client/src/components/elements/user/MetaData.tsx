import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

export const MetaData = ({
  likes,
  friends,
  posts,
  direction = 'row',
}: {
  likes: number;
  friends: number;
  posts: number;
  direction?: 'row' | 'column';
}) => {
  return (
    <Stack direction={direction} justify={'center'} spacing={6}>
      <Stack spacing={0} align={'center'}>
        <Text fontWeight={600}>{likes}</Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Likes
        </Text>
      </Stack>
      <Stack spacing={0} align={'center'}>
        <Text fontWeight={600}>{friends}</Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Friends
        </Text>
      </Stack>
      <Stack spacing={0} align={'center'}>
        <Text fontWeight={600}>{posts}</Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Posts
        </Text>
      </Stack>
    </Stack>
  );
};
