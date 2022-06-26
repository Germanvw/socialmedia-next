import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdFavorite, MdOutlineExplore } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';

export interface SidebarItemProps {
  id: number;
  text: string;
  icon: any;
  path: string;
}

export const sidebarItems: SidebarItemProps[] = [
  {
    id: 1,
    text: 'Home',
    icon: <FaHome />,
    path: '/',
  },
  {
    id: 1,
    text: 'Users',
    icon: <MdOutlineExplore />,
    path: '/users',
  },
  {
    id: 1,
    text: 'Profile',
    icon: <CgProfile />,
    path: '/users/{id}',
  },
  {
    id: 1,
    text: 'Favorites',
    icon: <MdFavorite />,
    path: '/favorites',
  },
  {
    id: 1,
    text: 'Edit Profile',
    icon: <ImProfile />,
    path: '/profile',
  },
];
