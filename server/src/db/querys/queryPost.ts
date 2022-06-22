const queryGlobalPost: string =
  "SELECT P.id, P.text, P.image,P.likes,P.comments,P.created_at, JSON_OBJECT('id',U.id,'username',U.username,'firstname',U.firstname,'lastname',U.lastname,'image',U.image) as user FROM POST AS P INNER JOIN USER AS U ON P.user = U.id";

const queryGlobal2: string = queryGlobalPost + ' WHERE P.active = 1';

export const queryFetchPostsAll: string =
  queryGlobal2 + ' ORDER BY p.created_at DESC';

export const queryFetchPostsByUser: string =
  queryGlobal2 + ' AND P.user = (?) ORDER BY p.created_at DESC';

export const queryFetchPostById: string = queryGlobal2 + ' AND P.id = (?)';

export const queryCreatePost: string =
  'INSERT INTO POST (text,image,user) VALUES (?,?,?)';

export const queryDeletePost: string =
  'UPDATE POST SET active = 0 WHERE id=(?) AND user=(?)';

export const queryLastInsertId: string = 'SELECT LAST_INSERT_ID() AS id';

// export const queryPostAmountDicrement: string =
//   'UPDATE USER SET posts = COALESCE(posts, 0) - 1 WHERE User.id = (?)';

export const queryGetFavoriteUser: string =
  'SELECT FL.post_id as post_id FROM FAVORITE_LIST AS FL WHERE FL.user_id = (?)';

export const queryGetUserFavoriteByPost: string =
  'SELECT * FROM FAVORITE_LIST AS FL WHERE FL.user_id = (?) AND post_id = (?)';

export const queryAddFavorite: string =
  'INSERT INTO FAVORITE_LIST (user_id,post_id) VALUES (?,?)';

export const queryDeleteFavorite: string =
  'DELETE FROM FAVORITE_LIST AS FL WHERE FL.user_id = (?) AND FL.post_id = (?)';

export const queryGetFavorite: string =
  queryGlobalPost +
  ' INNER JOIN FAVORITE_LIST AS FL ON P.id = FL.post_id WHERE FL.user_id = (?) AND P.active=1 ORDER BY P.created_at DESC';

export const queryGetFavoriteSingle: string =
  queryGlobalPost +
  ' INNER JOIN FAVORITE_LIST AS FL ON P.id = FL.post_id WHERE FL.user_id = (?) AND FL.post_id = (?) AND P.active=1 ORDER BY P.created_at DESC';

export const queryHandlePostAmountFromUser: string =
  'UPDATE USER SET posts = COALESCE(posts, 0) + (?) WHERE User.id = (?)';

export const queryHandleLikesAmountFromUser: string =
  'UPDATE USER SET likes = COALESCE(likes, 0) + (?) WHERE User.id = (?)';
