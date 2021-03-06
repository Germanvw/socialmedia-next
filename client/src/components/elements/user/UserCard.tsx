import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { UserDataProps } from '../../../interfaces/UserInterfaces';
import { BtnFriend } from '../buttons/BtnFriend';
import { MetaData } from './MetaData';

export const UserCard = ({ user }: { user: UserDataProps }) => {
  const {
    firstname,
    lastname,
    image,
    metaData,
    username,
    province,
    country,
    id,
  } = user;
  const { friendList } = useAppSelector((state) => state.friend);

  const { likes, friends, posts } = metaData;

  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Box h={'120px'} w={'full'} bg='primary'></Box>
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={image}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {`${firstname} ${lastname}`}
            </Heading>
            <Text fontWeight={600} py={2} color={'gray.500'} size='sm' mb={4}>
              @{username}
            </Text>
            <Text color={'gray.500'}>{`${province} ${country?.name}`}</Text>
          </Stack>
          <MetaData posts={posts} likes={likes} friends={friends} />
          <Stack justifyContent='center' align='center' pt={2}>
            <BtnFriend
              isFriend={friendList?.some((friend) => friend.id === id)}
              id={id}
            />
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};
