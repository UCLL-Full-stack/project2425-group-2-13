import { PrismaClient } from '@prisma/client';
import { Tourist } from '../../model/tourist';
import { Role } from '../../types';
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

const addTourist = async (tourist: Tourist): Promise<Tourist> => {
    try {
        const touristCreated = await database.tourist.create({
            data: {
                fname: tourist.getFname(),
                lname: tourist.getLname(),
                email: tourist.getEmail(),
                password: tourist.getPassword(),
                region: tourist.getRegion(),
            },
        });
        return Tourist.from(touristCreated);
    } catch (error) {
        console.error('Error adding tourist:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTouristByEmailAndPassword = async (email: string, password: string): Promise<Tourist | null> => {
    try {
        const touristPrisma = await database.tourist.findFirst({
            where: { email, password },
        });
        return touristPrisma ? Tourist.from(touristPrisma) : null;
    } catch (error) {
        console.error('Error fetching tourist by email and password:', error);
        throw new Error('Database error. See server log for details.');
    }
};

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
