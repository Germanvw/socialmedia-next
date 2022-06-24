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
import { MetaData } from './MetaData';

export const UserCard = ({ user }: { user: UserDataProps }) => {
  const { firstname, lastname, image, metaData, username, province, country } =
    user;
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
          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            {friendList?.find((friend: any) => friend.username === username)
              ? 'Remove'
              : 'Add'}
          </Button>
        </Box>
      </Box>
    </Center>
  );
};
