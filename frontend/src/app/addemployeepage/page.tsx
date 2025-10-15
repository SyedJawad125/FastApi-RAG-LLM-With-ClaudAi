// 'use client'
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";

// interface Employee {
//   id: number;
//   name: string;
// }

// const AddEmployee = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     date_of_birth: '',
//     hire_date: '',
//     position: '',
//     department: '',
//     salary: ''
//   });
//   const [image, setImage] = useState<File | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         formDataToSend.append(key, value);
//       });
//       if (image) formDataToSend.append('image', image);

//       const response = await AxiosInstance.post('/ecommerce/employee', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       if (response) {
//         router.push('/employeepage');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Add New Employee</h2>
//             <p className="mt-1 text-indigo-100">Fill in the details below to add a new team member</p>
//           </div>
          
//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* First Name */}
//               <div>
//                 <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
//                   First Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   name="first_name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="last_name"
//                   name="last_name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone_number"
//                   name="phone_number"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   id="date_of_birth"
//                   name="date_of_birth"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.date_of_birth}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Hire Date */}
//               <div>
//                 <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700 mb-1">
//                   Hire Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   id="hire_date"
//                   name="hire_date"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.hire_date}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Position */}
//               <div>
//                 <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
//                   Position <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="position"
//                   name="position"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.position}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Department */}
//               <div>
//                 <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
//                   Department <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="department"
//                   name="department"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.department}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Salary */}
//               <div>
//                 <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
//                   Salary <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   id="salary"
//                   name="salary"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.salary}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Upload Image */}
//               <div className="md:col-span-2">
//                 <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//                   Employee Photo
//                 </label>
//                 <div className="mt-1 flex items-center">
//                   <label className="cursor-pointer">
//                     <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                       <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       Upload Photo
//                     </span>
//                     <input
//                       type="file"
//                       id="image"
//                       className="sr-only"
//                       onChange={(e) => setImage(e.target.files?.[0] || null)}
//                       accept="image/*"
//                     />
//                   </label>
//                   {image && (
//                     <span className="ml-4 text-sm text-gray-600">{image.name}</span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/employeepage')}
//                 className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//               >
//                 Add Employee
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;






// // 'use client'
// // import React, { useState, useEffect } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
// // import AxiosInstance from "@/components/AxiosInstance";

// // interface Category {
// //   id: number;
// //   name: string;
// //   // Add other fields if necessary
// // }
// // const UpdateEmployee = () => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const employeeId = searchParams.get('id'); // Extract product ID from query params

// //   const [first_name, setfirst_name] = useState('');
// //   const [last_name, setlast_name] = useState('');
// //   const [email, setemail] = useState('');
// //   const [phone_number, setphone_number] = useState('');
// //   const [date_of_birth, setdate_of_birth] = useState('');
// //   const [hire_date, sethire_date] = useState('');
// //   const [position, setposition] = useState('');
// //   const [department, setdepartment] = useState('');
// //   const [salary, setsalary] = useState('');
// //   const [image, setImage] = useState<File | null>(null);
// //   const [employeeRecords, setEmployeeRecords] = useState<Category[]>([]);

// //   // useEffect(() => {

// //     // const fetchProductDetails = async () => {
// //     //   try {
// //     //     if (productId) {
// //     //       const res = await AxiosInstance.get(`/ecommerce/product/${productId}`);
// //     //       console.log('Product details response:', res.data); // Log the response
// //     //       if (res && res.data) {
// //     //         const product = res.data.data;
// //     //         setName(product.name);
// //     //         setDescription(product.description);
// //     //         setPrice(product.price);
// //     //         setProdHasCategory(product.prodHasCategory);
// //     //       }
// //     //     }
// //     //   } catch (error) {
// //     //     console.log('Error fetching product details:', error);
// //     //   }
// //     // };




// //     // Fetch categories for the dropdown list
// //   //   const fetchMenu = async () => {
// //   //     try {
// //   //       const res = await AxiosInstance.get('/ecommerce/category');
// //   //       if (res) {
// //   //         setCategoryRecords(res.data.data.data);
// //   //       }
// //   //     } catch (error) {
// //   //       console.log('Error occurred:', error);
// //   //     }
// //   //   };
// //   //   fetchMenu();
// //   // }, []);

// //   const handleSubmit = async (e: { preventDefault: () => void; }) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       formData.append('first_name', first_name);
// //       formData.append('last_name', last_name);
// //       formData.append('email', email);
// //       formData.append('phone_number', phone_number);
// //       formData.append('date_of_birth', date_of_birth);
// //       formData.append('hire_date', hire_date);
// //       formData.append('position', position);
// //       formData.append('department', department);
// //       formData.append('salary', salary);
// //       if (image) formData.append('image', image);
// //       // formData.append('prod_has_category', prodHasCategory);

