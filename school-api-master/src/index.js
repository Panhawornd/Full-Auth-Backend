import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middleware/auth.middleware.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/docs', serveSwagger, setupSwagger);
app.use('/auth', authRoutes);

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/teachers', teacherRoutes);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get protected users route
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success, returns user info
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */
app.get('/users', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected users route.', user: req.user });
});

app.get('/', (req, res) => res.send('Welcome to School API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
