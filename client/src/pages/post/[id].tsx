import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Spacer,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Loading } from '../../components/elements/Loading';
import { CommentItem } from '../../components/elements/post/CommentItem';
import { PostItem } from '../../components/elements/post/PostItem';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import {
  startCreateComment,
  startFetchComments,
} from '../../redux/Slices/commentSlice';
import { Form, Formik } from 'formik';
import { validationCreateCommentForm } from '../../data/formSchema';

const Post = () => {
  const { postList } = useAppSelector((state) => state.posts);
  const { commentList, ammount } = useAppSelector((state) => state.comment);
  const { user } = useAppSelector((state) => state.auth);

  const { query } = useRouter();

  const dispatch = useAppDispatch();

  const post = postList.find(
    (post) => post.id === parseInt(query?.id as string)
  );

  const handleCreateComment = ({ comment }: { comment: string }) => {
    dispatch(startCreateComment({ id: query?.id as string, comment }));
  };

  useEffect(() => {
    if (query?.id) dispatch(startFetchComments(query?.id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.id]);

  if (!user && post) return <Loading />;
  return (
    <Flex
      direction='column'
      px={{ base: 6, sm: 10 }}
      maxW='800px'
      width='100%'
      height='100%'
      className='wrapper'
    >
      <PostItem feed={{ ...post, comments: ammount }} />
      <Heading my={4} as='h2' size='md'>
        Comments
      </Heading>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={validationCreateCommentForm}
        onSubmit={(comment, { resetForm }) => {
          handleCreateComment(comment);
          resetForm();
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form className='formik-form' noValidate>
            <Box>
              <FormControl
                isRequired
                isInvalid={errors?.comment ? true : false}
              >
                <Textarea
                  placeholder='Comment...'
                  value={values?.comment}
                  onChange={handleChange}
                  resize='none'
                  name='comment'
                />
              </FormControl>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                align='center'
                my={4}
              >
                <Text color='red.300'>{errors?.comment}</Text>
                <Spacer />
                <Button ml='auto' my={4} bg='primary' type='submit'>
                  Comment
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
      {commentList?.length > 0 ? (
        commentList?.map(({ user, id, created_at, comment }) => (
          <CommentItem
            key={id}
            id={id}
            userId={user?.id}
            username={user?.username}
            firstname={user?.firstname}
            lastname={user?.lastname}
            image={user?.image}
            created_at={created_at}
            text={comment}
          />
        ))
      ) : (
        <Text>No comments found</Text>
      )}
    </Flex>
  );
};

export default Post;
