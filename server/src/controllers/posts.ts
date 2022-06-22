import { Request, Response } from 'express';
import {
  queryFetchPostsAll,
  queryFetchPostsByUser,
  queryFetchPostById,
  queryCreatePost,
  queryDeletePost,
  queryLastInsertId,
  queryGetUserFavoriteByPost,
  queryDeleteFavorite,
  queryAddFavorite,
  queryGetFavorite,
  queryGetFavoriteSingle,
  queryHandlePostAmountFromUser,
  queryHandleLikesAmountFromUser,
} from '../db/querys/queryPost';

const con = require('../db/db');

export const fetchAllPosts = (_: Request, res: Response) => {
  try {
    con.query(queryFetchPostsAll, (_: any, results: any) => {
      return res
        .status(200)
        .json({ ok: true, posts: results.length > 0 ? results : [] });
    });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};
export const fetchAllPostUser = (req: Request, res: Response) => {
  try {
    con.query(
      queryFetchPostsByUser,
      [req.params.id],
      (_: any, results: any) => {
        return res
          .status(200)
          .json({ ok: true, posts: results.length > 0 ? results : [] });
      }
    );
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const fetchPostById = (req: Request, res: Response) => {
  try {
    con.query(queryFetchPostById, [req.params.id], (_: any, results: any) => {
      return res.status(200).json({ ok: true, post: results });
    });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const createPost = (req: any, res: Response) => {
  const { id } = req.user;
  const { text, image } = req.body;
  try {
    con.query(
      queryCreatePost,
      [text, image, id],
      (_: any, { affectedRows }: any) => {
        if (affectedRows > 0) {
          // Post created successfully
          con.query(queryLastInsertId, (_: any, results: any) => {
            // GETS ID OF THE POST INSERTED
            con.query(
              queryFetchPostById,
              [results[0].id],
              (_: any, results: any) => {
                // Increment user's post amount
                con.query(
                  queryHandlePostAmountFromUser,
                  [1, id],
                  (_: any, { affectedRows }: any) => {
                    if (affectedRows > 0) {
                      //returns the post created
                      return res.status(200).json({
                        ok: true,
                        post: results[0],
                      });
                    } else {
                      return res.status(400).json({
                        ok: false,
                        msg: 'Error updating users total post count',
                      });
                    }
                  }
                );
              }
            );
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const deletePost = (req: any, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  try {
    // get current post to delete.
    con.query(queryFetchPostById, [id], (_: any, results: any) => {
      if (results.length > 0) {
        const currentPost = results[0];
        con.query(
          queryDeletePost,
          [id, user.id],
          (_: any, { affectedRows }: any) => {
            if (affectedRows > 0) {
              // Deleted successfully
              con.query(
                queryHandlePostAmountFromUser,
                [-1, user.id],
                (_: any, { affectedRows }: any) => {
                  // Remove like count from user.
                  if (affectedRows > 0) {
                    con.query(
                      queryHandleLikesAmountFromUser,
                      [-currentPost.likes, user.id],
                      (_: any, { affectedRows }: any) => {
                        if (affectedRows > 0) {
                          return res
                            .status(200)
                            .json({ ok: true, msg: 'Post deleted', id });
                        } else {
                          return res.status(400).json({
                            ok: false,
                            msg: 'Error updating users total like count',
                          });
                        }
                      }
                    );
                  } else {
                    return res.status(400).json({
                      ok: false,
                      msg: 'Error updating users total post count',
                    });
                  }
                }
              );
            } else {
              return res
                .status(400)
                .json({ ok: false, msg: 'Error on request' });
            }
          }
        );
      } else {
        return res.status(400).json({ ok: false, msg: 'Post not found' });
      }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const fetchPostFavorite = (req: any, res: Response) => {
  const { id } = req.user;
  try {
    con.query(queryGetFavorite, [id], (_: any, results: any) => {
      return res.status(200).json({ ok: true, posts: results });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const isFavoriteByUser = (req: any, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  try {
    con.query(
      queryGetUserFavoriteByPost,
      [user.id, id],
      (_: any, results: any[]) => {
        return res
          .status(200)
          .json({ ok: true, isFavorite: results.length > 0 ? true : false });
      }
    );
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const postHandleFavorite = (req: any, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  try {
    con.query(
      queryGetUserFavoriteByPost,
      [user.id, id],
      (_: any, results: any[]) => {
        // If results > 0, user has that post as a favorite, so we need to remove it
        if (results.length > 0) {
          con.query(
            queryDeleteFavorite,
            [user.id, id],
            (_: any, { affectedRows }: any) => {
              if (affectedRows > 0)
                return res.status(200).json({
                  message: 'Post removed from favorite list',
                  ok: true,
                  favorite: false,
                  post: [],
                });
              return res
                .status(400)
                .json({ ok: false, msg: 'Error on request' });
            }
          );
        } else {
          con.query(
            queryAddFavorite,
            [user.id, id],
            (_: any, { affectedRows }: any) => {
              // Added to favorite, return post as favorite
              if (affectedRows > 0) {
                con.query(
                  queryGetFavoriteSingle,
                  [user.id, id],
                  (_: any, results: any[]) => {
                    const postAdded = results[0];
                    return res.status(200).json({
                      message: 'Post added to favorite list',
                      ok: true,
                      favorite: true,
                      post: postAdded,
                    });
                  }
                );
              } else {
                return res
                  .status(400)
                  .json({ ok: false, msg: 'Error on request' });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};
