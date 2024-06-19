import { isValidObjectId } from "mongoose";

// import HttpError from "./HttpError.js";
import { HttpError } from 'http-errors';

export const isValidId = (idName = 'id') => (req, res, next) => {
  const { id } = req.params[idName];
  if (!isValidObjectId(id)) {
    next(HttpError(404, "Not found"));
  }

  next();
};
export default isValidId;
