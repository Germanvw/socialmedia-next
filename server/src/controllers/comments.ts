import { Response } from 'express';
import {
  queryPostComment,
  queryGetCommentsByPost,
  getLastId,
  queryGetCommentByPost,
  queryDeleteComment,
} from '../db/querys/queryComment';

const con = require('../db/db');

export const createComment = (req: any, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { comment } = req.body;
  try {
    con.query(
      queryPostComment,
      [parseInt(id), user.id, comment],
      (_: any, results: any) => {
        if (results) {
          con.query(getLastId, (_: any, results: any) => {
            const lastId = results[0].id;
            con.query(
              queryGetCommentByPost,
              [lastId],
              (_: any, results: any) => {
                return res.status(201).json({
                  ok: true,
                  msg: 'Comment posted',
                  comment: results[0],
                });
              }
            );
          });
        } else {
          return res
            .status(401)
            .json({ ok: true, comment: results, msg: "Couldn't post comment" });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const fetchCommentsByPost = (req: any, res: Response) => {
  const { id } = req.params;
  try {
    con.query(queryGetCommentsByPost, [id], (_: any, results: any) => {
      return res
        .status(200)
        .json({ ok: true, comments: results.length > 0 ? results : [] });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const deleteComment = (req: any, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  try {
    con.query(queryDeleteComment, [id, user.id], (_: any, __: any) => {
      return res.status(200).json({ ok: true, msg: 'Comment deleted' });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};
