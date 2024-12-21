import express from 'express';
import commentsRouter from './Routers/comments';
import newsRouter from './Routers/news';
import cors from 'cors';
import mysqlDb from './mySqlDb';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
  });
};

run().catch((err) => {
  console.log(err);
});
