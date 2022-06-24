import {
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { PostInteractions } from './PostInteractions';
import Link from 'next/link';
import { PostHeader } from './PostHeader';
import { Loading } from '../Loading';

interface FeedItemProp {
  feed: any;
  commentAmmount?: number;
}

export const PostItem = ({ feed }: FeedItemProp) => {
  const { id, image, text, user, likes, created_at, comments } = feed;

  if (!user) return <Loading />;
  return (
    <Center py={6} width='100%'>
      <Stack
        borderWidth='1px'
        borderRadius='lg'
        w='100%'
        maxW='100%'
        direction={{ base: 'column', md: 'row' }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('light', 'dark')}
        boxShadow={'2xl'}
        padding={4}
      >
        <Stack
          flex={1}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          p={1}
          pt={2}
        >
          <PostHeader
            userId={user?.id}
            username={user?.username}
            firstname={user?.firstname}
            lastname={user?.lastname}
            image={user?.image}
            created_at={created_at}
          />

          {image && (
            <Flex flex={1} bg='blue.200'>
              <Image
                objectFit='cover'
                boxSize='100%'
                alt='post picture'
                src={image}
              />
            </Flex>
          )}
          <Text textAlign='center' py={4} w='100%'>
            <Link href={`/post/${id}`}>{text}</Link>
          </Text>
          <PostInteractions
            id={id}
            userId={user?.id}
            likes={likes}
            comments={comments}
          />
        </Stack>
      </Stack>
    </Center>
  );
};
