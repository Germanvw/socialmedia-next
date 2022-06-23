import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Loading } from '../components/elements/Loading';
import { useAppSelector } from '../hooks/useRedux';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/auth/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <Loading />;
  return <div>main</div>;
};

export default Home;
