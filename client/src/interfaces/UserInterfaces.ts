export interface UserPropRoute {
  user: UserDataProps | null;
}

interface CountryProps {
  id: number;
  name: string;
  code: string;
  active: number | ActiveProps;
}

interface GenderProps {
  id: 1 | 2;
  name: 'Female' | 'Male';
  active: number | ActiveProps;
}

interface ActiveProps {
  id: 0 | 1;
  name: 'INACTIVE' | 'ACTIVE';
}

export interface AcceptedProps {
  id: 0 | 1 | 2;
  name: 'CANCELLED' | 'ACCEPTED' | 'PENDING';
}

interface MetaDataProps {
  likes: number;
  posts: number;
  friends: number;
}

interface DisplayUser {
  image: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface BasicUser extends DisplayUser {
  id: number;
}

export interface UserAtFriendList extends BasicUser {
  age: number;
  country: CountryProps;
  gender: GenderProps;
  metaData: MetaDataProps;
  province: string;
}

export interface UserDataProps extends UserAtFriendList {
  active: ActiveProps;
}
export interface UserDataWithEmail extends UserDataProps {
  email: string;
}

export interface FriendItemProps extends Omit<UserDataProps, 'active'> {}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  age: number;
  province: string;
  country: number;
  gender: number;
}

export interface UpdateUser extends Omit<RegisterUser, 'password'> {}
