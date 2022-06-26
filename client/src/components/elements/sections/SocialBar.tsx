import { Stack } from '@chakra-ui/react';
import { FriendList } from '../user/FriendList';
import { FriendRequestList } from '../user/FriendRequestList';

export const SocialBar = () => {
  return (
    <Stack direction={{ base: 'row', lg: 'column' }}>
      <FriendList />
      <FriendRequestList />
    </Stack>
  );
};
