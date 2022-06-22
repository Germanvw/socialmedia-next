import { UserAtFriendList } from '../interfaces/UserInterfaces';

export const isFriend = (id: number, friendList: UserAtFriendList[]) => {
  return friendList.some((friend) => friend.id === id);
};
