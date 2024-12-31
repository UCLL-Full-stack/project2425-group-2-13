import { NextFunction, Request, Response } from 'express';
import {GuideSignupInput, GuideLoginInput, Tour} from "../types"
import TourService from '../service/tour.Service'

const express = require('express')
const TourRouter = express.Router();



TourRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log("controller reached");
    try {
        const userInput = <Tour>req.body;
        const user = await TourService.createTour(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});




TourRouter.get('/', async (req: Request, res: Response) => { 
    
    try {
        console.log("Request received to fetch all guides");
        console.log(await TourService.Get_all_Tours());
        const result = await TourService.Get_all_Tours();
        console.log("Fetched guides:", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching guides:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



TourRouter.get('/:email', async (req: Request, res: Response) => {
    try {
      console.log('Request received to fetch tours by guide email');
  
      const { email } = req.params;
  
      if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
      }
  
      // Fetch tours by guide email
      const result = await TourService.Get_Tours_By_Guide({email});
  
      console.log('Fetched tours:', result);
  
      // Send response with fetched tours
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching tours:', error);
  
      // Send error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });






export { TourRouter };