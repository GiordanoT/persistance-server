import {Router} from 'express';
import AuthMiddleware from '../middlewares/auth';
import ProjectsController from '../controllers/projects';
import PermissionsMiddleware from '../middlewares/permissions';
import ExistenceMiddleware from '../middlewares/existence';
import RouterBuilder from '../common/router';
import {
    MetamodelsController,
    ModelsController,
    PackagesController,
    ClassesController,
    EnumeratorsController,
    AttributesController,
    ReferencesController,
    LiteralsController
} from '../controllers';

const router = Router();

const endpoints = [
    {url: '/:id/metamodels', controller: MetamodelsController},
    {url: '/:id/models', controller: ModelsController},
    {url: '/:id/packages', controller: PackagesController},
    {url: '/:id/classes', controller: ClassesController},
    {url: '/:id/enumerators', controller: EnumeratorsController},
    {url: '/:id/attributes', controller: AttributesController},
    {url: '/:id/references', controller: ReferencesController},
    {url: '/:id/literals', controller: LiteralsController}
];

for(const endpoint of endpoints) {
    const controller = endpoint.controller;
    RouterBuilder.build(router, endpoint.url, controller.get, controller.create, controller.delete);
}

router
    .route('/')
    .post(
        AuthMiddleware.isAuthenticated,
        ProjectsController.save
    )
router
    .route('/:id')
    .delete(
        AuthMiddleware.isAuthenticated,
        ExistenceMiddleware.project,
        PermissionsMiddleware.isAuthor,
        ProjectsController.delete
    )

export {router as ProjectsRouter};

