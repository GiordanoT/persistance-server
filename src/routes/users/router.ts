import {Router} from 'express';
import AuthMiddleware from '../../middlewares/auth';
import {UsersController} from './controller';

const router = Router();

router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, UsersController.getAll)

router
    .route('/:id')
    .get(AuthMiddleware.isAuthenticated, UsersController.getById)
    .patch(AuthMiddleware.isAuthenticated, UsersController.update)
    .delete(AuthMiddleware.isAuthenticated, UsersController.delete)

export {router as UsersRouter};
