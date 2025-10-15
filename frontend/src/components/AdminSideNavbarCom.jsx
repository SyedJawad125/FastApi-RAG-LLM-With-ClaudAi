import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const isActive = (pathname) => router.pathname === pathname;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    router.push('/Login');
  };

  const handleChangepassword = () => {
    router.push("/changepassword");
  };

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col justify-between fixed top-0 left-0 shadow-xl">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Admin Panel
            </h2>
          </div>
          
          <nav className="space-y-2">
            {userRole !== '10' && (
              <>
                <Link href="/admindashboard">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admindashboard') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </div>
                </Link>
                <Link href="/employeepage">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/employeepage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Employees
                  </div>
                </Link>
                <Link href="/products">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Products
                  </div>
                </Link>
                <Link href="/salesproductpage">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/salesproductpage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Sales
                  </div>
                </Link>
                <Link href="/categories">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Categories
                  </div>
                </Link>
                <Link href="/orderspage">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Orders
                  </div>
                </Link>
                <Link href="/Reviews">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/reviews') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Reviews
                  </div>
                </Link>
              </>
            )}
            {/* <Link href="/clientselfpage">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/clientselfpage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </div>
            </Link> */}
            <Link href="/imagespage">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/imagespage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Images
              </div>
            </Link>
            <Link href="/contact">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/contact') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contacts
              </div>
            </Link>
            <Link href="/">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all duration-150 ${isActive('/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Public Site
              </div>
            </Link>
          </nav>
        </div>
        
        <div className="space-y-3">
          {isAuthenticated ? (
            <button 
              onClick={logout} 
              className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 shadow-md transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          ) : (
            <Link href="/Login">
              <div className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:from-green-500 hover:to-green-400 shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </div>
            </Link>
          )}
          
          <button 
            onClick={handleChangepassword} 
            className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
