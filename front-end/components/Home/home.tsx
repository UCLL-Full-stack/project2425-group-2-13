import React, { useEffect, useState } from 'react';
import '../../styles/home.module.css';
import Guide_Service from '@/Services/Guide_Service';
import Tourist_Service from '@/Services/Tourist_Service';
import Tour_Service from '@/Services/Tour_Service';
import Admin_Service from '@/Services/Admin_Service'; // Import Admin Service
import { Guide, Tourist, Tour, Admin } from '../../Types/index'; // Include Admin type

const Home_Content: React.FC = () => {
  const [name, setName] = useState('no name');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]); // Admin state
  const [searchQueryGuides, setSearchQueryGuides] = useState('');
  const [searchQueryTourists, setSearchQueryTourists] = useState('');
  const [searchQueryTours, setSearchQueryTours] = useState('');
  const [searchQueryAdmins, setSearchQueryAdmins] = useState(''); // Admin search state
  const [activeTab, setActiveTab] = useState('Guides');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loginName = sessionStorage.getItem('Name');
      setName(loginName || 'no name');
      const guideEmail = sessionStorage.getItem('Name');
      const loggedIn = !!guideEmail;
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        fetchGuides();
        fetchTourists();
        fetchTours();
        fetchAdmins(); // Fetch Admins
      }
    }
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await Guide_Service.Get_all_Guides();
      if (response.ok) {
        const data = await response.json();
        setGuides(data);
      }
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  };

  const fetchTourists = async () => {
    try {
      const response = await Tourist_Service.Get_all_Tourists();
      if (response.ok) {
        const data = await response.json();
        setTourists(data);
      }
    } catch (error) {
      console.error('Error fetching tourists:', error);
    }
  };

  const fetchTours = async () => {
    try {
      const response = await Tour_Service.Get_all_Tours();
      if (response.ok) {
        const data = await response.json();
        setTours(data);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await Admin_Service.Get_all_Admins(); // Call Admin service
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const filteredGuides = guides.filter((guide) =>
    [String(guide.id), guide.fname, guide.lname, guide.email, guide.region]
      .some((field) => field?.toLowerCase().includes(searchQueryGuides.toLowerCase()))
  );

  const filteredTourists = tourists.filter((tourist) =>
    [String(tourist.id),tourist.fname, tourist.fname, tourist.email, tourist.region]
      .some((field) => field?.toLowerCase().includes(searchQueryTourists.toLowerCase()))
  );

  const filteredTours = tours.filter((tour) =>
    [String(tour.id),tour.name, tour.description, String(tour.duration)]
      .some((field) => field?.toLowerCase().includes(searchQueryTours.toLowerCase()))
  );

  const filteredAdmins = admins.filter((admin) =>
    [String(admin.id), admin.lname, admin.fname, admin.email, admin.password]
      .some((field) => field?.toLowerCase().includes(searchQueryAdmins.toLowerCase()))
  );







  const renderTabContent = () => {
    if (activeTab === 'Guides') {
      return (
        <div className="w-full border border-black shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Guides</h3>
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQueryGuides}
            onChange={(e) => setSearchQueryGuides(e.target.value)}
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Region</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredGuides.map((guide) => (
                <tr key={guide.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{guide.id}</td>
                  <td className="py-3 px-6 text-left">{guide.fname}</td>
                  <td className="py-3 px-6 text-left">{guide.lname}</td>
                  <td className="py-3 px-6 text-left">{guide.email}</td>
                  <td className="py-3 px-6 text-left">{guide.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'Tourists') {
      return (
        <div className="w-full border border-black shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Tourists</h3>
          <input
            type="text"
            placeholder="Search tourists..."
            value={searchQueryTourists}
            onChange={(e) => setSearchQueryTourists(e.target.value)}
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Region</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredTourists.map((tourist) => (
                <tr key={tourist.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{tourist.id}</td>
                  <td className="py-3 px-6 text-left">{tourist.fname}</td>
                  <td className="py-3 px-6 text-left">{tourist.lname}</td>
                  <td className="py-3 px-6 text-left">{tourist.email}</td>
                  <td className="py-3 px-6 text-left">{tourist.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'Tours') {
      return (
        <div className="w-full border border-black shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Tours</h3>
          <input
            type="text"
            placeholder="Search tours..."
            value={searchQueryTours}
            onChange={(e) => setSearchQueryTours(e.target.value)}
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Duration</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{tour.id}</td>
                  <td className="py-3 px-6 text-left">{tour.name}</td>
                  <td className="py-3 px-6 text-left">{tour.description}</td>
                  <td className="py-3 px-6 text-left">{tour.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'Admins') {
      return (
        <div className="w-full border border-black shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Admins</h3>
          <input
            type="text"
            placeholder="Search admins..."
            value={searchQueryAdmins}
            onChange={(e) => setSearchQueryAdmins(e.target.value)}
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal" >
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Password</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{admin.id}</td>
                  <td className="py-3 px-6 text-left">{admin.fname}</td>
                  <td className="py-3 px-6 text-left">{admin.lname}</td>
                  <td className="py-3 px-6 text-left">{admin.email}</td>
                  <td className="py-3 px-6 text-left">{admin.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="text-5xl font-bold mb-6">Hey there, {name}</h1>
      {!isLoggedIn ? (
        <p className="mt-5">
          <a className="font-bold underline-offset-4" href="/login">
            Login
          </a>{' '}
          to see your account
        </p>
      ) : (
        <>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
            <nav className="flex justify-left space-x-4">
              <button
                onClick={() => setActiveTab('Guides')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Guides'
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-gray-100 text-gray-700'
                } hover:bg-blue-400 hover:text-white`}
              >
                Guides
              </button>
              <button
                onClick={() => setActiveTab('Tourists')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Tourists'
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-gray-100 text-gray-700'
                } hover:bg-blue-400 hover:text-white`}
              >
                Tourists
              </button>
              <button
                onClick={() => setActiveTab('Tours')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Tours'
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-gray-100 text-gray-700'
                } hover:bg-blue-400 hover:text-white`}
              >
                Tours
              </button>
              <button
                onClick={() => setActiveTab('Admins')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Admins'
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-gray-100 text-gray-700'
                } hover:bg-blue-400 hover:text-white`}
              >
                Admins
              </button>
            </nav>
          </div>
          {renderTabContent()}
        </>
      )}
    </div>
  );
};

export default Home_Content;
