
import { generateJWTtoken } from '../util/jwt';

import {Admin} from "../model/Admin"
import Admindb from "../repository/prisma/Admin.db"
import { GuideLoginInput, AuthenticationResponse} from "../types";

import bcrypt from 'bcrypt';

const createadmin = async ({
    firstName,
    lastName,
    email,
    password,
}: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}): Promise<Admin> => {
    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required.');
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        throw new Error('Invalid email format.');
    }

    // Check if email is already registered
    const existingEmail = await Admindb.getAmindByEmail(email);
    if (existingEmail) {
        throw new Error(`Guide with email: ${email} is already registered.`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new instance of Guide
    const admin = new Admin({
        Fname: firstName,
        Lname: lastName,
        email: email,
        password: hashedPassword,
    });

    // Add the guide to the database
    const createdAdmin = await Admindb.createAdmin(admin);

    // Return the created Guide
    return createdAdmin;
};


const Get_all_Admins = async (): Promise<Admin[]> => {
    console.log("Calling Admindb.getAllAdmins...");
    return Admindb.getAllAdmins();
};


const Get_Admin = async ({
    email,
    password
}:
{
    
    email: string;
    password: string;
}): Promise<Admin | null> => {
    console.log("Calling Admindb...");
    return Admindb.Get_Admin(email, password);
}

const authenticate = async({email,password}: GuideLoginInput): Promise<AuthenticationResponse> => {
    if (!email) {
        throw new Error("Email cannot be empty");
    }
    const guide = await Admindb.getAmindByEmail(email);

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
    Get_all_Admins,
    Get_Admin,
    createadmin
   
};