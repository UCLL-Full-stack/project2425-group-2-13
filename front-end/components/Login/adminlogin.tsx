import React, { useState } from 'react';
import Link from 'next/link';
//import Admin_Service from "../../Services/Admin_Service"; // Replace with your Admin service
import { useRouter } from 'next/router';
import Admin_Service from '@/Services/Admin_Service';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const login = async (loginInfo: { email: string; password: string }) => {
    try {
      const result = await Admin_Service.Get_Admin(email, password); // Replace with your Admin service function
      if (result) {
        setSuccessMessage('Login Successful');
        sessionStorage.setItem("admin_email", email);
        sessionStorage.setItem("Name", result.fname); // Assuming admin data includes a `name`
        router.push('/'); // Redirect to the admin dashboard
      } else {
        setErrorMessage('Invalid Email or Password');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    const loginInfo = { email, password };
    login(loginInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
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
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-blue-600 hover:underline focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Login as Admin
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Not an admin?{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              Go back to the home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
