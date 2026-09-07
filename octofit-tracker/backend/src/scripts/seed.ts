import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    username: 'maya-rivera',
    email: 'maya.rivera@example.com',
    displayName: 'Maya Rivera',
    level: 'intermediate',
    favoriteActivity: 'trail running',
    joinedAt: new Date('2026-01-08T10:00:00Z'),
  },
  {
    username: 'liam-chen',
    email: 'liam.chen@example.com',
    displayName: 'Liam Chen',
    level: 'advanced',
    favoriteActivity: 'cycling',
    joinedAt: new Date('2026-02-14T12:30:00Z'),
  },
  {
    username: 'sofia-patel',
    email: 'sofia.patel@example.com',
    displayName: 'Sofia Patel',
    level: 'beginner',
    favoriteActivity: 'yoga',
    joinedAt: new Date('2026-03-21T08:45:00Z'),
  },
];

const teams = [
  {
    name: 'Velocity Vipers',
    city: 'Auckland',
    coach: 'Harper Ngata',
    members: ['maya-rivera', 'liam-chen'],
    weeklyGoalMinutes: 900,
  },
  {
    name: 'Core Collective',
    city: 'Wellington',
    coach: 'Amelia Brooks',
    members: ['sofia-patel'],
    weeklyGoalMinutes: 540,
  },
];

const activities = [
  {
    username: 'maya-rivera',
    activityType: 'trail run',
    durationMinutes: 52,
    caloriesBurned: 540,
    completedAt: new Date('2026-09-04T17:20:00Z'),
    notes: 'Hill repeats through the reserve.',
  },
  {
    username: 'liam-chen',
    activityType: 'cycling',
    durationMinutes: 74,
    caloriesBurned: 680,
    completedAt: new Date('2026-09-05T06:40:00Z'),
    notes: 'Steady endurance ride with tempo finish.',
  },
  {
    username: 'sofia-patel',
    activityType: 'yoga',
    durationMinutes: 38,
    caloriesBurned: 160,
    completedAt: new Date('2026-09-05T19:15:00Z'),
    notes: 'Mobility and breath work session.',
  },
];

const leaderboard = [
  {
    username: 'liam-chen',
    teamName: 'Velocity Vipers',
    points: 2480,
    rank: 1,
    streakDays: 18,
  },
  {
    username: 'maya-rivera',
    teamName: 'Velocity Vipers',
    points: 2315,
    rank: 2,
    streakDays: 14,
  },
  {
    username: 'sofia-patel',
    teamName: 'Core Collective',
    points: 1320,
    rank: 3,
    streakDays: 7,
  },
];

const workouts = [
  {
    title: 'Lunch Break Strength Circuit',
    focusArea: 'full body',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    equipment: ['dumbbells', 'mat'],
    steps: ['Warm up for 5 minutes', 'Complete 3 strength circuits', 'Cool down with hip mobility'],
  },
  {
    title: 'Low Impact Cardio Builder',
    focusArea: 'cardio',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    equipment: ['none'],
    steps: ['March in place', 'Alternate step jacks and squats', 'Finish with light stretching'],
  },
  {
    title: 'Advanced Ride Intervals',
    focusArea: 'cycling power',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    equipment: ['bike', 'timer'],
    steps: ['Warm up progressively', 'Ride 6 high-power intervals', 'Recover with easy spinning'],
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      Leaderboard.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
