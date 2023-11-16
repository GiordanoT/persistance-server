import {Router} from 'express';
import AuthMiddleware from '../middlewares/auth';
import PermissionsMiddleware from '../middlewares/permissions';
import ExistenceMiddleware from '../middlewares/existence';
import RouterBuilder from '../common/router';
import {
    ProjectsController,
    MetamodelsController,
    ModelsController,
    PackagesController,
    ClassesController,
    EnumeratorsController,
    AttributesController,
    ReferencesController,
    LiteralsController,
    ObjectsController,
    ValuesController,
    ViewsController
} from '../controllers';

const router = Router();

const endpoints = [
    /* DATA */
    {url: '/:id/metamodels', controller: MetamodelsController},
    {url: '/:id/models', controller: ModelsController},
    {url: '/:id/packages', controller: PackagesController},
    {url: '/:id/classes', controller: ClassesController},
    {url: '/:id/enumerators', controller: EnumeratorsController},
    {url: '/:id/attributes', controller: AttributesController},
    {url: '/:id/references', controller: ReferencesController},
    {url: '/:id/literals', controller: LiteralsController},
    {url: '/:id/objects', controller: ObjectsController},
    {url: '/:id/values', controller: ValuesController},
    /* VIEWS */
    {url: '/:id/views', controller: ViewsController}
    /* NODES */
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

