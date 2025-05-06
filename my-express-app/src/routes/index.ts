import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
import { IndexController } from '../controllers/index';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { HealthController } from '../controllers/health.controller';
import { auth } from '../middleware/auth.middleware';
import { registerValidator, updateProfileValidator } from '../middleware/validator.middleware';

const router = Router();
const indexController = new IndexController();
const authController = new AuthController();
const userController = new UserController();
const healthController = new HealthController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/auth/register', registerValidator, authController.register.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', authController.login.bind(authController));

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/user/profile', auth, userController.getProfile.bind(userController));

/**
 * @swagger
 * /user/profile:
 *   patch:
 *     tags: [User]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.patch('/user/profile', auth, updateProfileValidator, userController.updateProfile.bind(userController));

/**
 * @swagger
 * /user/profile:
 *   delete:
 *     tags: [User]
 *     summary: Delete user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/user/profile', auth, userController.deleteProfile.bind(userController));

// Health check routes
/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Get detailed health status
 *     description: Returns detailed information about the system's health
 *     responses:
 *       200:
 *         description: System is healthy
 *       503:
 *         description: Service unavailable
 */
router.get('/health', healthController.check);

/**
 * @swagger
 * /ping:
 *   get:
 *     tags: [Health]
 *     summary: Simple ping endpoint
 *     description: Returns a simple OK response if the server is running
 *     responses:
 *       200:
 *         description: Server is running
 */
router.get('/ping', healthController.ping);

export function setRoutes(app: any) {
    // Swagger UI route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // API routes
    app.use('/api', router);
    router.get('/', indexController.getIndex.bind(indexController));
}