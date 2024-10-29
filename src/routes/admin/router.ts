import {Router} from 'express';
import {AdminController} from './controller';

const router = Router();

router
    .route('/news')
    .get(AdminController.news)
    .post(AdminController.createNews)
    .delete(AdminController.deleteNews)

router
    .route('/projects')
    .get(AdminController.projects)

router
    .route('/users')
    .get(AdminController.users)

export {router as AdminRouter};

