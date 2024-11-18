import { Router } from 'express';

const login = Router();

login.get('/login', (req, res) => {
    console.log("GET request");
});

login.post('/login', (req, res) => {
    console.log("POST request");
});

export default login;