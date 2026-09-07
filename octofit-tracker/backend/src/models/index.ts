import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    level: { type: String, required: true },
    favoriteActivity: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    coach: { type: String, required: true },
    members: [{ type: String, required: true }],
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    estimatedMinutes: { type: Number, required: true },
    equipment: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const User = models.User || model('User', userSchema);
export const Team = models.Team || model('Team', teamSchema);
export const Activity = models.Activity || model('Activity', activitySchema);
export const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);
export const Workout = models.Workout || model('Workout', workoutSchema);