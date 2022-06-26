import { Spacer, Stack } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { BtnComments } from '../buttons/BtnComments';
import { BtnDeletePost } from '../buttons/BtnDeletePost';
import { BtnFavorite } from '../buttons/BtnFavorite';
import { BtnLike } from '../buttons/BtnLike';

interface Props {
  id: number;
  likes: number;
  comments: number;
  userId: number;
}

export const PostInteractions = ({ id, userId, likes, comments }: Props) => {
  const { user: userData } = useAppSelector((state) => state.auth);

  return (
    <Stack direction={{ base: 'column', md: 'row' }} width='100%'>
      <Stack direction='row'>
        <BtnLike likes={likes} id={id} userId={userId} />
        <BtnComments id={id} comments={comments} />
      </Stack>
      <Spacer />
      <Stack direction='row'>
        {userId === userData?.id && <BtnDeletePost id={id} likes={likes} />}
        <BtnFavorite id={id} />
      </Stack>
    </Stack>
  );
};
