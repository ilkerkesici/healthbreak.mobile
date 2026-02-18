import { ColorType } from 'assets/colors';

export const forceHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//, 'https://');
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getProgressColor = (progress: number): ColorType => {
  if (progress < 50) return 'red.600';
  if (progress < 75) return 'green.400';
  if (progress < 85) return 'green.500';
  if (progress < 90) return 'green.600';
  return 'green.600';
};
