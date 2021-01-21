import { UserDao } from '../dao/user.dao.js';
import { ErrorHandler } from '../model/Error.js';

export class UserService {
  static createUser = async (data) => {
    try {
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
}
