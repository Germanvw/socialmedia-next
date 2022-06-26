import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useAppSelector } from '../../../hooks/useRedux';
import { MetaData } from '../user/MetaData';
import { UserAvatar } from '../user/UserAvatar';
import { useRouter } from 'next/router';
import { BtnLink } from '../buttons/BtnLink';
import { SidebarItemProps, sidebarItems } from '../../../data/sidebarItems';

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Sidebar = ({ onClose, isOpen }: SidebarProps) => {
  const [mdBreakpoint] = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <SidebarItem
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen && mdBreakpoint}
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
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const handleRedirection = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('light', 'dark')}
      borderRightWidth='1px'
      w={{ base: 'full', lg: 60 }}
      h='100vh'
      {...rest}
    >
      <Stack h='100vh' alignItems='center' mx='8' direction='column'>
        <Stack
          h='80px'
          justifyContent={{ base: 'space-between', lg: 'center' }}
          align='center'
          direction='row'
          w='100%'
        >
          <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
            <Link href='/'>Logo</Link>
          </Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Stack>
        <Stack
          direction='column'
          w='100%'
          mt='80px'
          align='center'
          justifyContent='center'
        >
          <UserAvatar
            avatarData={{
              userId: user?.id!,
              username: user?.username!,
              firstname: user?.firstname!,
              lastname: user?.lastname!,
              image: user?.image!,
            }}
            label={`@ ${user?.username}`}
          />
          <Box py={6}>
            <MetaData
              friends={user?.metaData?.friends!}
              likes={user?.metaData?.likes!}
              posts={user?.metaData?.posts!}
            />
          </Box>
          <Stack direction='column' alignItems='flex-start'>
            {sidebarItems?.map(({ id, text, path, icon }: SidebarItemProps) => (
              <BtnLink
                key={id}
                text={text}
                onClick={() =>
                  handleRedirection(id !== 3 ? path : `/user/${user?.id}`)
                }
                icon={icon}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
