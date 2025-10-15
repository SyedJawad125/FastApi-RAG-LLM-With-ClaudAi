// 'use client';
// import React, { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { AuthContext } from "@/components/AuthContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Call the login function from AuthContext
//       await login(formData);
//       // Navigation is handled in AuthContext based on user role
//       // Admin users will be redirected to /admindashboard
//     } catch (error) {
//       toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.');
//       setIsLoading(false);
//     }
//   };

//   const handleForgetPassword = () => {
//     router.push("/forgetpassword");
//   };

//   const handleSignup = () => {
//     router.push("/signup");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
//       <ToastContainer />
//       <div className="w-full max-w-md">
//         <div className="bg-white shadow-xl rounded-xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
//             <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//             <p className="text-blue-100 mt-2">Sign in to access your account</p>
//           </div>
          
//           {/* Form Section */}
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
//                     required
//                   />
//                 </div>
//               </div>
              
//               {/* Password Field */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <FontAwesomeIcon 
//                       icon={showPassword ? faEyeSlash : faEye} 
//                       className="h-5 w-5 text-gray-500 hover:text-gray-700" 
//                     />
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password Link */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={handleForgetPassword}
//                   className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`
//                   w-full py-3 px-4 
//                   bg-blue-600 
//                   text-white 
//                   rounded-lg 
//                   font-medium
//                   transition-colors
//                   ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}
//                 `}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>

//               {/* Divider */}
//               <div className="relative my-6">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               {/* Social Login */}
//               <button
//                 type="button"
//                 className="w-full py-3 px-4 flex items-center justify-center space-x-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 text-red-500" />
//                 <span>Sign in with Google</span>
//               </button>

//               {/* Sign Up Link */}
//               <div className="text-center mt-6">
//                 <p className="text-sm text-gray-600">
//                   Don't have an account?{' '}
//                   <button
//                     type="button"
//                     onClick={handleSignup}
//                     className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                   >
//                     Sign up
//                   </button>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from "@/components/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const { success } = await login(formData);
    setIsLoading(false);
    
    if (!success) {
      // The error toast is already shown by the login function
      return;
    }
    
    // Success case is handled in AuthContext
  };

  const handleForgetPassword = () => {
    router.push("/forgetpassword");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-2">Sign in to access your account</p>
          </div>
          
          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
                    required
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon 
                      icon={showPassword ? faEyeSlash : faEye} 
                      className="h-5 w-5 text-gray-500 hover:text-gray-700" 
                    />
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-3 px-4 
                  bg-blue-600 
                  text-white 
                  rounded-lg 
                  font-medium
                  transition-colors
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <button
                type="button"
                className="w-full py-3 px-4 flex items-center justify-center space-x-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 text-red-500" />
                <span>Sign in with Google</span>
              </button>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSignup}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;