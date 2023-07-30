import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registrationSchema = Joi.object({
  id: Joi.number(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string(),
  profile_photo: Joi.binary(),
  mobNumber: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'other'),
  dob: Joi.date(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validateUserMiddleware;

