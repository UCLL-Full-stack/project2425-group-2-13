import { promises } from "dns";



export interface Tour {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    region: string;
  }
  

  const API_URL = process.env.NEXT_PUBLIC_API_URL + '/tours';


  export const Create_Tour = async (toursData: Tour) => {
    console.log(JSON.stringify(toursData));
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toursData),
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

  
  
  export const Get_Tours_by_Guide =  async (email: string ) => {
      try {
        const response = await fetch(API_URL + '/login/' + email, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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


  const Get_Tour_By_ID =  async (id: number) => {
      return fetch(API_URL + `/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

    }



    const Get_all_Tours =  async () => {
      return fetch(API_URL + `/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }


  
  
     
  const Tour_Service = {
      Create_Tour,
      Get_Tours_by_Guide, 
      Get_all_Tours,
      Get_Tour_By_ID
      
    }
    
export default Tour_Service