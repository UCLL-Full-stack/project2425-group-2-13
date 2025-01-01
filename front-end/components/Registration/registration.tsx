import React, { useState } from 'react';
import Guide_Service from '@/Services/Guide_Service';
import Tourist_Service from '@/Services/Tourist_Service';
import { useRouter } from 'next/router';
import { Guide, Tourist } from "../../Types";

import {Create_Guide} from "../../Services/Guide_Service"
import { Create_Tourist } from '@/Services/Tourist_Service';
const TourRegistration = () => {
  const [isTourGuide, setIsTourGuide] = useState(true);
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const guides_update = async () => {
    const guideData: Guide = {
      fname: firstName, // Assuming you have a state variable for first name
      lname: lastName, // Assuming you have a state variable for last name
      email: email, // Assuming you have a state variable for email
      password: password, // Assuming you have a state variable for password
      region: region // Assuming you have a state variable for region
    };
  

      const guide = await Create_Guide(guideData);
      //sessionStorage.setItem("id", guide.id.toString());
      setSuccessMessage('Guide account created successfully!');
      sessionStorage.setItem("Name", firstName)
      console.log(guideData)

    }

    const tourists_update = async () => {
      const touristData: Tourist = {
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        password: password,
        region: region 
      };
    
  
        const tourist = await Create_Tourist(touristData);
        //sessionStorage.setItem("id", guide.id.toString());
        setSuccessMessage('Tourist account created successfully!');
        sessionStorage.setItem("Name", firstName)
        console.log(touristData)
        sessionStorage.setItem("tourist_email", email)
  
      }
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSuccessMessage('');
    sessionStorage.setItem("Name", firstName);
    if(isTourGuide){
      guides_update();
    }
    else{
      tourists_update();
    }


    router.push("/")
  };




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {/* Toggle Button */}
        <div className="flex justify-center mb-4 relative">
          <button
            onClick={() => setIsTourGuide(true)}
            className={`relative w-1/2 py-2 font-semibold text-gray-700 rounded-l-lg transition duration-300 ${
              isTourGuide ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <span className="z-10 relative">Tour Guide</span>
            {isTourGuide && (
              <span
                className="absolute inset-0 bg-blue-700 rounded-l-lg transition-all duration-300 opacity-70"
                aria-hidden="true"
              />
            )}
          </button>
          <button
            onClick={() => setIsTourGuide(false)}
            className={`relative w-1/2 py-2 font-semibold text-gray-700 rounded-r-lg transition duration-300 ${
              !isTourGuide ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <span className="z-10 relative">Tourist</span>
            {!isTourGuide && (
              <span
                className="absolute inset-0 bg-blue-700 rounded-r-lg transition-all duration-300 opacity-70"
                aria-hidden="true"
              />
            )}
          </button>
        </div>


        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFname(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              value={lastName}
              onChange={(e) => setLname(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {isTourGuide && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          )}
          {isTourGuide && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="profilePicture">Profile Picture (optional)</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          )}
          
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="region">Region</label>
              <input
                type="text"
                id="region"
                onChange={(e) => setRegion(e.target.value)}
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourRegistration;


