import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { PostItemProps } from '../../../interfaces/PostInterfaces';
import { PostItem } from './PostItem';

export interface PostProp {
  id: number;
  text: string;
  image: string;
  user: any;
  likes: number;
  comments: number;
}

export const PostList = ({ postList }: { postList: PostItemProps[] }) => {
  return (
    <>
      {postList.length > 0 ? (
        postList.map((post: PostItemProps) => (
          <PostItem key={post.id} feed={post} />
        ))
      ) : (
        <Text>No posts foun</Text>
      )}
    </>
  );
};
