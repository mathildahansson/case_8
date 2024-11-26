import { Router } from 'express';


const siteRouter = Router();

siteRouter.get('/', (req, res) => {
    res.send("Hello world, backend is running!");
});

siteRouter.get('/home', (req, res) => {
    res.send("Home...");
});

siteRouter.get('/login', (req, res) => {
    res.send("Login...");
});



export default siteRouter;