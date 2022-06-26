import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { UserAvatar } from './UserAvatar';
import { startFriendRequestResponse } from '../../../redux/Slices/friendSlice';

export const FriendRequestList = () => {
  const { friendRequestList } = useAppSelector((state) => state.friend);

  const dispatch = useAppDispatch();
  const handleResponse = (id: number, response: number) => {
    console.log(id, response);
    dispatch(startFriendRequestResponse({ id, response }));
  };
  return (
    <Stack direction='column' w='320px' p='0 40px 0 40px'>
      <Stack direction='row' align='center' py={4}>
        <Heading as='h4' fontSize='26px'>
          Requests
        </Heading>
        <Text p={2} fontSize='20px' fontWeight={600}>
          {friendRequestList ? friendRequestList.length : 0}
        </Text>
      </Stack>
      {friendRequestList?.length > 0 ? (
        friendRequestList?.map(({ user, requestData }) => (
          <Stack direction='row' key={user?.id} py={2}>
            <UserAvatar
              avatarData={{
                userId: user?.id,
                username: user?.username,
                firstname: user?.firstname,
                lastname: user?.lastname,
                image: user?.image,
              }}
              label={`Friend Request`}
              space={true}
            />
            <Stack>
              <Button onClick={() => handleResponse(requestData?.id, 1)}>
                Accept
              </Button>
              <Button onClick={() => handleResponse(requestData?.id, 0)}>
                Decline
              </Button>
            </Stack>
          </Stack>
        ))
      ) : (
        <Text>No friends found</Text>
      )}
    </Stack>
  );
};
