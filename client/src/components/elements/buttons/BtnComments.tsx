import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaRegCommentAlt } from 'react-icons/fa';

export const BtnComments = ({
  id,
  comments,
}: {
  id: number;
  comments: number;
}) => {
  const router = useRouter();

  return (
    <Button
      bg='transparent'
      _hover={{ bg: 'transparent', color: 'primary' }}
      _active={{ bg: 'transparent' }}
      onClick={() => router.push(`/post/${id}`)}
    >
      <Box pr={1} fontSize={16}>
        <FaRegCommentAlt />
      </Box>
      {comments}
    </Button>
  );
};
