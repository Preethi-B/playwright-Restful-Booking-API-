import { APIRequestContext, expect } from '@playwright/test';

export async function getToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/auth', {
    data: {
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
    },
  });
  expect(response.status()).toBe(200);

  const token = (await response.json()).token;
  expect(token).toBeDefined();
  return token;
}