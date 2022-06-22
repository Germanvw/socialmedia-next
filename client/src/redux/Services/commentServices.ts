import { fetchToken } from '../../hooks/useFetch';

interface CreateCommentProps {
  id: string;
  comment: string;
}

const createComment = async ({ id, comment }: CreateCommentProps) => {
  const req = await fetchToken(`comments/${id}`, { id, comment }, 'POST');
  const answ = await req.json();
  if (answ.ok) {
    return answ;
  } else {
    throw new Error(answ.msg);
  }
};

const deleteComment = async (id: number) => {
  const req = await fetchToken(`comments/${id}`, {}, 'DELETE');
  const answ = await req.json();
  if (answ.ok) {
    return id;
  } else {
    throw new Error(answ.msg);
  }
};

const fetchCommentsByPost = async (id: string) => {
  const req = await fetchToken(`comments/${id}`, {});
  const answ = await req.json();
  if (answ.ok) {
    return answ.comments;
  } else {
    throw new Error(answ.msg);
  }
};

export const commentServices = {
  createComment,
  deleteComment,
  fetchCommentsByPost,
};
