import {Router} from 'express';
import AuthMiddleware from '../middlewares/auth';
import ProjectsController from '../controllers/projects';
import PermissionsMiddleware from '../middlewares/permissions';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from '../middlewares/id';

const router = Router();

router
    .route('/')
    .post(AuthMiddleware.isAuthenticated, IdMiddleware.notExist, ProjectsController.create)
    .get(AuthMiddleware.isAuthenticated, ProjectsController.getAll)

router
    .route('/:id')
    .get(AuthMiddleware.isAuthenticated, ExistenceMiddleware.project, ProjectsController.getOne)
    .patch(AuthMiddleware.isAuthenticated, ExistenceMiddleware.project, ProjectsController.update)
    .delete(AuthMiddleware.isAuthenticated, ExistenceMiddleware.project, PermissionsMiddleware.isAuthor, ProjectsController.delete)

export {router as ProjectsRouter};

