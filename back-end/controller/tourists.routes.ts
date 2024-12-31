import { NextFunction, Request, Response } from 'express';
import { TouristSignupInput, TouristLoginInput } from "../types";
import touristService from '../service/tourist.Service';

const express = require('express');
const TouristRouter = express.Router();

// Route for creating a new tourist
TouristRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log("Tourist signup controller reached");
    try {
        const userInput = <TouristSignupInput>req.body;
        const user = await touristService.addTourist(userInput);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error during tourist creation:', error);
        next(error);
    }
});

// Route for fetching all tourists
TouristRouter.get('/', async (req: Request, res: Response) => {
    try {
        console.log("Request received to fetch all tourists");
        const result = await touristService.getAllTourists();
        console.log("Fetched tourists:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching tourists:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for tourist login
TouristRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Tourist login controller reached");
        const userInput = <TouristLoginInput>req.body;
        const result = await touristService.getTouristByEmailAndPassword(userInput);
        console.log("Authenticated tourist:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error during tourist login:', error);
        next(error);
    }
});

// Route for fetching a specific tourist by ID
TouristRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Request received to fetch tourist by ID");
        const id = parseInt(req.params.id, 10);
        const result = await touristService.getTouristById(id);
        console.log("Fetched tourist:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching tourist by ID:', error);
        next(error);
    }
});

export { TouristRouter };
