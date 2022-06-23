import { Spacer, Stack } from '@chakra-ui/react';
import { BtnComments } from '../buttons/BtnComments';
import { BtnFavorite } from '../buttons/BtnFavorite';
import { BtnLike } from '../buttons/BtnLike';

interface Props {
  id: number;
  userId: number;
  likes: number;
  comments: number;
}

export const PostInteractions = ({ id, userId, likes, comments }: Props) => {
  return (
    <Stack direction='row'>
      <Stack direction='row'>
        <BtnLike likes={likes} id={id} userId={userId} />
        <BtnComments id={id} comments={comments} />
      </Stack>
      <Spacer />
      <BtnFavorite id={id} />
    </Stack>
  );
};
