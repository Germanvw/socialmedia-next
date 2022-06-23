import { fetchToken } from '../hooks/useFetch';
import { authActions } from '../redux/Slices/authSlice';

export const handleChangeLike = async (
  id: number,
  userId: number,
  dispatch: any
) => {
  const req = await fetchToken(`likes/${id}`, { post_author: userId }, 'POST');
  const { author, ok, type } = await req.json();
  if (ok) {
    if (type === 'like' && author === userId) {
      dispatch(authActions.handleLikeQuantity(1));
      return true;
    } else if (author === userId) {
      dispatch(authActions.handleLikeQuantity(-1));
      return false;
    }
    return false;
  }
};

export const fetchLikeStatus = async (id: number) => {
  // Busca si el usuario ya le dio like a la publicacion
  const req = await fetchToken(`likes/${id}`, {});
  const answ = await req.json();

  if (answ.liked) return true;
  // return { liked: true, likes: likes + 1 };

  // return { liked: false, likes };
  return false;
};

export const fetchFavoriteStatus = async (id: number) => {
  const req = await fetchToken(`posts/favoritebyuser/${id}`, {});
  const { isFavorite } = await req.json();
  if (isFavorite) return true;
  return false;
};

export const fetchCurrentLikeCount = async (id: number) => {
  const req = await fetchToken(`likes/post/${id}`, {});
  const answ = await req.json();
  return answ?.likes;
};
