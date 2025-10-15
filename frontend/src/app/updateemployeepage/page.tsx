// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import Image from 'next/image';

// interface Employee {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   date_of_birth: string;
//   hire_date: string;
//   position: string;
//   department: string;
//   salary: number;
//   image?: string;
// }

// const UpdateEmployee = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const employeeId = searchParams.get('empid');
  
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
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch employee data based on employeeId
//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       if (employeeId) {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/employee?id=${employeeId}`);
//           const employeeData = res?.data?.data?.data[0];
//           if (employeeData) {
//             setFormData({
//               first_name: employeeData.first_name,
//               last_name: employeeData.last_name,
//               email: employeeData.email,
//               phone_number: employeeData.phone_number,
//               date_of_birth: employeeData.date_of_birth,
//               hire_date: employeeData.hire_date,
//               position: employeeData.position,
//               department: employeeData.department,
//               salary: employeeData.salary.toString()
//             });

//             if (employeeData.image) {
//               const baseUrl = 'http://127.0.0.1:8000/';
//               setImagePreview(`${baseUrl}${employeeData.image}`);
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching employee data:', error);
//         }
//       }
//     };

//     fetchEmployeeData();
//   }, [employeeId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;

//     if (file && !file.type.startsWith("image/")) {
//       alert("Please select a valid image file.");
//       return;
//     }

//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('id', employeeId as string);
//       formDataToSend.append('first_name', formData.first_name);
//       formDataToSend.append('last_name', formData.last_name);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone_number', formData.phone_number);
//       formDataToSend.append('date_of_birth', formData.date_of_birth);
//       formDataToSend.append('hire_date', formData.hire_date);
//       formDataToSend.append('position', formData.position);
//       formDataToSend.append('department', formData.department);
//       formDataToSend.append('salary', formData.salary);

//       if (image) formDataToSend.append('image', image);

//       const response = await AxiosInstance.patch('/ecommerce/employee', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       if (response) {
//         router.push('/employeepage');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Edit Employee</h2>
//             <p className="mt-1 text-indigo-100">Update the details below to edit employee data</p>
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
//                 <div className="mt-1 flex items-center gap-4">
//                   <label className="cursor-pointer">
//                     <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                       <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       {image ? 'Change Photo' : 'Upload Photo'}
//                     </span>
//                     <input
//                       type="file"
//                       id="image"
//                       className="sr-only"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                     />
//                   </label>
//                   {image && (
//                     <span className="text-sm text-gray-600">{image.name}</span>
//                   )}
//                   {imagePreview && (
//                     <div className="w-24 h-24 relative">
//                       <Image 
//                         src={imagePreview}
//                         alt="Employee Preview"
//                         fill
//                         className="object-cover rounded-lg"
//                       />
//                     </div>
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
//                 disabled={isLoading}
//                 className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
//               >
//                 {isLoading ? 'Updating...' : 'Update Employee'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateEmployee;