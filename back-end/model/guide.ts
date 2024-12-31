import { Guide as GuidePrisma, Tour as TourPrisma } from '@prisma/client';


export class Guide {
    private id? : number;
    private lname : string;
    private fname : string;
    private email : string;
    private region : string ;
    private password : string;

    constructor(Guide: 
        {id? : number, lname : string,fname : string, email : string, region : string, password : string}) {
        this.id = Guide.id;
        this.fname = Guide.fname;
        this.lname = Guide.lname;
        this.email = Guide.email;
        this.password = Guide.password;
        this.region = Guide.region;
        
    }

    static from({
        id,
        lname,
        fname,
        email,
        region,
        password,
    }: GuidePrisma & { tour_list?: TourPrisma[] }) {
        return new Guide({
            id,
            lname,
            fname,
            email,
            region,
            password,
        });
    }

    getID() : number | undefined {
        return this.id;
    }
    getName() : string {
        return this.fname + " " + this.lname;
    }
    getFname() : string {
        return this.fname;
    }
    getLname() : string {
        return this.lname;
        }

    getEmail() : string {
        return this.email;
    }
    getRegion() : string {
        return this.region;
    }
    getPassword() : string {
        return this.password;
    }


    setID(id : number) {
        this.id = id;
    }
    setFname(first_name : string) {
        this.fname = first_name;
    }
    setLname(last_name : string){
        this.lname = last_name;
    } 
    setEmail(Email : string) {
        this.email = Email;
    }

    setRegion(Region : string) {
        this.region = Region;
    }
    setPassword(password : string) {
        this.password = password;
    }




}