import { Button } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/useRedux';
import { startPostChangeFavorite } from '../../../redux/Slices/postSlice';
import { useEffect, useState } from 'react';
import { fetchFavoriteStatus } from '../../../helpers/fetchPost';

export const BtnFavorite = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    dispatch(startPostChangeFavorite(id!));
    if (favorite) setFavorite(false);
    if (!favorite) setFavorite(true);
  };

  useEffect(() => {
    fetchFavoriteStatus(id).then((data) => setFavorite(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button
      color={favorite ? 'primary' : 'white'}
      bg='transparent'
      _hover={{ bg: 'transparent', color: 'primary' }}
      _active={{ bg: 'transparent' }}
      fontSize={16}
      onClick={() => handleFavorite()}
    >
      <FaSave />
    </Button>
  );
};
