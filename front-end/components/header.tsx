import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../styles/home.module.css';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const stored_Guide_Email = sessionStorage.getItem("guide_email");
    const stored_Admin_Email = sessionStorage.getItem("admin_email");
    const stored_Tourist_Email = sessionStorage.getItem("tourist_email");
    if (stored_Guide_Email) {setIsLoggedIn(true);}
    if (stored_Admin_Email) {setIsLoggedIn(true);}
    if (stored_Tourist_Email) {setIsLoggedIn(true);}
    
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      sessionStorage.removeItem("guide_email");
      sessionStorage.removeItem("admin_email");
      sessionStorage.removeItem("tourist_email");
      sessionStorage.removeItem("Name");
      window.location.reload();
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
        <div className="text-lg font-bold">
          <Link href="/">Swiss Hiking Tours</Link>
        </div>
        <nav className="space-x-5">
          <Link href="/" className="hover:text-blue-300">Home</Link>
          <Link href="/about" className="hover:text-blue-300">About</Link>
          {/* Conditionally render*/}

          {!isLoggedIn && (
            <a href="/Sign-Up" className="hover:text-blue-300">Sign Up</a>
          )}
          <button 
            onClick={handleLoginLogout} 
            className="bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;