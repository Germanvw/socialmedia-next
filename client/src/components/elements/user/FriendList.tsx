import { Heading, Stack, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { FriendItem } from './FriendItem';

export const FriendList = () => {
  const { friendList } = useAppSelector((state) => state.friend);

  return (
    <Stack direction='column' w='320px' p='0 40px 0 40px'>
      <Stack direction='row' align='center' pt={{ base: 0, lg: '80px' }}>
        <Heading as='h4'>Contacts</Heading>
        <Text p={2} fontSize='20px' fontWeight={600}>
          {friendList ? friendList.length : 0}
        </Text>
      </Stack>
      {friendList?.length > 0 ? <FriendItem /> : <Text>No friends found</Text>}
    </Stack>
  );
};
