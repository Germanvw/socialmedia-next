import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { TextInput } from '../../components/elements/forms/TextInput';
import {
  formRegisterFieldSecond,
  formRegisterFieldsFirst,
  initialFormRegister,
  validationRegisterForm,
} from '../../data/formSchema';
import { startRegister } from '../../redux/Slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DropdownInput } from '../../components/elements/forms/DropdownInput';
import Link from 'next/link';
import {
  startFetchCountries,
  startFetchGenders,
} from '../../redux/Slices/dropdownSlice';
import { Loading } from '../../components/elements/Loading';

const Register = () => {
  const {
    countries,
    genders,
    loading: loadingDropdown,
  } = useAppSelector((state) => state.dropdown);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startFetchCountries());
    dispatch(startFetchGenders());
  }, []);

  if (!countries || !genders) return <Loading />;
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} py={12} px={{ base: 6, lg: 12 }}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create Meet account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('light', 'dark')}
          boxShadow={'lg'}
          p={8}
        >
          <Formik
            initialValues={initialFormRegister}
            onSubmit={(values) => dispatch(startRegister(values))}
            validationSchema={validationRegisterForm}
          >
            {(props) => (
              <Form className='formik-form' noValidate>
                {formRegisterFieldsFirst?.map((i, index) => (
                  <Stack key={index} direction={{ base: 'column', lg: 'row' }}>
                    {i.map((input) => (
                      <TextInput {...input} key={input.name} required={true} />
                    ))}
                  </Stack>
                ))}
                <>
                  <Stack direction={{ base: ' column', lg: 'row' }}>
                    <Box flex={1} pb='24px'>
                      <DropdownInput
                        list={genders}
                        label='Gender'
                        onChange={props.handleChange}
                      />
                    </Box>
                    <Box flex={1} pb='24px'>
                      <DropdownInput
                        list={countries}
                        label='Country'
                        onChange={props.handleChange}
                      />
                    </Box>
                  </Stack>
                </>
                {formRegisterFieldSecond?.map((i, index) => (
                  <Stack key={index} direction={{ base: 'column', lg: 'row' }}>
                    {i.map((input) => (
                      <TextInput {...input} key={input.name} />
                    ))}
                  </Stack>
                ))}
                <Stack
                  pb={6}
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Text align={'center'}>Already a user? </Text>
                  <Box color={'blue.400'}>
                    <Link href='/auth/login'>Login</Link>
                  </Box>
                </Stack>
                <Stack spacing={10} pt={2}>
                  {loading ||
                    (loadingDropdown && (
                      <Center>
                        <Spinner color='primary' />
                      </Center>
                    ))}
                  <Button
                    loadingText='Submitting'
                    size='lg'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
