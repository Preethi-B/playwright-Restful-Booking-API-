import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  reporter: [['html'], ['list']],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
});