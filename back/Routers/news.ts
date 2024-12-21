import express from 'express';
import mysqlDb from '../mySqlDb';
import { imagesUpload } from '../multer';
import { ResultSetHeader } from 'mysql2';
import { INews } from '../types';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM news');
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM news WHERE id=?', [id]);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).send({ error: 'Missing required title or description' });
  }
  const newNews = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? 'images' + req.file.filename : null,
  };

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('INSERT INTO news(title, description, image)VALUES (?,?,?)', [
      newNews.title,
      newNews.description,
      newNews.image,
    ]);
    const resultHeader = result as ResultSetHeader;
    const [resultNews] = await connection.query('SELECT * FROM news WHERE id =?', [resultHeader.insertId]);
    const oneNews = resultNews as INews[];
    res.status(200).send(oneNews);
  } catch (err) {
    next(err);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('DELETE FROM news WHERE id =?', [id]);
    const deletedNews = result as ResultSetHeader;
    if (deletedNews.affectedRows === 0) {
      res.status(404).send({ error: 'No such News' });
    } else {
      res.status(200).send('News deleted successfully.');
    }
  } catch (err) {
    next(err);
  }
});

export default newsRouter;
