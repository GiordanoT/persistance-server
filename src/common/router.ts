import {Router, RequestHandler} from 'express';
import AuthMiddleware from '../middlewares/auth';
import ExistenceMiddleware from '../middlewares/existence';

class RouterBuilder {
    static build(router: Router, url: string, get: RequestHandler, create: RequestHandler, remove: RequestHandler) {
        router
            .route(url)
            .get(
                AuthMiddleware.isAuthenticated,
                ExistenceMiddleware.project,
                get
            )
            .post(
                AuthMiddleware.isAuthenticated,
                ExistenceMiddleware.project,
                create
            )
            .delete(
                AuthMiddleware.isAuthenticated,
                ExistenceMiddleware.project,
                remove
            )
    }
}

export default RouterBuilder;
