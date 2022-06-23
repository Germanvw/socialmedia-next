import { Box, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { fetchLikeStatus, handleChangeLike } from '../../../helpers/fetchPost';
import { useAppDispatch } from '../../../hooks/useRedux';

export const BtnLike = ({
  likes,
  id,
  userId,
}: {
  likes: number;
  id: number;
  userId: number;
}) => {
  const dispatch = useAppDispatch();

  const [likesCount, setLikesCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    await handleChangeLike(id, userId, dispatch);
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    }
    if (!liked) {
      setLikesCount(likesCount - 1);
      setLiked(true);
    }
  };

  useEffect(() => {
    fetchLikeStatus(id).then((data) => setLiked(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Button
      color={liked ? 'primary' : 'white'}
      bg='transparent'
      _hover={{ bg: 'transparent', color: 'primary' }}
      _active={{ bg: 'transparent' }}
      onClick={() => handleLike()}
    >
      <Box pr={1} fontSize={20}>
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </Box>
      {likes}
    </Button>
  );
};
