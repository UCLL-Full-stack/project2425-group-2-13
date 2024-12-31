import { PrismaClient, Tour } from '@prisma/client';
import { Tourist } from '../model/tourist';
import TouristDb from '../repository/prisma/Tourist.db';
import { generateJWTtoken } from '../util/jwt';
import bcrypt from 'bcrypt';
const database = new PrismaClient();

const getAllTourists = async (): Promise<Tourist[]> => {
    try {
        const touristsPrisma = await database.tourist.findMany({
            include: { tours: true },
        });
        return touristsPrisma.map((touristPrisma) => Tourist.from(touristPrisma));
    } catch (error) {
        console.error('Error fetching all tourists:', error);
        throw new Error('Database error. See server log for details.');
    }
};




const getTouristByEmail = async (email: string): Promise<Tourist | null> => {
    try {
        const touristPrisma = await database.tourist.findFirst({
            where: { email },
        });
        return touristPrisma ? Tourist.from(touristPrisma) : null;
    } catch (error) {
        console.error('Error fetching tourist by email:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addTourist = async ({
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
}): Promise<Tourist> => {
    // Validate inputs
    if (!firstName || !lastName || !email || !password || !region) {
        throw new Error('All fields are required.');
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        throw new Error('Invalid email format.');
    }

    // Check if email is already registered
    const existingEmail = await getTouristByEmail(email);
    if (existingEmail) {
        throw new Error(`Guide with email: ${email} is already registered.`);
    }


    const hashedPassword = await bcrypt.hash(password, 12);

    const tourist = new Tourist({
        fname: firstName,
        lname: lastName,
        email: email,
        password: hashedPassword,
        region: region,
    });

    // Add the guide to the database
    const createdGuide = await TouristDb.addTourist(tourist);

    // Return the created Guide
    return createdGuide;
};


const getTouristByEmailAndPassword = async ({
    email,
    password
}:
{
    
    email: string;
    password: string;
}): Promise<Tourist | null> => {
    console.log("Calling Guidedb.getGuide...");
    return TouristDb.getTouristByEmailAndPassword(email, password);
}


const getTouristById = async (id: number): Promise<Tourist | null> => {
    try {
        const touristPrisma = await database.tourist.findUnique({
            where: { id },
        });
        return touristPrisma ? Tourist.from(touristPrisma) : null;
    } catch (error) {
        console.error('Error fetching tourist by ID:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTourists,
    getTouristByEmail,
    addTourist,
    getTouristByEmailAndPassword,
    getTouristById, // Added export for GetTouristById
};
