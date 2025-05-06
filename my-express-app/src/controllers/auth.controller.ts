import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../middleware/auth.middleware';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const user = new User({ email, password, name });
      await user.save();
      
      const token = generateToken(user._id);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Error creating user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Error logging in' });
    }
  }
}