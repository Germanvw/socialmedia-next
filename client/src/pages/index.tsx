import type { NextPage } from 'next';
import { Loading } from '../components/elements/Loading';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useEffect } from 'react';
import {
  startFriendFetchAll,
  startFriendRequestFetch,
} from '../redux/Slices/friendSlice';
import {
  startPostFetchAll,
  startPostFetchFavorite,
} from '../redux/Slices/postSlice';
import { Center, Flex, Heading } from '@chakra-ui/react';
import { PostList } from '../components/elements/post/PostList';

const Home: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (!user) router.push('/auth/login');
    if (user) {
      dispatch(startFriendFetchAll());
      dispatch(startFriendRequestFetch());
      dispatch(startPostFetchAll());
      dispatch(startPostFetchFavorite());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <Loading />;

  return (
    <Flex
      direction='column'
      px={{ base: 6, sm: 10 }}
      maxW='800px'
      width='100%'
      className='wrapper'
    >
      <Center>
        <Heading mt={4} as='h1'>
          Posts
        </Heading>
      </Center>
      <PostList />
    </Flex>
  );
};

export default Home;
