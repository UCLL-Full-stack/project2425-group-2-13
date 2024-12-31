import { PrismaClient } from '@prisma/client';
import { Guide } from '../../model/guide';
import { Role } from '../../types';
const database = new PrismaClient();

const getAllGuides = async (): Promise<Guide[]> => {
    try {
        const guidesPrisma = await database.guide.findMany({});
        return guidesPrisma ? guidesPrisma.map((banana) => Guide.from(banana)) : [];
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


/*const getGuideById = async ({ id }: { id: number }): Promise<Guide | null> => {
    try {
        const guidePrisma = await database.guide.findUnique({
            where: { id },
            include: {
                profile: true,
                recipes: {
                    include: {
                        ingredients: true,
                    },
                },
            },
        });

        return guidePrisma ? {
            id: guidePrisma.id,
            fname: guidePrisma.profile.firstName,
            lname: guidePrisma.profile.lastName,
            email: guidePrisma.profile.email,
            password: guidePrisma.password,
            region: guidePrisma.region,
        } : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};*/

/*const getGuideByGuidename = async ({ Guidename }: { Guidename: string }): Promise<Guide | null> => {
    try {
        const guidePrisma = await database.guide.findFirst({
            where: { Guidename },
            include: {
                profile: true,
                recipes: {
                    include: {
                        ingredients: true,
                    },
                },
            },
        });

        return guidePrisma ? {
            id: guidePrisma.id,
            fname: guidePrisma.profile.firstName,
            lname: guidePrisma.profile.lastName,
            email: guidePrisma.profile.email,
            password: guidePrisma.password,
            region: guidePrisma.region,
        } : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};*/

const getGuideByEmail = async (email: string): Promise<Guide | null> => {
    try {
      const guidePrisma = await database.guide.findFirst({
        where: { email },
      });
      return guidePrisma ? Guide.from(guidePrisma) : null;
    } catch (error) {
      console.log(error);
      throw new Error('Database error, See server log for details');
    }
  };
  
  

const addGuide = async (guide: Guide): Promise<Guide> => {
    try {
        const guideCreated = await database.guide.create({
            data: {
                password: guide.getPassword(),
                region: guide.getRegion(),
                fname: guide.getFname(),
                lname: guide.getLname(),
                email: guide.getEmail(),
            },
        });


        return Guide.from(guideCreated); // Return the created Guide
    } catch (error) {
        console.error('Error adding Guide:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const Get_Guide = async (email: string, password: string): Promise<Guide| null>  => {
    try {
        const guidePrisma = await database.guide.findFirst({
            where: { email, password },
            });
            if (guidePrisma) {
                return new Guide({
                    id: guidePrisma.id,
                    fname: guidePrisma.fname,
                    lname: guidePrisma.lname,
                    email: guidePrisma.email,
                    password: guidePrisma.password,
                    region: guidePrisma.region,
                    });
                    } else {
                        return null;
                        }
                        } catch (error) {
                            console.error('Error fetching guide by email:', error);
                            throw new Error('Database error. See server log for details.');
                            }
}


export default {
    getAllGuides,
    getGuideByEmail,
    addGuide,
    Get_Guide
};