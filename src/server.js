// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';

// import { env } from './utils/env.js';

// import { getAllStudents, getStudentById } from './services/students.js';
// import { initMongoDB } from './db/initMongoDB.js';

// const PORT = Number(env('PORT', '3000'));

// export const startServer = async() => {
//     await initMongoDB();
//     const app = express();

//     app.use(express.json());
//     app.use(cors());

//     app.use(
//         pino({
//             transport: {
//                 target: 'pino-pretty',
//             },
//         }),
//     );

//     app.get('/', (req, res) => {
//         res.json({
//             message: 'Hello World!',
//         });
//     });



//     app.get('/students', async (req, res) => {
//         const students = await getAllStudents();

//         res.status(200).json({
//             data: students,
//         });
//     });

//     app.get('/students/:studentId', async (req, res) => {
//         const { studentId } = req.params;
//         const student = await getStudentById(studentId);

//         res.status(200).json({
//             data: student,
//         });
//     });

// app.use('*', (_req, res) => {
//         res.status(404).json({
//             message: 'Not found',
//         });
//     });

//     app.use((err, req, res) => {
//         res.status(500).json({
//             message: 'Something went wrong',
//             error: err.message,
//         });
//     });

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });

// };



// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import studentsRouter from './routers/students.js';
import { env } from './utils/env.js';
// Імпортуємо middleware
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(studentsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
