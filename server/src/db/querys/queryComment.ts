export const queryPostComment: string =
  'INSERT INTO POST_COMMENT (post_id,user_id,comment) VALUES (?,?,?)';

export const getLastId: string = 'SELECT LAST_INSERT_ID() AS id';

const queryBuilder: string =
  "SELECT PC.id, PC.post_id, PC.user_id,PC.comment,PC.created_at, JSON_OBJECT('id',U.id,'username',U.username,'firstname',U.firstname,'lastname',U.lastname,'image',U.image) as user FROM post_comment AS PC INNER JOIN USER as U ON U.id = PC.user_id WHERE";

export const queryGetCommentByPost: string =
  queryBuilder + ' PC.id = (?) ORDER BY PC.created_at DESC;';

export const queryGetCommentsByPost: string =
  queryBuilder + ' PC.post_id = (?) ORDER BY PC.created_at DESC;';

export const queryDeleteComment: string =
  'DELETE FROM post_comment WHERE id = (?) AND user_id = (?)';
