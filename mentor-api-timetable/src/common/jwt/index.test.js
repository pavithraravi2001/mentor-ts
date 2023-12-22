import { sign, signSync, verify } from './index';

describe('JWT Module', () => {
  const userId = '123';
  const options = { expiresIn: '1h' };

  test('sign function should return a valid JWT token', async () => {
    const token = await sign(userId, options);
    expect(typeof token).toBe('string');
  });

  test('signSync function should return a valid JWT token synchronously', () => {
    const token = signSync(userId, options);
    expect(typeof token).toBe('string');
  });

  test('verify function should successfully verify a valid JWT token', async () => {
    const token = await sign(userId, options);
    const decoded = await verify(token);
    expect(decoded.id).toBe(userId);
  });

  test('verify function should throw an error for an invalid JWT token', async () => {
    const invalidToken = 'invalid.token.string';
    try {
      await verify(invalidToken);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.name).toBe('JsonWebTokenError');
    }
  });
});
