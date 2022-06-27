import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { fetchNoToken } from '../../../hooks/useFetch';
import { Avatar } from '@chakra-ui/react';

export const SearchUser = () => {
  const [query, setQuery] = useState('');
  const [userList, setUserList] = useState([]);

  const fetchUserByName = async () => {
    const req = await fetchNoToken(`users/name/${query}`, {});
    const { users } = await req.json();
    setUserList(users);
  };
  console.log(userList.length);
  useEffect(() => {
    if (query !== '') {
      fetchUserByName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <Stack direction='column'>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <AiOutlineSearch />
        </InputLeftElement>
        <Input
          placeholder='Search User...'
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          type='text'
        />
      </InputGroup>
      {userList.length > 0 && (
        <Stack
          direction='column'
          justifyContent='center'
          align='center'
          py={4}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue('light', 'dark')}
        >
          {userList?.slice(0, 5)?.map(({ id, username, image }) => (
            <Box key={id} _hover={{ color: 'primary' }}>
              <Stack direction='row'>
                <Link href={`/user/${id}`}>
                  <Avatar size={'sm'} src={image} cursor='pointer' />
                </Link>

                <Link href={`/user/${id}`}>{username}</Link>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
