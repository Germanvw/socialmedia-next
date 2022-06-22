import { fetchToken } from '../../hooks/useFetch';

const postFetchAll = async () => {
  const req = await fetchToken('posts', {});
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const postFetchByUser = async (id: number) => {
  const req = await fetchToken(`posts/user/${id}`, {});
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const postCreate = async ({ text, image }: { text: string; image: string }) => {
  const req = await fetchToken('posts', { text, image }, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};
const postDelete = async (id: number) => {
  const req = await fetchToken(`posts/${id}`, {}, 'DELETE');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const postFetchFavorite = async () => {
  const req = await fetchToken('posts/favorite/user/', {});
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const postChangeFavorite = async (id: number) => {
  const req = await fetchToken(`posts/favorite/${id}`, {}, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

export const postServices = {
  postFetchAll,
  postFetchByUser,
  postCreate,
  postDelete,
  postFetchFavorite,
  postChangeFavorite,
};
