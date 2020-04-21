import express from 'express';
const router = express.Router();

import userRouter from './modules/user/routes';

router.get('/', function (req, res, next) {
  res.send('Hello v1.0 GET API from Afoofa');
});

router.post('/', function (req, res, next) {
  res.send('Hello v1.0 POST API from Afoofa');
});

router.use('/user', userRouter);

export default router;
