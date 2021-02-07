import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class JWT {
  static accessToken = async (user) => {
    return await jwt.sign(
      {
        id: user.id,
        username: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
  };
}
