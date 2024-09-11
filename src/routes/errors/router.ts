import {Router} from 'express';
import {ErrorsController} from './controller';
import AuthMiddleware from '../../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, ErrorsController.getAll)
    .post(AuthMiddleware.isAuthenticated, ErrorsController.create)


export {router as ErrorsRouter};

