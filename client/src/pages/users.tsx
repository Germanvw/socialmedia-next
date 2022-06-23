import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserCard } from '../components/elements/user/UserCard';
import { fetchUserAll } from '../helpers/fetchUserAll';
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
    <>
      {users?.map((user: UserDataProps) => (
        <UserCard user={user} key={user?.id} />
      ))}
    </>
  );
};

export default Users;
