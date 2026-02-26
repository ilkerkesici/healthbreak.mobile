import { Subscription } from 'react-native-iap';

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

export interface SubsPackage {
  key?: string;
  data: Subscription;
  title: string;
  price: string;
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
