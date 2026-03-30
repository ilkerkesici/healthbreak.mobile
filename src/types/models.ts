import { ProductSubscription, Subscription } from 'react-native-iap';

export interface User {
  id: number;
  uid: string;
  username: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  p?: boolean;
  fb_uuid: string;
  premium: number | null;
}

export interface BasePackage {
  frequent: 'monthly' | 'yearly' | 'quarterly';
  sku: string;
  key: string;
  percentage?: number;
  display: boolean;
}

export interface SubsPackage {
  key?: string;
  data: ProductSubscription;
  title: string;
  price: number;
  priceFormatted: string;
  currency: string;
  percentage?: number;
  advantage?: number; // percentage
}

export interface Profile {
  id: number;
  name: string;
  user?: number;
  age?: number;
  gender?: 'f' | 'm';
}

export interface OnboardingQuestionAnswer {
  questionId: string;
  selectedLabels: string[];
}

export type OnboardingAnswersPayload = OnboardingQuestionAnswer[];

export interface OnboardingProfile extends Partial<Profile> {
  id: number;
  user: number;
  data: OnboardingAnswersPayload | null;
  created_at: string;
}

export interface ExerciseSchedule {
  id: number;
  user_id: number;
  scheduled_at: string;
  delayed_at: string | null;
  exercise_id: string;
  completed_at: string | null;
}

/** API'den gelebilecek egzersiz hedef bölgeleri (exercise.target) */
export enum ExerciseTarget {
  NECK = 'neck',
  SHOULDER = 'shoulder',
  ARM = 'arm',
  WRIST = 'wrist',
  BACK = 'back',
  LEG = 'leg',
}

export interface Exercise {
  id: number;
  title: string | null;
  description: string | null;
  media: Record<string, unknown>;
  target: string;
}

export interface NextExerciseResponse {
  schedule: ExerciseSchedule;
  exercise: Exercise;
}

export interface WeeklyRhythmDay {
  date: string;
  count: number;
}

export interface WeeklyRhythmResponse {
  daysWithBreaks: number;
  totalDays: number;
  days: WeeklyRhythmDay[];
}

export interface ExerciseHistoryItem {
  schedule: ExerciseSchedule;
  exercise: Exercise;
}

export interface ExerciseHistoryResponse {
  items: ExerciseHistoryItem[];
}

export type FeedbackCategory = 'suggestion' | 'error' | 'general';

export interface FeedbackPayload {
  feedback: string;
  vote: number;
  category: FeedbackCategory;
  exercise_id?: number;
}
