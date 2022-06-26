import { IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { HeaderProps, PostHeader } from './PostHeader';
import { AiTwotoneDelete } from 'react-icons/ai';
import { startDeleteComment } from '../../../redux/Slices/commentSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

interface CommentProps extends HeaderProps {
  id: number;
  text: string;
  created_at: string;
}

export const CommentItem = ({
  id,
  userId,
  username,
  firstname,
  lastname,
  image,
  text,
  created_at,
}: CommentProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  return (
    <Stack
      my={2}
      bg={useColorModeValue('light', 'dark')}
      padding={4}
      borderWidth='1px'
      borderRadius='lg'
    >
      <PostHeader
        userId={userId}
        username={username}
        firstname={firstname}
        lastname={lastname}
        image={image}
        created_at={created_at}
      />
      <Text textAlign='center' py={4} w='100%'>
        {text}
      </Text>
      <Stack>
        {userId === user?.id && (
          <IconButton
            aria-label='delete'
            icon={<AiTwotoneDelete />}
            w='48px'
            color='red'
            bg='transparent'
            _hover={{ bg: 'transparent', fontSize: '18px' }}
            _active={{ bg: 'transparent' }}
            onClick={() => dispatch(startDeleteComment(id))}
          ></IconButton>
        )}
      </Stack>
    </Stack>
  );
};
