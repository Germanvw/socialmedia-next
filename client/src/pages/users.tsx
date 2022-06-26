import { Box, SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserCard } from '../components/elements/user/UserCard';
import { fetchToken } from '../hooks/useFetch';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { UserDataProps } from '../interfaces/UserInterfaces';

const Users = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const [users, setUsers] = useState<UserDataProps[]>([]);

  const fetchUserAll = async () => {
    const req = await fetchToken('users/', {});
    const { users } = await req.json();
    const filterSelf = users.filter(
      (item: UserDataProps) => item.id !== user!.id
    );
    setUsers(filterSelf);
  };

  useEffect(() => {
    // if (!user) router.push('/auth/login');
    if (user) fetchUserAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SimpleGrid columns={[1, 1, 2, 2, 3, 4]} gap={6}>
      {users?.map((user: UserDataProps) => (
        <Box w='100%' key={user?.id}>
          <UserCard user={user} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Users;
