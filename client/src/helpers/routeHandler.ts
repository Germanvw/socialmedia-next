import { NextRouter } from 'next/router';
import { UserDataWithEmail } from '../interfaces/UserInterfaces';

export const handleProtecteRoute = (
  user: UserDataWithEmail | null,
  router: NextRouter
) => {
  if (!user) return router.push('/auth/login');
};

export const handleAuthRoute = (
  user: UserDataWithEmail,
  router: NextRouter
) => {
  if (user) return router.push('/');
};
