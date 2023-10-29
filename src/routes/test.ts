import {Router} from 'express';

const router = Router();

router
    .route('/')
    .get((req, res) => {
        return res.status(200).send('Hello World');
    })

export {router as TestRouter};

