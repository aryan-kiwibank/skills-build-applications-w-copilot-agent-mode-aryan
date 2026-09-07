import express from 'express';
import cors from 'cors';
import './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ displayName: 1 });
    res.json({ resource: 'users', data: users });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.json({ resource: 'teams', data: teams });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ completedAt: -1 });
    res.json({ resource: 'activities', data: activities });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json({ resource: 'leaderboard', data: leaderboard });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json({ resource: 'workouts', data: workouts });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});
