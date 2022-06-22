import { BasicUser } from './UserInterfaces';

export interface PostItemProps {
  id: number;
  user: BasicUser;
  comments: number;
  created_at: string;
  image?: string;
  likes: number;
  text: string;
}
