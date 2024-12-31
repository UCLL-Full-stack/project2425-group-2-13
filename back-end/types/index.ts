import {Tourist} from "../model/tourist"


export type Guide = {
    id?: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    region : string;
  };

  type GuideSignupInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    region: string;
};

type GuideLoginInput = {
  email: string;
  password: string;
};






type TouristLoginInput = {
  email: string;
  password: string;
};

type TouristSignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  region: string;
}



type Tour ={
  id?: number;
  name: string;
  description: string;
  distance: number;
  duration: number;
  level: string,
  guide_email: string,
  participants: Tourist[],
  number_of_participants: number;
  day: Date;
}



type Admin = {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

type AdminLoginInput = {
  email: string;
  password: string;
  }

type AdminSignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  }






type AuthenticationResponse = {
  token: string;
  email: string;
  fullname: string;
};


  export {
    Role,
    GuideSignupInput,
    GuideLoginInput,
    AuthenticationResponse,
    TouristSignupInput,
    TouristLoginInput,
    Tour,
    Admin,
    AdminLoginInput,
    AdminSignupInput
  }


  type Role = 'admin' | 'guide' | 'tourist';