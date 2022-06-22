import { queryFetchUserAllWithPassword } from './queryUser';
export const queryUserEmailExists: string =
  'SELECT USER.email FROM USER WHERE USER.email = ?';

export const queryAuthLogin: string =
  queryFetchUserAllWithPassword + ' AND U.email = ?';

export const queryAuthRegister: string =
  'INSERT INTO USER (username,email,password,firstname,lastname,age,country,province,gender) VALUES (?,?,?,?,?,?,?,?,?)';

export const queryAuthUserUpdate: string =
  'UPDATE USER AS U SET U.username= (?),U.email= (?),U.firstname= (?),U.lastname= (?),U.age= (?),U.gender= (?),U.country= (?),U.province= (?) WHERE U.id= (?)';
