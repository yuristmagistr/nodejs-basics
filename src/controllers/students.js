// src/controllers/students.js

// 1. Імпортуємо функцію з бібліотеки
import createHttpError from 'http-errors';

import { getAllStudents, getStudentById } from '../services/students.js';

export const getStudentsController = async (req,res,next,) => {
	try {
	  const students = await getAllStudents();

	  res.json({
	    status: 200,
	    message: 'Successfully found students!',
	    data: students,
	  });
	} catch(err) {
		next(err);
	}
};



export const getStudentByIdController = async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      // 2. Створюємо та налаштовуємо помилку
      next(createHttpError(404, 'Student not found'));
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
    });
  };
