import { Response } from 'express';
import {
  queryFetchCountryAll,
  queryFetchGenderAll,
} from '../db/querys/queryGlobal';
const con = require('../db/db');

export const fetchCountryAll = (_: any, res: Response) => {
  try {
    con.query(queryFetchCountryAll, (_: any, results: any[]) => {
      return res
        .status(200)
        .json({ ok: true, countryList: results.length > 0 ? results : [] });
    });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};
export const fetchGenderAll = (_: any, res: Response) => {
  try {
    con.query(queryFetchGenderAll, (_: any, results: any[]) => {
      return res
        .status(200)
        .json({ ok: true, genderList: results.length > 0 ? results : [] });
    });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};
