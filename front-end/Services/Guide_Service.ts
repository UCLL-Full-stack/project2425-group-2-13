import { promises } from "dns";



export interface Guide {
    id?: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    region: string;
  }
  

  const API_URL = process.env.NEXT_PUBLIC_API_URL + '/guides';


  export const Create_Guide = async (guideData: Guide) => {
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

  
  
  export const Get_Guide =  async (email: string , password : string) => {
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


  const Get_Guide_By_ID =  async (id: number) => {
      return fetch(API_URL + `/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

    }



    const Get_all_Guides =  async () => {
      return fetch(API_URL + `/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }


  
  
     
  const Guide_Service = {
      Create_Guide,
      Get_Guide, 
      Get_all_Guides,
      
    }
    
export default Guide_Service