// //       const response = await AxiosInstance.patch('/ecommerce/employee/?id=${employeeId}', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       if (response) {
// //         console.log('Response:', response.data);
// //         router.push('/employeepage');
// //       }    // , { state: { message: 'Product Added!' } }
      
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto px-4 ml-20">
// //   <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Update Employee Here:</h2>
// //   <form className="mt-3" onSubmit={handleSubmit}>

// //     {/* First Name and Last Name on the same row */}
// //     <div className="grid grid-cols-2 gap-2 mb-4"> {/* Reduced gap */}
// //         <div>
// //             <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">
// //             First Name
// //             </label>
// //             <input
// //             type="text"
// //             id="first_name"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={first_name}
// //             onChange={(e) => setfirst_name(e.target.value)}
// //             />
// //         </div>
// //         <div>
// //             <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">
// //             Last Name
// //             </label>
// //             <input
// //             type="text"
// //             id="last_name"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={last_name}
// //             onChange={(e) => setlast_name(e.target.value)}
// //             />
// //         </div>
// //     </div>
// //     <div className="grid grid-cols-2 gap-4 mb-4">
// //         {/* Email */}
// //         <div className="mb-4">
// //         <label htmlFor="email" className="block text-sm font-medium text-gray-1000">
// //             Email
// //         </label>
// //         <input
// //             type="text"
// //             id="email"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={email}
// //             onChange={(e) => setemail(e.target.value)}
// //         />
// //         </div>

// //         {/* Phone Number */}
// //         <div className="mb-4">
// //         <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">
// //             Phone Number
// //         </label>
// //         <input
// //             type="text"
// //             id="phone_number"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={phone_number}
// //             onChange={(e) => setphone_number(e.target.value)}
// //         />
// //         </div>
// //     </div>
// //     <div className="grid grid-cols-2 gap-4 mb-4">
// //         {/* Date of Birth */}
// //         <div className="mb-4">
// //         <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">
// //             Date Of Birth
// //         </label>
// //         <input
// //             type="text"
// //             id="date_of_birth"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={date_of_birth}
// //             onChange={(e) => setdate_of_birth(e.target.value)}
// //         />
// //         </div>

// //         {/* Hire Date */}
// //         <div className="mb-4">
// //         <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">
// //             Hire Date
// //         </label>
// //         <input
// //             type="text"
// //             id="hire_date"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={hire_date}
// //             onChange={(e) => sethire_date(e.target.value)}
// //         />
// //         </div>
// //     </div>

// //     <div className="grid grid-cols-2 gap-4 mb-4">
// //         {/* Position */}
// //         <div className="mb-4">
// //         <label htmlFor="position" className="block text-sm font-medium text-gray-1000">
// //             Position
// //         </label>
// //         <input
// //             type="text"
// //             id="position"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={position}
// //             onChange={(e) => setposition(e.target.value)}
// //         />
// //         </div>

// //         {/* Department */}
// //         <div className="mb-4">
// //         <label htmlFor="department" className="block text-sm font-medium text-gray-1000">
// //             Department
// //         </label>
// //         <input
// //             type="text"
// //             id="department"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={department}
// //             onChange={(e) => setdepartment(e.target.value)}
// //         />
// //         </div>
// //     </div>

// //     <div className="grid grid-cols-2 gap-4 mb-4">
// //         {/* Salary */}
// //         <div className="mb-4">
// //         <label htmlFor="salary" className="block text-sm font-medium text-gray-1000">
// //             Salary
// //         </label>
// //         <input
// //             type="text"
// //             id="salary"
// //             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
// //             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
// //             value={salary}
// //             onChange={(e) => setsalary(e.target.value)}
// //         />
// //         </div>

// //         {/* Upload Image */}
// //         <div className="mb-4">
// //         <label htmlFor="image" className="block text-sm font-medium text-gray-1000">
// //             Upload Image
// //         </label>
// //         <input
// //             type="file"
// //             id="image"
// //             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg 
// //             file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 
// //             hover:file:bg-indigo-100"
// //             onChange={(e) => setImage(e.target.files?.[0] || null)}
// //         />
// //         </div>
// //     </div>


// //     <button
// //       type="submit"
// //       className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
// //       text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
// //       focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
// //     >
// //       Submit
// //     </button>
// //   </form>
// // </div>

  
// //   );
// // };

// // export default UpdateEmployee;



// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import AxiosInstance from "@/components/AxiosInstance";
// // import Image from 'next/image';

// // interface Employee {
// //   id: number;
// //   first_name: string;
// //   last_name: string;
// //   email: string;
// //   phone_number: string;
// //   date_of_birth: string;
// //   hire_date: string;
// //   position: string;
// //   department: string;
// //   salary: number;
// //   image?: string;
// // }

// // const UpdateEmployee = () => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const employeeId = searchParams.get('empid');

