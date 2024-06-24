// src/services/auth.js

import bcrypt from 'bcrypt';

import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    const isEqual = await bcrypt.compare(payload.password, user.password); // Порівнюємо хеші паролів

    if (!isEqual) {
      throw createHttpError(401, 'Unauthorized');
    }
        // далі ми доповнемо цей контролер
  };

  export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
  };
