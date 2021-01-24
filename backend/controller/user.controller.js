import { UserService } from '../service/user.service.js';
import { Response } from '../model/Response.js';

export class UserController {
  static createUser = async (req, res, next) => {
    try {
      const result = await UserService.createUser(req.body);
      return res
        .status(201)
        .json(new Response(201, 'success', 'success create user', result));
    } catch (err) {
      next(err);
    }
  };
}
