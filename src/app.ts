import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import {
    AuthRouter,
    UsersRouter
} from './routes';

const app = express();

app.use(express.static('public'));
app.use(cors({credentials: true}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

/* Server */
const server = http.createServer(app);
server.listen(5002);

/* Database */
mongoose.Promise = Promise;
mongoose.connect(process.env['MONGODB_URL']).then();
mongoose.connection.on('error', error => console.log(error));

/* Routes */
const root = 'persistance';
app.use(`/${root}/auth`, AuthRouter);
app.use(`/${root}/users`, UsersRouter);
