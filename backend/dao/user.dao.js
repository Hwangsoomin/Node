import { UserSchema } from '../model/schema.model.js';

export class UserDao {
  static createUser = async (name, gender, email, id, password) => {
    const user = new UserSchema({
      name,
      gender,
      email,
      id,
      password,
    });
    return await user.save();
  };
  static login = async (id) => {
    return UserSchema.findOne({ id });
  };
}
