import {
  Avatar,
  Box,
  Heading,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FriendItemProps } from '../../../interfaces/UserInterfaces';
import { MetaData } from './MetaData';
import { Button } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../../hooks/useRedux';
import {
  startFriendRemove,
  startFriendRequestSend,
} from '../../../redux/Slices/friendSlice';

export const UserInformation = ({ contact }: { contact: FriendItemProps }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { friendList } = useAppSelector((state) => state.friend);

  const {
    id,
    username,
    firstname,
    lastname,
    gender,
    age,
    country,
    province,
    metaData,
    image,
  } = contact;

  const dispatch = useAppDispatch();

  return (
    <Stack
      borderWidth='1px'
      borderRadius='lg'
      w='100%'
      maxW='100%'
      direction={{ base: 'column', md: 'row' }}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      bg={useColorModeValue('light', 'dark')}
      boxShadow={'2xl'}
      px={4}
      py={6}
      my={6}
    >
      <Stack direction={{ base: 'column', md: 'row' }} align='center' w='100%'>
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Stack justifyContent='center' align='center'>
            <Box>
              <Avatar src={image} h='80px' w='80px' />
            </Box>
            <Heading
              fontSize={'lg'}
              fontFamily={'body'}
              _hover={{ cursor: 'pointer' }}
            >
              {`${firstname} ${lastname}`}
            </Heading>
            <Text
              fontWeight={600}
              color={'gray.500'}
              size='sm'
              mb={4}
              _hover={{ cursor: 'pointer' }}
            >
              @{username}
            </Text>
          </Stack>
        </Stack>
        <Spacer />
        <Stack justifyContent='center' align='center'>
          <Text pl={4} fontWeight={600}>
            Information
          </Text>
          <Stack spacing={0} align={'center'} direction='row'>
            <Text fontSize={'sm'} pl={4} color={'gray.500'}>
              {`${country?.name}, ${province}`}
            </Text>
          </Stack>

          <Stack spacing={0} align={'center'} direction='row'>
            <Text fontSize={'sm'} pl={4} color={'gray.500'}>
              {`${gender?.name} - ${age} years old.`}
            </Text>
          </Stack>
        </Stack>
        <Spacer />
        <Stack align='center' justifyContent='center'>
          <MetaData
            friends={metaData?.friends}
            likes={metaData?.likes}
            posts={metaData?.posts}
          />
          {user?.id !== id && (
            <Box _hover={{ cursor: 'pointer' }} pt='4'>
              <Button
                onClick={
                  friendList?.some((friend) => friend.id === id)
                    ? () => dispatch(startFriendRemove(id))
                    : () => dispatch(startFriendRequestSend(id))
                }
              >{`${
                friendList?.some((friend) => friend.id === id)
                  ? 'Delete'
                  : 'Add'
              } Friend`}</Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
