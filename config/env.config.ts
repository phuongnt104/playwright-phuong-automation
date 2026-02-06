import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  WEATHER_BASE_URL: process.env.WEATHER_BASE_URL || 'https://openweathermap.org/',
};
