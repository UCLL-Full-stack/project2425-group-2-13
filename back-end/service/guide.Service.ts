
import { generateJWTtoken } from '../util/jwt';

import {Guide} from "../model/guide"
import Guidedb from "../repository/prisma/Guide.db"
import { GuideLoginInput, AuthenticationResponse } from "../types";

import bcrypt from 'bcrypt';

const createguide = async ({
    firstName,
    lastName,
    email,
    password,
    region,
}: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    region: string;
}): Promise<Guide> => {
    // Validate inputs
    if (!firstName || !lastName || !email || !password || !region) {
        throw new Error('All fields are required.');
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        throw new Error('Invalid email format.');
    }

    // Check if email is already registered
    const existingEmail = await Guidedb.getGuideByEmail(email);
    if (existingEmail) {
        throw new Error(`Guide with email: ${email} is already registered.`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new instance of Guide
    const guide = new Guide({
        fname: firstName,
        lname: lastName,
        email: email,
        password: hashedPassword,
        region: region,
    });

    // Add the guide to the database
    const createdGuide = await Guidedb.addGuide(guide);

    // Return the created Guide
    return createdGuide;
};


const Get_all_Guides = async (): Promise<Guide[]> => {
    console.log("Calling Guidedb.getAllGuides...");
    return Guidedb.getAllGuides();
};


const Get_Guide = async ({
    email,
    password
}:
{
    
    email: string;
    password: string;
}): Promise<Guide | null> => {
    console.log("Calling Guidedb.getGuide...");
    return Guidedb.Get_Guide(email, password);
}

const authenticate = async({email,password}: GuideLoginInput): Promise<AuthenticationResponse> => {
    if (!email) {
        throw new Error("Email cannot be empty");
    }
    const guide = await Guidedb.getGuideByEmail(email);

    if (!guide) {
        throw new Error("User not found");
    }

    if (!password) {
        throw new Error("Password cannot be empty")
    }
    const isValidPassword = await bcrypt.compare(password, guide.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password');
    }
    return {
        token: generateJWTtoken({ email }),
        email: email,
        fullname: `${guide.getName}`
    };
}




export default{
    createguide,
    Get_all_Guides,
    Get_Guide
};