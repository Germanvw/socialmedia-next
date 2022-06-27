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
import { Center, Flex, Heading, Stack } from '@chakra-ui/react';
import { PostList } from '../components/elements/post/PostList';
import { SearchUser } from '../components/elements/user/SearchUser';

const Home: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { postList } = useAppSelector((state) => state.posts);
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
      <Stack mt={4}>
        <SearchUser />
      </Stack>
      <Center>
        <Heading mt={4} as='h1'>
          Posts
        </Heading>
      </Center>
      <PostList postList={postList} />
    </Flex>
  );
};

export default Home;
