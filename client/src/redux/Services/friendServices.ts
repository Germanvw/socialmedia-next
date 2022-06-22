import { fetchToken } from '../../hooks/useFetch';

const friendRequestFetch = async () => {
  const req = await fetchToken('friend/req', {});
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const friendRequestSend = async (id: number) => {
  const req = await fetchToken('friend/req', { receiverID: id }, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const friendRequestResponse = async (resp: {
  id: number;
  response: number;
}) => {
  const { id, response } = resp;
  const req = await fetchToken(`friend/req/${id}`, { response }, 'PUT');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const friendFetchAll = async () => {
  const req = await fetchToken('friend', {});
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const friendAdd = async (user2: number) => {
  const req = await fetchToken('friend', { user2 }, 'POST');
  const answ = await req.json();
  const user = await fetchToken(`users/${answ.friend}`, {});
  if (answ.ok) {
    return await user.json();
  } else {
    throw new Error(answ.msg);
  }
};

const friendRemove = async (user2: number) => {
  const req = await fetchToken('friend', { user2 }, 'PUT');
  const answ = await req.json();
  if (answ.ok) {
    return { answ, id: user2 };
  } else {
    throw new Error(answ.msg);
  }
};

export const friendServices = {
  friendRequestFetch,
  friendRequestSend,
  friendRequestResponse,
  friendFetchAll,
  friendAdd,
  friendRemove,
};
