import { promises } from "dns";

import { Tourist } from "@/Types";



  const API_URL = process.env.NEXT_PUBLIC_API_URL + '/tourists';


  export const Create_Tourist = async (touristData: Tourist) => {
    console.log(JSON.stringify(touristData));
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(touristData),
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

  
  
  export const Get_Tourist =  async (email: string , password : string) => {
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


  const Get_Tourist_By_ID =  async (id: number) => {
      return fetch(API_URL + `/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

    }



    const Get_all_Tourists =  async () => {
      return fetch(API_URL + `/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }


  
  
     
  const Guide_Service = {
      Create_Tourist,
      Get_Tourist, 
      Get_all_Tourists,
      
    }
    
export default Guide_Service