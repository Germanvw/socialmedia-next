import { AcceptedProps, UserAtFriendList } from './UserInterfaces';

export interface RequestDataProps {
  id: number;
  state: AcceptedProps;
}

export interface FriendRequestListProps {
  requestData: RequestDataProps;
  user: UserAtFriendList;
}

export interface InitStateFriendProps {
  loading: boolean;
  error: string | null;
  friendList: UserAtFriendList[];
  friendRequestList: FriendRequestListProps[];
}
