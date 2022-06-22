import { UserAtFriendList } from './UserInterfaces';
export interface PaginationProps {
  index: number;
  last: number;
  first: number;
}

export interface UsePaginationProps {
  perPage: number;
  handlePagination: (value: number) => void;
  pagination: PaginationProps;
  handlePerPage: (event: any) => void;
  setPagination: (value: PaginationProps) => void;
  setPerPage: (value: number) => void;
}

export interface useFilterSearchProps {
  filterInput: string;
  handleChange: (event: any) => void;
  paginatedArray: UserAtFriendList[];
  array: UserAtFriendList[];
}

export interface PaginationNavInterface {
  array: UserAtFriendList[];
  pagination: any;
  pagOptions: number[];
  perPage: number;
  setPagination: (value: any) => void;
  handlePagination: (value: number) => void;
  handlePerPage: (perPage: number) => void;
  setPerPage: (perPage: number) => void;
}

export interface DropdownPaginationProps {
  options: number[];
  dwName: string;
  disabled?: boolean;
  handleChange: ({ target }: any) => void;
  setPerPage: (perPage: number) => void;
}
