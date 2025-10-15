'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const TopNavbarCom = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Checking authentication status on the client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        setIsLoggingOut(true);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <div className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-opacity-90 backdrop-blur-sm py-0 shadow-xl' : 'bg-opacity-100 py-1'} bg-gradient-to-r from-gray-900 to-black text-white`}>
            <div className="container mx-auto px-6 flex justify-between items-center h-8">
                {/* Left side - Contact info */}
                <div className="flex items-center space-x-3">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                        <div className="relative flex items-center space-x-2 px-4 py-1 rounded-full bg-gray-900 group-hover:bg-gray-800 transition duration-200">
                            <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-amber-400" />
                            <span className="text-xs font-light tracking-wider">(+92) 333 1906382</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Auth buttons */}
                <div className="flex items-center space-x-6">
                    {isAuthenticated ? (
                        <button 
                            onClick={logout} 
                            disabled={isLoggingOut} 
                            className={`relative flex items-center space-x-2 group ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                            <span className="text-xs font-light tracking-wider">LOGOUT</span>
                        </button>
                    ) : (
                        <Link href="/Login" className="relative group">
                            <div className="flex items-center space-x-2">
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                <FontAwesomeIcon icon={faSignInAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                                <span className="text-xs font-light tracking-wider">LOGIN</span>
                            </div>
                        </Link>
                    )}
                    
                    <div className="h-4 w-px bg-gray-600"></div>
                    
                    <Link href="/signup" className="relative group">
                        <div className="flex items-center space-x-2">
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            <FontAwesomeIcon icon={faUserPlus} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                            <span className="text-xs font-light tracking-wider">SIGN UP</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopNavbarCom;


// 'use client';
// import Link from 'next/link';
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'next/navigation';

// const TopNavbarCom = () => {
//     const router = useRouter();
    
//     const [isLoggingOut, setIsLoggingOut] = React.useState(false);

//     const logout = () => {
//         setIsLoggingOut(true);
//         localStorage.removeItem('token');
//         router.push('/');
//     };

//     return (
//         <div className="bg-black text-white p-3">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                     <FontAwesomeIcon icon={faPhone} className="h-3 w-3" />
//                     <span>(+92) 333 1906382</span>
//                 </div>
//                 <div className="flex items-center space-x-4 mr-20">
//                     {typeof window !== 'undefined' && localStorage.getItem('token') ? (
//                         <button 
//                             onClick={logout} 
//                             disabled={isLoggingOut} 
//                             className={`flex items-center space-x-2 text-white hover:text-gray-300 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             <FontAwesomeIcon icon={faSignOutAlt} />
//                             <span>Logout</span>
//                         </button>
//                     ) : (
//                         <Link href="/Login">
//                             <div className="flex items-center space-x-2">
//                                 <FontAwesomeIcon icon={faSignInAlt} />
//                                 <span>Login</span>
//                             </div>
//                         </Link>
//                     )}
//                     <Link href="/signup">
//                         <div className="flex items-center space-x-2">
//                             <FontAwesomeIcon icon={faUserPlus} />
//                             <span>SignUp</span>
//                         </div>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopNavbarCom;
