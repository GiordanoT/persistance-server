import {Router} from 'express';
import AuthMiddleware from "../middlewares/auth";
import UsersController from '../controllers/users';

const router = Router();

router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, UsersController.getAll)

export {router as UsersRouter};

