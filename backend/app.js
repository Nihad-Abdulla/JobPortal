import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnection} from './database/dbConnection.js';


const app = express();
dotenv.config({path: "./confiq/confiq.env"});

//cors middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','POST','DELETE','PUT'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp/",
    })
);

//routes
app.use('/api/v1/user',userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job',jobRouter);

//mongodb connection
dbConnection();

export default app;