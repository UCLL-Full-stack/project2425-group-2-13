import { PrismaClient, Tourist as TouristPrisma, Tour as TourPrisma } from '@prisma/client';

export class Tourist {
    private id?: number;
    private lname: string;
    private fname: string;
    private email: string;
    private password: string;
    private region: string;

    constructor({
        id,
        fname,
        lname,
        email,
        password,
        region,
    }: {
        id?: number;
        fname: string;
        lname: string;
        email: string;
        password: string;
        region: string;
    }) {
        this.id = id;
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.region = region;
    }

    static from({
        id,
        email,
        fname,
        lname,
        password,
        region,
    }: TouristPrisma & { tours?: TourPrisma[] }) {
        return new Tourist({
            id,
            email,
            fname,
            lname,
            password,
            region,
        });
    }

    getID(): number | undefined {
        return this.id;
    }
    getName(): string {
        return `${this.fname} ${this.lname}`;
    }
    getFname(): string {
        return this.fname;
    }
    getLname(): string {
        return this.lname;
    }
    getEmail(): string {
        return this.email;
    }
    getPassword(): string {
        return this.password;
    }
    getRegion(): string {
        return this.region;
    }

    setID(id: number): void {
        this.id = id;
    }
    setFname(firstName: string): void {
        this.fname = firstName;
    }
    setLname(lastName: string): void {
        this.lname = lastName;
    }
    setEmail(email: string): void {
        this.email = email;
    }
    setPassword(password: string): void {
        this.password = password;
    }
    setRegion(region: string): void {
        this.region = region;
    }
}