// //   const [formData, setFormData] = useState({
// //     first_name: '',
// //     last_name: '',
// //     email: '',
// //     phone_number: '',
// //     date_of_birth: '',
// //     hire_date: '',
// //     position: '',
// //     department: '',
// //     salary: ''
// //   });
// //   const [image, setImage] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchEmployeeData = async () => {
// //       if (!employeeId) return;
      
// //       try {
// //         setLoading(true);
// //         const res = await AxiosInstance.get(`/ecommerce/employee?id=${employeeId}`);
// //         const employeeData = res?.data?.data?.data[0];
        
// //         if (employeeData) {
// //           setFormData({
// //             first_name: employeeData.first_name || '',
// //             last_name: employeeData.last_name || '',
// //             email: employeeData.email || '',
// //             phone_number: employeeData.phone_number || '',
// //             date_of_birth: employeeData.date_of_birth || '',
// //             hire_date: employeeData.hire_date || '',
// //             position: employeeData.position || '',
// //             department: employeeData.department || '',
// //             salary: employeeData.salary?.toString() || ''
// //           });

// //           if (employeeData.image) {
// //             const baseUrl = 'http://127.0.0.1:8000/';
// //             setImagePreview(`${baseUrl}${employeeData.image}`);
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching employee data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEmployeeData();
// //   }, [employeeId]);

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0] || null;

// //     if (file && !file.type.startsWith("image/")) {
// //       alert("Please select a valid image file.");
// //       return;
// //     }

// //     setImage(file);

// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     } else {
// //       setImagePreview(null);
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const formDataToSend = new FormData();
// //       formDataToSend.append('id', employeeId as string);
// //       Object.entries(formData).forEach(([key, value]) => {
// //         formDataToSend.append(key, value);
// //       });
// //       if (image) formDataToSend.append('image', image);

// //       const response = await AxiosInstance.patch(`/ecommerce/employee`, formDataToSend, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       if (response) {
// //         router.push('/employeepage');
// //       }
// //     } catch (error) {
// //       console.error('Error updating employee:', error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
// //         <div className="text-center">Loading employee data...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-4xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
// //           {/* Header */}
// //           <div className="bg-indigo-600 px-6 py-4">
// //             <h2 className="text-2xl font-bold text-white">Update Employee Details</h2>
// //             <p className="mt-1 text-indigo-100">Update the details below for this team member</p>
// //           </div>
          
// //           {/* Form */}
// //           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* First Name */}
// //               <div>
// //                 <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
// //                   First Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="first_name"
// //                   name="first_name"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.first_name}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Last Name */}
// //               <div>
// //                 <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Last Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="last_name"
// //                   name="last_name"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.last_name}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Email */}
// //               <div>
// //                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Email <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Phone Number */}
// //               <div>
// //                 <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Phone Number
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   id="phone_number"
// //                   name="phone_number"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.phone_number}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>

// //               {/* Date of Birth */}
// //               <div>
// //                 <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Date of Birth
// //                 </label>
// //                 <input
// //                   type="date"
// //                   id="date_of_birth"
// //                   name="date_of_birth"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.date_of_birth}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>

// //               {/* Hire Date */}
// //               <div>
// //                 <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Hire Date <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="date"
// //                   id="hire_date"
// //                   name="hire_date"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.hire_date}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Position */}
// //               <div>
// //                 <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Position <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="position"
// //                   name="position"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.position}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Department */}
// //               <div>
// //                 <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Department <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="department"
// //                   name="department"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.department}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Salary */}
// //               <div>
// //                 <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Salary <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="number"
// //                   id="salary"
// //                   name="salary"
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                   value={formData.salary}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>

// //               {/* Upload Image */}
// //               <div className="md:col-span-2">
// //                 <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Employee Photo
// //                 </label>
// //                 <div className="mt-1 flex items-center">
// //                   <label className="cursor-pointer">
// //                     <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
// //                       <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                       </svg>
// //                       {image ? 'Change Photo' : 'Upload Photo'}
// //                     </span>
// //                     <input
// //                       type="file"
// //                       id="image"
// //                       className="sr-only"
// //                       onChange={handleImageChange}
// //                       accept="image/*"
// //                     />
// //                   </label>
// //                   {image && (
// //                     <span className="ml-4 text-sm text-gray-600">{image.name}</span>
// //                   )}
// //                 </div>
// //                 {imagePreview && (
// //                   <div className="mt-4">
// //                     <Image 
// //                       src={imagePreview}
// //                       alt="Employee Preview" 
// //                       width={120}
// //                       height={120}
// //                       className="h-30 w-30 object-cover rounded-lg"
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <div className="flex justify-end pt-4">
// //               <button
// //                 type="button"
// //                 onClick={() => router.push('/employeepage')}
// //                 className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
// //               >
// //                 Update Employee
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateEmployee;