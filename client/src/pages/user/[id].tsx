import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Loading } from '../../components/elements/Loading';
import { UserInformation } from '../../components/elements/user/UserInformation';
import { fetchToken } from '../../hooks/useFetch';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { FriendItemProps } from '../../interfaces/UserInterfaces';
import { startPostFetchByUser } from '../../redux/Slices/postSlice';
import { PostList } from '../../components/elements/post/PostList';

const User = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { postList } = useAppSelector((state) => state.posts);
  const { query } = useRouter();

  const dispatch = useAppDispatch();

  const [contact, setContact] = useState<FriendItemProps | null>(null);

  const fetchContact = async () => {
    const req = await fetchToken(`users/${parseInt(query?.id as string)}`, {});
    const { user } = await req.json();
    setContact(user);
  };

  useEffect(() => {
    if (user?.id === parseInt(query?.id as string)) {
      setContact(user);
    } else fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query) {
      dispatch(startPostFetchByUser(parseInt(query?.id as string)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!contact || !user) return <Loading />;
  return (
    <Flex
      direction='column'
      px={{ base: 6, sm: 10 }}
      maxW='800px'
      width='100%'
      height='100%'
      className='wrapper'
    >
      <UserInformation contact={contact} />
      <Heading my={4} as='h2' size='md'>
        Comments
      </Heading>
      <PostList postList={postList} />
    </Flex>
  );
};

export default User;
