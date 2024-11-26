import { Router } from 'express';

const siteRouter = Router();

siteRouter.get('/', (req, res) => {
    res.send("Hello world, backend is running!");
});

export default siteRouter;