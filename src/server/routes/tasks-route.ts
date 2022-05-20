import express, { Router } from 'express';

const tasksRouter: Router = express.Router();

tasksRouter.post('/scan', async (_req, res) => {
  return res.status(200);
});

tasksRouter.post('/', async (_req, res) => {
  return res.status(200).json({});
});

export default tasksRouter;