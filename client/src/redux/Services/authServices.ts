import { fetchNoToken, fetchToken } from '../../hooks/useFetch';
import { RegisterUser, UpdateUser } from '../../interfaces/UserInterfaces';

const register = async (user: RegisterUser) => {
  const req = await fetchNoToken('auth/register', user, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const login = async (user: { email: string; password: string }) => {
  const req = await fetchNoToken('auth', user, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const userUpdate = async (user: UpdateUser) => {
  const req = await fetchToken('auth/user', user, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const refreshToken = async () => {
  const req = await fetchToken(`auth`, {});
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

export const authServices = {
  login,
  register,
  refreshToken,
  userUpdate,
};
