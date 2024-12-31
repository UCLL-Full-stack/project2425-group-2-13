import React, { useState } from 'react';
import Link from 'next/link';
import Guide_Service from "../../Services/Guide_Service"
import { useRouter } from 'next/router';




const Login = () => {
  const [isTourGuide, setIsTourGuide] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

 

  const login = async (loginInfo: { email: string; password: string }) => {
    const result = await Guide_Service.Get_Guide(email, password);
    console.log(result);
    
    if (result !== null) {
      setSuccessMessage('Login Success');
      sessionStorage.setItem("Name",result.fname )
      router.push('/')
      const current = result
      sessionStorage.setItem("guide_email", email)
      setIsLoggedIn(true)


      
    } else {
      setErrorMessage('Invalid Email or Password');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check for empty fields
    if (!email || !password) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    // Call the login function with the email and password
    const loginInfo = { email, password };
    login(loginInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

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
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link href="/Sign-Up" className="text-blue-600 hover:underline">
              Click here to make one
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
