import { useAppSelector } from '../../../hooks/useRedux';

export const FriendRequestList = () => {
  const { friendRequestList } = useAppSelector((state) => state.friend);
  return <div>FriendRequestList</div>;
};
