import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import {
  formLoginFields,
  initialFormLogin,
  validationLoginForm,
} from '../../data/formSchema';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { startLogin } from '../../redux/Slices/authSlice';
import { TextInput } from '../../components/elements/forms/TextInput';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { handleAuthRoute } from '../../helpers/routeHandler';

const Login: NextPage = () => {
  const { loading, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const router = useRouter();

  handleAuthRoute(user!, router);

  if (user) return <></>;
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} width='100%'>
      <Stack spacing={8} mx={'auto'} py={6} px={{ base: 6, lg: 12 }}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue('light', 'dark')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={initialFormLogin}
              validationSchema={validationLoginForm}
              onSubmit={(values) => dispatch(startLogin(values))}
            >
              {() => (
                <Form className='formik-form' noValidate>
                  {formLoginFields.map((input, index) => (
                    <TextInput {...input} key={index} required={true} />
                  ))}
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Checkbox>Remember Me</Checkbox>
                      <Box color={'blue.400'}>
                        <Link href='/auth/password'>Forgot password?</Link>
                      </Box>
                    </Stack>
                    {loading && (
                      <Center>
                        <Spinner color='primary' />
                      </Center>
                    )}
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type='submit'
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack direction='row' align={'start'}>
              <Text>Or</Text>
              <Box color={'blue.400'}>
                <Link href='/auth/register' style={{ color: 'blue' }}>
                  Signup now?
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
