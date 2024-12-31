import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-sm font-bold">
          © {new Date().getFullYear()} Swiss Hiking Tours. All rights reserved.
        </div>
        <nav className="space-x-5 text-sm">
          <Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-300">Terms of Service</Link>
          <Link href="/contact" className="hover:text-blue-300">Contact Us</Link>
          <Link href="../adminlogin" className="hover:text-blue-300">Admin</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
