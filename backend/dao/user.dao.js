import { User } from '../model/schema.model.js';

export class UserDao {
  static createUser = async (name, gender, email, id, password) => {
    const user = new User({
      name,
      gender,
      email,
      id,
      password,
    });
    return await user.save();
  };

  static getUser = async (id) => {
    return User.findOne({ id });
  };

  static login = async (id) => {
    return User.findOne({ id });
  };
}
