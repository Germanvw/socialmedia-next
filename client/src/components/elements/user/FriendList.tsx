import { Heading, Stack, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { UserAvatar } from './UserAvatar';

export const FriendList = () => {
  const { friendList } = useAppSelector((state) => state.friend);
  console.log(friendList);
  return (
    <Stack direction='column' w='320px' p='0 40px 0 40px'>
      <Stack direction='row' align='center' pt={{ base: 0, lg: '80px' }}>
        <Heading as='h4' fontSize='26px'>
          Contacts
        </Heading>
        <Text p={2} fontSize='20px' fontWeight={600}>
          {friendList ? friendList.length : 0}
        </Text>
      </Stack>
      {friendList?.length > 0 ? (
        friendList?.map(
          ({ id: userId, username, lastname, firstname, image }) => (
            <Stack direction='row' key={userId} py={2}>
              <UserAvatar
                avatarData={{ userId, username, firstname, lastname, image }}
                label={`@ ${username}`}
                space={true}
              />
            </Stack>
          )
        )
      ) : (
        <Text>No friends found</Text>
      )}
    </Stack>
  );
};
