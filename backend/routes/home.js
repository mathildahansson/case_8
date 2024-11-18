import { Router } from 'express';

const home = Router();

home.get('/', (req, res) => {
    console.log("GET request");
});

home.post('/home', (req, res) => {
    console.log("POST request");
});

export default home;