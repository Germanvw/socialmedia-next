import { Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/useRedux';
import {
  startFriendRemove,
  startFriendRequestSend,
} from '../../../redux/Slices/friendSlice';

export const BtnFriend = ({
  isFriend,
  id,
}: {
  isFriend: boolean;
  id: number;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={
        isFriend
          ? () => dispatch(startFriendRemove(id))
          : () => dispatch(startFriendRequestSend(id))
      }
    >{`${isFriend ? 'Delete' : 'Add'} Friend`}</Button>
  );
};
