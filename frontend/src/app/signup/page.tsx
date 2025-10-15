// 'use client'
// import React, { useState, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";



// const SignUp = () => {
//     const router = useRouter();
//     const [first_name, setfirst_name] = useState('');
//     const [last_name, setlast_name] = useState('');
//     const [username, setusername] = useState('');
//     const [email, setemail] = useState('');
//     const [phone, setphone] = useState('');
//     const [password, setpassword] = useState('');
  
//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//       e.preventDefault();

//       const payload = {"first_name":first_name , "last_name":last_name, "username":username , "email":email , 
//         "phone":phone, "password":password}
//         try {
//       const response = await AxiosInstance.post('/user/register', payload );
  
//         if (response) {
//           console.log('Response:', response.data);
//           router.push('/Login');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
  

//   return (
//     <div className="bg-black-100 min-h-screen flex items-center justify-center">
//   <div className="container mx-auto px-4">
//     <div className="flex flex-wrap items-center justify-center ml-10 ">
//     <div className="w-full lg:w-1/3 mb-10 lg:mb-0 mr-20">
//         <h3 className="text-4xl font-extrabold mb-6 text-center lg:text-left">
//           The Online System <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
//             Offer Best Performance
//           </span>
//         </h3>
//         <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center lg:text-left">
//         E-commerce business online refers to the buying and selling of goods and services over the internet.
//          It allows businesses to reach a global audience, operate 24/7, and offer a wide range of products 
//          and services without the limitations of a physical store. Key components include a user-friendly 
//          website, secure payment gateways, efficient logistics, and digital marketing strategies to attract
//           and retain customers.
//         </p>
//     </div>

//     <div className="lg:w-1/2 mb-5 lg:mb-0">
//         <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8" style={{ marginRight: "150px" }}>
//           <form>
//             <div className="flex flex-wrap -mx-3">
//               <div className="w-full md:w-1/2 px-3 mb-4">
//                 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form3Example1">
//                   First name
//                 </label>
//                 <input type="text" id="form3Example1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={first_name}
//                   onChange={e => setfirst_name(e.target.value)} />
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-4">
//                 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form3Example2">
//                   Last name
//                 </label>
//                 <input type="text" id="form3Example2" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={last_name}
//                   onChange={e => setlast_name(e.target.value)} />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form3Example3">
//                 User Name
//               </label>
//               <input type="text" id="form3Example3" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={username}
//                 onChange={e => setusername(e.target.value)} />
//             </div>
//             <div className="mb-4">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form3Example3">
//                 Email address
//               </label>
//               <input type="email" id="form3Example3" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={email}
//                 onChange={e => setemail(e.target.value)} />
//             </div>
//             <div className="mb-4">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form3Example3">
//                 Phone Number
//               </label>
//               <input type="text" id="form3Example3" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={phone}
//                 onChange={e => setphone(e.target.value)} />
//             </div>
//             <div className="mb-4">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="form3Example4">
//                 Password
//               </label>
//               <input type="password" id="form3Example4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={password}
//                 onChange={e => setpassword(e.target.value)} />
//             </div>
//             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               Sign up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//   )
// }

// export default SignUp



'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

const SignUp = () => {
    const router = useRouter();
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const payload = {
        "first_name": first_name,
        "last_name": last_name,
        "username": username,
        "email": email,
        "phone": phone,
        "password": password
      };
      
      try {
        const response = await AxiosInstance.post('/user/register', payload);
        if (response) {
          console.log('Response:', response.data);
          router.push('/Login');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Join Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Growing Community
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Create your account to access exclusive features, personalized content, 
              and seamless shopping experiences across all our platforms.
            </p>
            <div className="hidden lg:block">
              <button 
                onClick={() => router.push('/Login')}
                className="px-8 py-3 rounded-full border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition duration-300"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-800">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Create Account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="first_name">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        value={first_name}
                        onChange={e => setfirst_name(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="last_name">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        value={last_name}
                        onChange={e => setlast_name(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      value={username}
                      onChange={e => setusername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      value={email}
                      onChange={e => setemail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      value={phone}
                      onChange={e => setphone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      value={password}
                      onChange={e => setpassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300"
                  >
                    Sign Up
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <button
                      onClick={() => router.push('/Login')}
                      className="text-blue-400 hover:text-blue-300 font-medium transition duration-300"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;