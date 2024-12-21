import express from 'express';
import newsRouter from './news';
import mySqlDb from '../mySqlDb';
import { IComments, INews } from '../types';
import { ResultSetHeader } from 'mysql2';
import mysqlDb from '../mySqlDb';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  let news_id;
  if (req.query.news_id) {
    news_id = Number(req.query.news_id);
  }

  try {
    const connection = await mySqlDb.getConnection();
    if (news_id) {
      const [result] = await connection.query('SELECT * FROM comments WHERE news_id= ?', [news_id]);
      res.status(200).send(result);
      return;
    } else {
      const [result] = await connection.query('SELECT * FROM comments');
      console.log('out');
      console.log(result);
      res.status(200).send(result);
      return;
    }
  } catch (err) {
    next(err);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  if (!req.body.description || !req.body.news_id) {
    res.status(400).send({ error: 'Description and News_id is required' });
  }

  const newComments = {
    news_id: req.body.news_id,
    author: req.body.author ? req.body.author : 'Anonymous',
    description: req.body.description,
  };

  try {
    const connection = await mySqlDb.getConnection();
    const [result] = await connection.query('INSERT INTO comments (news_id, author, description) VALUES(?,?,?)', [
      newComments.news_id,
      newComments.author,
      newComments.description,
    ]);
    const resultHeader = result as ResultSetHeader;
    const [resultComment] = await connection.query('SELECT * FROM comments WHERE id=?', [resultHeader.insertId]);
    const oneComment = resultComment as IComments[];

    res.status(200).send(oneComment);
  } catch (err) {
    next(err);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  const connection = await mysqlDb.getConnection();
  const [result] = await connection.query('DELETE FROM comments WHERE id=?', [id]);
  const resultHeader = result as ResultSetHeader;

  if (resultHeader.affectedRows === 0) {
    res.status(404).send({ error: 'Not Found' });
  } else {
    res.status(200).send('comments deleted successfully.');
  }
});

export default commentsRouter;
