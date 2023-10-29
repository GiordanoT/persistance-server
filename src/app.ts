import express from 'express';
import {TestRouter} from './routes/test';

/* Rest */
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/test', TestRouter);

app.listen(5002);
