import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import U from './common/u';
import {AuthRouter, UsersRouter, ProjectsRouter, ErrorsRouter, AdminRouter} from './routes';

const app = express();
app.use(express.static('public'));
app.use(cors({credentials: true, origin: 'http://localhost:3000', methods: '*'}));
app.use(compression());
app.use(bodyParser.json({limit: '64mb'}));

/* Server */
const PORT = 5002;
const server = http.createServer(app);
server.listen(PORT);
console.log('********** JJodel Persistance Server v1.6  **********');
console.log(`Server Listening on port ${PORT}.`);

/* Database */
(async function() {
    mongoose.Promise = Promise;
    let connection = false;
    while(!connection) {
        try {
            await mongoose.connect(process.env['MONGODB_URL'], {dbName: 'jjodel'});
            console.log('DB Connection done.');
            connection = true;
        } catch (error) {
            console.log(`DB Connection error (${process.env['MONGODB_URL']}), waiting 30 seconds...`);
            await U.sleep(30);
        }
    }
})();


/* Routes */
const root = 'persistance';
app.use(`/${root}/auth`, AuthRouter);
app.use(`/${root}/users`, UsersRouter);
app.use(`/${root}/projects`, ProjectsRouter);
app.use(`/${root}/errors`, ErrorsRouter);
app.use(`/${root}/admin`, AdminRouter);
