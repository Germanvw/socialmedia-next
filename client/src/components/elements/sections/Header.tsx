import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  FlexProps,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import { useAppDispatch } from '../../../hooks/useRedux';
import { UserDataWithEmail } from '../../../interfaces/UserInterfaces';
import { authActions } from '../../../redux/Slices/authSlice';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: UserDataWithEmail | null;
}

export const Header = ({ onOpen, user, ...rest }: MobileProps) => {
  const dispatch = useAppDispatch();
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('light', 'dark')}
      borderBottomWidth='1px'
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text>

      <HStack spacing={{ base: '2', md: '6' }}>
        <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
                  }
                />
                <VStack
                  display={{ base: 'none', sm: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>{user?.username}</Text>
                  <Text fontSize='xs' color='gray.600'>
                    {user?.province}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', sm: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                as={Button}
                onClick={() => dispatch(authActions.logout())}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
