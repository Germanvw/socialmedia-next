import { Heading, Stack } from '@chakra-ui/react';
import { PostList } from '../components/elements/post/PostList';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { useEffect } from 'react';
import { startPostFetchFavorite } from '../redux/Slices/postSlice';
import { Loading } from '../components/elements/Loading';

const Favorites = () => {
  const { postListFav } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startPostFetchFavorite());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <Loading />;

  return (
    <Stack direction='column'>
      <Heading my={4}>Favorites</Heading>
      <PostList postList={postListFav} />
    </Stack>
  );
};

export default Favorites;
