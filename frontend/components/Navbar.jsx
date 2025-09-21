import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = ({ userRole = null }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        Sealix
      </div>
      
      {userRole && (
        <ul className="flex space-x-8 list-none">
          {userRole === 'issuer' && (
            <>
              <li><Link href="/dashboard/issuer" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/issuer" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">Issue Documents</Link></li>
            </>
          )}
          
          {userRole === 'user' && (
            <>
              <li><Link href="/dashboard/user" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">My Documents</Link></li>
              <li><Link href="/dashboard/user" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">Profile</Link></li>
            </>
          )}
          
          {userRole === 'verifier' && (
            <>
              <li><Link href="/dashboard/verifier" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">Verify Documents</Link></li>
              <li><Link href="/dashboard/verifier" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">History</Link></li>
            </>
          )}
          
          <li>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;