import { PrismaClient } from '@prisma/client';
import { Tour } from '../../model/tour';
import GuideDb from './Guide.db';

const database = new PrismaClient();

// Fetch all tours
const getAllTours = async (): Promise<Tour[]> => {
  try {
    const toursPrisma = await database.tour.findMany();
    return toursPrisma ? toursPrisma.map((tour) => Tour.from(tour)) : [];
  } catch (error) {
    console.error('Error fetching all tours:', error);
    throw new Error('Database error. See server log for details.');
  }
};

// Fetch tours by guide email
const getToursByGuide = async (email: string): Promise<Tour[]> => {
  try {
    const guide = await GuideDb.getGuideByEmail(email);

    if (!guide) {
      throw new Error(`Guide with email ${email} does not exist`);
    }

    const toursPrisma = await database.tour.findMany({
      where: { guide_email: email},
    });

    return toursPrisma ? toursPrisma.map((tour) => Tour.from(tour)) : [];
  } catch (error) {
    console.error('Error fetching tours by guide:', error);
    throw new Error('Database error. See server log for details.');
  }
};





// Create a new tour
const createTour = async (tour: Tour): Promise<Tour> => {
  try {
    const createdTour = await database.tour.create({
      data: {
        name: tour.getName(),
       description: tour.getDescription(),
       distance: tour.getDistance(),
       duration: tour.getDuration(),
       level: tour.getLevel(), 
       guide_email: tour.getGuideEmail(),
       day: tour.getDay(),
       number_of_participants: tour.getNumberOfParticipants()
      },
    });

    return Tour.from(createdTour);
  } catch (error) {
    console.error('Error creating tour:', error);
    throw new Error('Database error. See server log for details.');
  }
};



export default {
  getAllTours,
  getToursByGuide,
  createTour,
};
