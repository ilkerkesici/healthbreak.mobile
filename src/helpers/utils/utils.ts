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

export const compareVersions = (version1: string, version2: string) => {
  const parts1 = version1.split('.').map(part => parseInt(part, 10));
  const parts2 = version2.split('.').map(part => parseInt(part, 10));

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;

    if (num1 !== num2) {
      return num1 - num2;
    }
  }

  return 0; // Sürümler eşit
};