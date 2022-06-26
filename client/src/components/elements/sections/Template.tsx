import {
  useColorMode,
  Box,
  Stack,
  useDisclosure,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useRedux';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AlertItem } from '../AlertItem';
import { SocialBar } from './SocialBar';
import { useColorModeValue } from '@chakra-ui/react';

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
          {user && (
            <Stack display={{ base: 'none', lg: 'flex' }}>
              <Sidebar onClose={onClose} isOpen={isOpen} />
            </Stack>
          )}
          <Flex direction='column' w='100%'>
            {user && <Header onOpen={onOpen} user={user} />}
            <Stack
              justifyContent='center'
              alignItems='center'
              height='calc(100% - 80px)'
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box position='absolute' top='90' right='10px' zIndex={3}>
                <AlertItem />
              </Box>
              {user && (
                <Stack display={{ base: 'flex', lg: 'none' }}>
                  <SocialBar />
                </Stack>
              )}
              <Spacer />
              {component}
              {user && (
                <>
                  <Spacer />
                  <Stack display={{ base: 'none', lg: 'flex' }}>
                    <Stack
                      h='100vh'
                      top='0px'
                      pt='80px'
                      zIndex={0}
                      right='0px'
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      bg={useColorModeValue('light', 'dark')}
                      position='fixed'
                    >
                      <SocialBar />
                    </Stack>
                    <Stack w='320px'></Stack>
                  </Stack>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
