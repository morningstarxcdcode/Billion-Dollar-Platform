import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';

jest.setTimeout(30000); // Increase timeout to 30 seconds

describe('GET /', () => {
  it('should return a 200 status and a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Welcome to the Express App');
  });
});

describe('Authentication', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
    }
  });

  afterAll(async () => {
    jest.setTimeout(10000); // Reset timeout for cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    // Your test implementation here
  });

  it('should not register user with existing email', async () => {
    // Your test implementation here
  });

  it('should login with valid credentials', async () => {
    // Your test implementation here
  });

  it('should not login with invalid password', async () => {
    // Your test implementation here
  });
});
