// Get like if exist at post from user
export const queryGetUserLikeByPost: string =
  'SELECT * FROM LIKE_COMMENT AS LC WHERE LC.user_id = (?) AND post_id = (?)';

// get all likes by post
export const queryGetLikesByPost: string =
  'SELECT id FROM LIKE_COMMENT AS LC WHERE POST_id = (?)';

export const queryGetLikesByUser: string =
  'SELECT id FROM LIKE_COMMENT AS LC WHERE post_author = (?) AND ACTIVE=1';

export const queryLikePost: string =
  'INSERT INTO LIKE_COMMENT (user_id,post_id,post_author) VALUES (?,?,?)';

export const queryDislikePost: string =
  'DELETE FROM LIKE_COMMENT AS LC WHERE LC.user_id = (?) AND LC.post_id = (?)';

export const queryChangeLikeCount: string =
  'UPDATE POST AS P SET likes = likes + (?) WHERE P.ID = (?)';
