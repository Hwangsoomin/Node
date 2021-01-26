import { check, validationResult } from 'express-validator';
import { logger } from '../config/winston';
import { ErrorHandler } from '../model/Error';

module.exports.createUser = [
  check('name').isString().not().isEmpty(),
  check('gender').isString().isLength(2).not().isEmpty(),
  check('email').isEmail().not().isEmpty(),
  check('id').isString().not().isEmpty(),
  check('password').isString().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new ErrorHandler(400, 'type validate fail'));
    } else next();
  },
];

module.exports.login = [
  check('id').isString().not().isEmpty(),
  check('password').isString().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new ErrorHandler(400, 'type validate fail'));
    } else next();
  },
];
