import {
  Avatar,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { PostInteractions } from './PostInteractions';

interface FeedItemProp {
  feed: any;
  commentAmmount?: number;
}

export const PostItem = ({ feed, commentAmmount }: FeedItemProp) => {
  const { id, image, text, user, likes, created_at } = feed;
  const { id: userId, username, firstname, lastname } = user;

  return (
    <Center py={6}>
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
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            align={'center'}
            justify={'center'}
          >
            <Avatar src={user?.image} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Heading fontSize={'lg'} fontFamily={'body'}>
                {`${firstname} ${lastname}`}
              </Heading>
              <Text fontWeight={600} color={'gray.500'} size='sm' mb={4}>
                @{username}
              </Text>
            </Stack>
          </Stack>

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
          <Text textAlign={'center'} px={3}>
            {text}
          </Text>
          <Text color={'gray.500'}>
            {new Date(created_at).toLocaleDateString()}
          </Text>
          <Stack w='100%'>
            <PostInteractions
              id={id}
              userId={userId}
              likes={likes}
              comments={commentAmmount || 0}
            />
          </Stack>
          {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #music
            </Badge>
          </Stack> */}
        </Stack>
      </Stack>
    </Center>
  );
};
