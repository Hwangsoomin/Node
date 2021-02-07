import { UserDao } from '../dao/user.dao.js';
import { ErrorHandler } from '../model/Error.js';
import bcrypt from 'bcrypt';
import { JWT } from '../util/jwt.js';

export class UserService {
  static createUser = async (data) => {
    try {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);

      const result = await UserDao.createUser(
        data.name,
        data.gender,
        data.email,
        data.id,
        data.password
      );
      return result;
    } catch (err) {
      throw new ErrorHandler(500, 'Create user fail');
    }
  };
  static login = async (data) => {
    const user = await UserDao.login(data.id);
    if (user === null) throw new ErrorHandler(401, 'User not found');

    const unauthorized = await bcrypt.compare(data.password, user.password);
    if (!unauthorized) throw new ErrorHandler(401, 'Auth Error');

    const accessToken = await JWT.accessToken(user);
    const result = { user: user, accessToken: accessToken };
    return result;
  };
  static getUser = async (data) => {
    const result = await UserDao.getUser(data.id);
    if (result === null) throw new ErrorHandler(401, 'User not found');
    return result;
  };
}
