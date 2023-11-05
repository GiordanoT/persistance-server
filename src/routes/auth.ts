import {Router} from 'express';
import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

router
    .route('/register')
    .post(AuthController.register)

router
    .route('/login')
    .post(AuthController.login)

router
    .route('/logout')
    .get(AuthMiddleware.isAuthenticated, AuthController.logout)

export {router as AuthRouter};

