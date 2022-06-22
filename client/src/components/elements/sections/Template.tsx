import { useColorMode, Box, Stack } from '@chakra-ui/react';

export const Template = ({ component }: any) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: '#ffffff', dark: '#212121' };
  const color = { light: '#404040', dark: '#EDEEEE' };

  return (
    <>
      {/* <Navbar bg={bgColor[colorMode]} /> */}
      <Box bg={bgColor[colorMode]} color={color[colorMode]} width='100% '>
        <Stack justifyContent='center' alignItems='center'>
          {component}
        </Stack>
      </Box>
      {/* <Footer colorMode={colorMode} /> */}
    </>
  );
};
