// src/validation/students.js

import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
  parentId: Joi.string().required(),  // нова властивість
});


// src/validation/students.js

/* Решта коду файла */

export const updateStudentSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    age: Joi.number().integer().min(6).max(16),
    gender: Joi.string().valid('male', 'female', 'other'),
    avgMark: Joi.number().min(2).max(12),
    onDuty: Joi.boolean(),
  });
