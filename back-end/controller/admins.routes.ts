import { NextFunction, Request, Response } from 'express';
import {AdminLoginInput, AdminSignupInput} from "../types"
import adminService from '../service/admin.Service';

const express = require('express')
const AdminRouter = express.Router();


//make admin
AdminRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log("controller reached");
    try {
        const userInput = <AdminSignupInput>req.body;
        const user = await adminService.createadmin(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

//get an all admins 
AdminRouter.get('/', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch all admins");
        console.log(await adminService.Get_all_Admins());
        const result = await adminService.Get_all_Admins();
        console.log("Fetched admins:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching admins:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//get an admin
AdminRouter.post('/login', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch admin");
        const userInput = <AdminLoginInput>req.body;
        const result = await adminService.Get_Admin(userInput);
        console.log("Fetched admin:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching ADMINS:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


AdminRouter.get('/login/{id}', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch guide by id");
        const userInput = <AdminLoginInput>req.body;
        console.log(await adminService.Get_all_Admins());
        const result = await adminService.Get_Admin(userInput);
        console.log("Fetched guides:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching guides:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//updating an admin, 
AdminRouter.put('/update/{id}', async (req: Request, res: Response) => {

    try {
        console.log("Request received to update admin");
        const userInput = <AdminLoginInput>req.body;


    } catch (error){

    }

});






export { AdminRouter };