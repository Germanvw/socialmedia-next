import { BasicUser } from './UserInterfaces';

export interface CommentItemProp {
  comment: any;
  created_at: string;
  id: number;
  post_id: number;
  user_id: number;
  user: any;
}
