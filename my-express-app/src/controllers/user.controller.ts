import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { AppError } from '../middleware/error.middleware';

export class UserController {
  async getProfile(req: Request, res: Response) {
    res.json({ user: req.user });
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const userId = (req.user as any)._id;

      if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
          throw new AppError(400, 'Email already in use');
        }
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { name, email } },
        { new: true }
      );

      res.json({ user });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(400, 'Error updating profile');
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id;
      await User.findByIdAndDelete(userId);
      res.status(204).send();
    } catch (error) {
      throw new AppError(400, 'Error deleting profile');
    }
  }
}