import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Sidebar = ({ onClose, isOpen }: SidebarProps) => {
  return (
    <>
      <SidebarItem
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarItem onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SidebarItem = ({ onClose, ...rest }: any) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      h='100vh'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
    </Box>
  );
};
