import { Router } from "express";

export var ApiRouter = Router();

ApiRouter.all("/*", (_, res) => {
    res.status(503).json({ error: 'En desarrollo' })
})

console.debug('[WEB] ApiRouter is loading')