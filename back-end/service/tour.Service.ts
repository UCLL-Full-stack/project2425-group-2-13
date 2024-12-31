
import { generateJWTtoken } from '../util/jwt';

import {Tour} from "../model/tour"
import Tourdb from "../repository/prisma/Tour.db"
import { GuideLoginInput, AuthenticationResponse } from "../types";

import bcrypt from 'bcrypt';
import TouristDb from '../repository/prisma/Tourist.db';
import { Tourist } from '@prisma/client';

const createTour = async ({
    name,
    description,
    distance,
    duration,
    level, 
    guide_email,
    day,
    number_of_participants
}: {
    name: string;
    description : string;
    distance: number;
    duration : number;
    level: string;
    guide_email : string;
    day: Date;
    number_of_participants: number
}): Promise<Tour> => {
    // Validate inputs
    if (!name ||
        !level ||
        !distance ||
        !description ||
        !duration ||
        !guide_email ||
        !day ||
        !number_of_participants) {
        throw new Error('All fields are required.');
    }


    // Create a new instance of Guide
    const tour = new Tour({
        name: name,
        description: description,
        distance: distance,
        duration: duration,
        guide_email: guide_email,
        level: level,
        day: day,
        number_of_participants: number_of_participants
    });

    // Add the guide to the database
    const createdTour = await Tourdb.createTour(tour);

    // Return the created Guide
    return createdTour;
};


const Get_all_Tours = async (): Promise<Tour[]> => {
    console.log("Calling Tourdb.getAllTours...");
    return Tourdb.getAllTours();
};


const Get_Tours_By_Guide = async ({
    email,
}:
{
    
    email: string;
}): Promise<Tour[] | null> => {
    console.log("Calling Guidedb.getGuide...");
    return Tourdb.getToursByGuide(email);
}





export default{
    createTour,
    Get_all_Tours,
    Get_Tours_By_Guide
};