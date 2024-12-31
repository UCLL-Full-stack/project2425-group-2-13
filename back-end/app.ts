import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';
import { expressjwt } from 'express-jwt';
import { GuideRouter } from '../back-end/controller/guides.routes'
import { TouristRouter } from '../back-end/controller/tourists.routes'
import { TourRouter } from '../back-end/controller/tours.routes'
import {AdminRouter}  from '../back-end/controller/admins.routes'
import { Tourist } from './model/tourist';
import { Admin } from './model/Admin';

const db = new PrismaClient()

const app = express();

app.use(cors({origin: 'http://localhost:8000'}));
app.use(bodyParser.json());
app.use('/guides', GuideRouter);
app.use('/tourists', TouristRouter );
app.use('/tours', TourRouter);
app.use('/admins', AdminRouter);



dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

async function main() {
    /*const mainad = new Admin({ 
        Fname: "Jonah",
        Lname: 'Smith',
        email: "jonah.smith@gmail.com",
        password: "masterpassword",
    });
    const admin = await db.admin.create({
        data: {
            fname: mainad.getFname(),
            lname: mainad.getLname(),
            email: mainad.getEmail(),
            password: mainad.getPassword(),
        },
    });
    console.log('Admin created:', admin);
    created the main admin
    */
}

