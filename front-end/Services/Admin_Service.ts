import { promises } from "dns";



export interface Admin {
    id?: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
  }
  

  const API_URL = process.env.NEXT_PUBLIC_API_URL + '/admins';


  export const Create_Admin = async (guideData: Admin) => {
    console.log(JSON.stringify(guideData));
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(guideData),
        });
        const data = await response.json();
        /*if (response.ok) {
            sessionStorage.setItem("authToken", data.token);
        } Will need to do security*/
        return data;
    } catch (error) {
        return error;
    }
};

  
  
  export const Get_Admin =  async (email: string , password : string) => {
      try {
        const response = await fetch(API_URL + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });
        const data = await response.json();
        /*if (response.ok) {
            sessionStorage.setItem("authToken", data.token);
        } Will need to do security*/
        return data;
    } catch (error) {
        return error;
    }


    }


  const Get_Admin_By_ID =  async (id: number) => {
      return fetch(API_URL + `login/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

    }



    const Get_all_Admins =  async () => {
      return fetch(API_URL + `/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }


  
  
     
  const Admin_Service = {
      Create_Admin,
      Get_Admin, 
      Get_Admin_By_ID,
      Get_all_Admins
      
    }
    
export default Admin_Service