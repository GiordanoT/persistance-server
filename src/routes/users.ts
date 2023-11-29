import {Router} from 'express';
import AuthMiddleware from '../middlewares/auth';
import {UsersController} from '../controllers';
import ExistenceMiddleware from '../middlewares/existence';

const router = Router();

router
    .route('/')
    .get(
        AuthMiddleware.isAuthenticated,
        UsersController.getAll
    )

router
    .route('/:id/projects')
    .get(
        AuthMiddleware.isAuthenticated,
        ExistenceMiddleware.user,
        UsersController.projects
    )

router
    .route('/:id')
    .get(
        AuthMiddleware.isAuthenticated,
        ExistenceMiddleware.user,
        UsersController.getById
    )
    .patch(
        AuthMiddleware.isAuthenticated,
        ExistenceMiddleware.user,
        UsersController.update
    )
    .delete(
        AuthMiddleware.isAuthenticated,
        ExistenceMiddleware.user,
        UsersController.delete
    )

export {router as UsersRouter};

