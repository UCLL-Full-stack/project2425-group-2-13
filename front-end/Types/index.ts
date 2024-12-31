export type Guide = {
    id?: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    region : string;
  };

  export type Tour ={
    id?: number;
    name: string;
    description: string;
    distance: number;
    duration: number;
    level: string,
    guide_id: number,
    participants: Tourist[],
    number_of_participants: number;
    day: Date;
  }

  export type Tourist = {
    id?     :number;
  firstName    :string;
  lastName     :string;
  email     :string;
  password  :string;
  region    :String;
  }

  export type Admin = {
    id?     :number;
    Fname    :string;
    Lname     :string;
    email     :string;
    password  :string;
  }



  


  type Role = 'admin' | 'guide' | 'tourist';