import express from "express";
import { json, urlencoded } from 'body-parser';
import { RouterVotos } from './../../events/client/top.gg'
import { StatusRouter } from "./Routes/Status";
import { ApiRouter } from "./Routes/Api";

export const app = express()

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/votos', RouterVotos);
app.use('/status', StatusRouter);
app.use('/api', ApiRouter);


