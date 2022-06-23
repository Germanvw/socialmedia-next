import {
  useColorMode,
  Box,
  Stack,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Template = ({ component }: any) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppSelector((state) => state.auth);
  const bgColor = { light: '#ffffff', dark: '#212121' };
  const color = { light: '#404040', dark: '#EDEEEE' };

  return (
    <>
      <Box
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        width='100% '
        h='100vh'
      >
        <Flex direction='row'>
          {user && <Sidebar onClose={onClose} isOpen={isOpen} />}
          <Flex direction='column' w='100%'>
            {user && <Header onOpen={onOpen} user={user} />}
            <Stack
              justifyContent='center'
              alignItems='center'
              height='calc(100% - 80px)'
            >
              {component}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
