import { Router } from 'express';


const siteRouter = Router();

siteRouter.get('/', (req, res) => {
    res.send("Hello world... My name is Mathilda!");
});

siteRouter.get('/home', (req, res) => {
    res.send("Home...");
});

siteRouter.get('/login', (req, res) => {
    res.send("Login...");
});



export default siteRouter;