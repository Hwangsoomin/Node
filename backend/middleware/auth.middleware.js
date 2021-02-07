import jwt from 'jsonwebtoken';
import { UserDao } from '../dao/user.dao';
import { ErrorHandler } from '../model/Error';

function authMiddleware() {
  let token = '';
  let decoded = '';
  return [
    async (req, res, next) => {
      try {
        token = req.headers.authorization.split('Bearer ')[1];
        try {
          decoded = await jwt.verify(token, process.env.JWT_SECRET);
          const user = await UserDao.getUser(decoded.id);
          if (!user) {
            next(new ErrorHandler(403, 'Unauthorized'));
          }
        } catch (err) {
          next(new ErrorHandler(401, 'Expired Token'));
        }
      } catch (err) {
        next(new ErrorHandler(401, 'Token is missing'));
      }
      next();
    },
  ];
}

module.exports = authMiddleware;
