import { PrismaClient } from '@prisma/client';
import { Admin } from '../../model/Admin';
import { arMA } from 'date-fns/locale';

const database = new PrismaClient();

// Fetch all tours
const getAllAdmins = async (): Promise<Admin[]> => {
  try {
    const adminPrisma = await database.admin.findMany();
    return adminPrisma ? adminPrisma.map((admin) => Admin.from(admin)) : [];
  } catch (error) {
    console.error('Error fetching all Admins:', error);
    throw new Error('Database error. See server log for details.');
  }
};

// Fetch tours by guide email
/*const getToursByGuide = async (email: string): Promise<Tour[]> => {
  try {
    const guide = await GuideDb.getGuideByEmail(email);

    if (!guide) {
      throw new Error(`Guide with email ${email} does not exist`);
    }

    const toursPrisma = await database.tour.findMany({
      where: { guide_id: guide.getID() },
    });

    return toursPrisma ? toursPrisma.map((tour) => Tour.from(tour)) : [];
  } catch (error) {
    console.error('Error fetching tours by guide:', error);
    throw new Error('Database error. See server log for details.');
  }
};*/

const getAmindByEmail = async (email: string): Promise<Admin | null> => {
  try {
    const adminPrisma = await database.admin.findFirst({
      where: { email },
    });
    return adminPrisma ? Admin.from(adminPrisma) : null;
  } catch (error) {
    console.log(error);
    throw new Error('Database error, See server log for details');
  }
};






// Create a new tour
const createAdmin = async (admin: Admin): Promise<Admin> => {
  try {
    const createdAdmin = await database.admin.create({
      data: {
        fname : admin.getFname(),
        lname : admin.getLname(),
        email : admin.getEmail(),
        password : admin.getPassword()

      },
    });
    return Admin.from(createdAdmin);

  } catch (error) {
    console.error('Error creating tour:', error);
    throw new Error('Database error. See server log for details.');
  }
};

const Get_Admin = async (email: string, password: string): Promise<Admin| null>  => {
  try {
      const adminPrisma = await database.admin.findFirst({
          where: { email, password },
          });
          if (adminPrisma) {
              return new Admin({
                  id: adminPrisma.id,
                  Fname: adminPrisma.fname,
                  Lname: adminPrisma.lname,
                  email: adminPrisma.email,
                  password: adminPrisma.password,
                  });
                  } else {
                      return null;
                      }
                      } catch (error) {
                          console.error('Error fetching Admin by email:', error);
                          throw new Error('Database error. See server log for details.');
                          }
}


export default {
  getAllAdmins,
  createAdmin,
  getAmindByEmail,
  Get_Admin
  
};
