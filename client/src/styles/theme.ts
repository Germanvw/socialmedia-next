import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
});

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  breakpoints,
};

export const customTheme = extendTheme({
  config,
  colors: {
    primary: '#ED3C58',
    secondary: '#C62E46',
    grey: '#F1F5F7',
    light: '#F1F5F7',
    dark: '#1c1c1c',
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Roboto", sans-serif',
  },
});
