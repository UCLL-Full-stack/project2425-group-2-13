import { NextFunction, Request, Response } from 'express';
import {GuideSignupInput, GuideLoginInput} from "../types"
import guideService from '../service/guide.Service';

const express = require('express')
const GuideRouter = express.Router();



GuideRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log("controller reached");
    try {
        const userInput = <GuideSignupInput>req.body;
        const user = await guideService.createguide(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

GuideRouter.get('/', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch all guides");
        console.log(await guideService.Get_all_Guides());
        const result = await guideService.Get_all_Guides();
        console.log("Fetched guides:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching guides:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



GuideRouter.post('/login', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch guide");
        const userInput = <GuideLoginInput>req.body;
        console.log(await guideService.Get_all_Guides());
        const result = await guideService.Get_Guide(userInput);
        console.log("Fetched guides:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching guides:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

GuideRouter.get('/login/{id}', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch guide by id");
        const userInput = <GuideSignupInput>req.body;
        console.log(await guideService.Get_all_Guides());
        const result = await guideService.Get_Guide(userInput);
        console.log("Fetched guides:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching guides:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






export { GuideRouter };