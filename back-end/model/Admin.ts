import { Admin as AdminPrisma } from '@prisma/client';

export class Admin {
    private id? : number;
    private fname : string;
    private lname : string;
    private email : string ;
    private password: string;

    constructor(Admin: 
        {id? : number, Fname : string, Lname : string, email: string, password : string}) {
        this.id = Admin.id;
        this.fname = Admin.Fname;
        this.lname = Admin.Lname;
        this.email = Admin.email;
        this.password = Admin.password;

        
    }

    static from({
        id,
        fname,
        lname,
        email,
        password,
    }: AdminPrisma ): Admin {
        return new Admin({
            id,
            Fname : fname,
            Lname : lname,
            email,
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
    getPassword() : string {
        return this.password;
    }


    setID(id : number) {
        this.id = id;
    }
    setName(Fname : string) {
        this.fname = Fname;
    }
    setLname(Lname : string) {
        this.lname = Lname;
    }
    setEmail (email : string) {
        this.email = email;
    }
    setPassword(password : number) {
        this.password = this.password;
    }
   




}