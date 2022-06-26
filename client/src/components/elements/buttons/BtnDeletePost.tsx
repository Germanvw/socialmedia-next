import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/useRedux';
import { startPostDelete } from '../../../redux/Slices/postSlice';
export const BtnDeletePost = ({ id, likes }: { id: number; likes: number }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const handleDeleteWithRedirection = () => {
    if (
      location.pathname.includes('/post') ||
      location.pathname.includes('/favorites')
    ) {
      dispatch(
        startPostDelete({ id, likesCount: likes, redirect: true, router })
      );
    } else {
      dispatch(startPostDelete({ id, likesCount: likes, redirect: false }));
    }
  };

  return (
    <Button
      color='red'
      bg='transparent'
      _hover={{ bg: 'transparent', color: 'primary' }}
      _active={{ bg: 'transparent' }}
      fontSize={16}
      onClick={() => handleDeleteWithRedirection()}
    >
      <FaTrash />
    </Button>
  );
};
