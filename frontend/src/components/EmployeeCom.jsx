// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const EmployeeCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/employee', {
//           params: {
//             limit: recordsPerPage,
//             offset: (currentPage - 1) * recordsPerPage,
//           },
//         });

//         if (res && res.data && res.data.data.data) {
//           setRecords(res.data.data.data);
//           setTotalPages(Math.ceil(res.data.count / recordsPerPage));
//           setData(res.data);
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [currentPage]);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
//       if (res) {
//         toast.success('Employee deleted successfully!');
//         setCurrentPage(1);
//       }
//     } catch (error) {
//       toast.error('Error deleting employee!');
//     }
//   };

//   // const updateRecord = (empid) => {
//   //   router.push(`/updateemployeepage?empid=${empid}`);
//   // };
//   const updateRecord = (empid) => {
//     router.push(`/updateemployeepage?empid=${empid}`);
//   };

//   const DetailRecord = (employeeId) => {
//     router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setCurrentPage(1);
//   };

//   const filteredRecords = Array.isArray(records) ? records.filter((record) => {
//     const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
//     const idMatch = record.id?.toString() === searchTerm;
//     const nameMatch = fullName.includes(searchTerm);
//     return idMatch || nameMatch;
//   }) : [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Employee Records</h1>
//             <p className="text-gray-300">Manage your organization's workforce</p>
//           </div>
          
//           {permissions.create_employee && (
//             <button
//               onClick={() => router.push('/addemployeepage')}
//               className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//               </svg>
//               Add Employee
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <div className="bg-indigo-600 p-3 rounded-lg mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Total Employees</p>
//                 <p className="text-white text-2xl font-bold">{data?.data?.count || 0}</p>
//               </div>
//             </div>

//             <div className="w-full md:w-1/3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by ID or Name"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   className="block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Employee Table */}
//         <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
//           {/* Table Header */}
//           <div className="grid grid-cols-12 bg-gray-900 p-4 text-gray-300 font-semibold uppercase text-sm tracking-wider">
//             <div className="col-span-1">S.No</div>
//             <div className="col-span-2">ID</div>
//             <div className="col-span-3">Name</div>
//             <div className="col-span-2">Position</div>
//             <div className="col-span-2">Department</div>
//             <div className="col-span-2 text-right">Actions</div>
//           </div>

//           {/* Table Body */}
//           {filteredRecords.length > 0 ? (
//             <ul className="divide-y divide-gray-700">
//               {filteredRecords.map((item, index) => (
//                 <li key={item.id} className="hover:bg-gray-750 transition-colors duration-200">
//                   <div className="grid grid-cols-12 items-center p-4">
//                     <div className="col-span-1 text-gray-300">{(currentPage - 1) * recordsPerPage + index + 1}</div>
//                     <div className="col-span-2 text-white font-medium">{item.id}</div>
//                     <div className="col-span-3 text-white">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                           {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-medium">{item.first_name} {item.last_name}</p>
//                           <p className="text-gray-400 text-sm">{item.email}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-gray-300">{item.position}</div>
//                     <div className="col-span-2">
//                       <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
//                         {item.department}
//                       </span>
//                     </div>
//                     <div className="col-span-2 flex justify-end space-x-2">
//                       <button
//                         onClick={() => DetailRecord(item.id)}
//                         className="p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors"
//                         title="View Details"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
                      
//                       {permissions.update_employee && (
//                         <button
//                           onClick={() => updateRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-green-400 hover:bg-gray-600 hover:text-green-300 transition-colors"
//                           title="Edit"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                       )}
                      
//                       {permissions.delete_employee && (
//                         <button
//                           onClick={() => deleteRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors"
//                           title="Delete"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-8 text-center text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-xl">No employees found</p>
//               <p className="mt-1">Try adjusting your search or add a new employee</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredRecords.length > 0 && (
//             <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-400">
//                     Showing <span className="font-medium">{(currentPage - 1) * recordsPerPage + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(currentPage * recordsPerPage, data?.data?.count || 0)}</span> of{' '}
//                     <span className="font-medium">{data?.data?.count || 0}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                       disabled={currentPage === 1}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
//                     >
//                       <span className="sr-only">Previous</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                       <button
//                         key={index + 1}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === index + 1
//                             ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
//                             : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
//                         }`}
//                       >
//                         {index + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                       disabled={currentPage === totalPages}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
//                     >
//                       <span className="sr-only">Next</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCom;



// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const EmployeeCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [paginationData, setPaginationData] = useState({
//     count: 0,
//     total_pages: 1,
//     current_page: 1,
//     limit: 10,
//     offset: 0,
//     next: false,
//     previous: false
//   });

//   const fetchEmployees = async (page = 1, limit = 10, offset = 0) => {
//     setLoading(true);
//     try {
//       const res = await AxiosInstance.get('/ecommerce/employee', {
//         params: {
//           page,
//           limit,
//           offset,
//         },
//       });

//       if (res && res.data && res.data.data) {
//         setRecords(res.data.data.data);
//         setPaginationData({
//           count: res.data.data.count,
//           total_pages: res.data.data.total_pages,
//           current_page: res.data.data.current_page,
//           limit: res.data.data.limit,
//           offset: res.data.data.offset,
//           next: res.data.data.next,
//           previous: res.data.data.previous,
//         });
//       } else {
//         console.error('Unexpected response structure:', res);
//       }
//     } catch (error) {
//       console.error('Error occurred:', error);
//       toast.error('Failed to load employees');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
//       if (res) {
//         toast.success('Employee deleted successfully!');
//         fetchEmployees(paginationData.current_page, paginationData.limit, paginationData.offset);
//       }
//     } catch (error) {
//       toast.error('Error deleting employee!');
//     }
//   };

//   const updateRecord = (empid) => {
//     router.push(`/updateemployeepage?empid=${empid}`);
//   };

//   const DetailRecord = (employeeId) => {
//     router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= paginationData.total_pages) {
//       fetchEmployees(newPage, paginationData.limit, (newPage - 1) * paginationData.limit);
//     }
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     fetchEmployees(1, newLimit, 0);
//   };

//   const filteredRecords = Array.isArray(records) ? records.filter((record) => {
//     const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
//     const idMatch = record.id?.toString() === searchTerm;
//     const nameMatch = fullName.includes(searchTerm);
//     return idMatch || nameMatch;
//   }) : [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Employee Records</h1>
//             <p className="text-gray-300">Manage your organization's workforce</p>
//           </div>
          
//           {permissions.create_employee && (
//             <button
//               onClick={() => router.push('/addemployeepage')}
//               className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//               </svg>
//               Add Employee
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <div className="bg-indigo-600 p-3 rounded-lg mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Total Employees</p>
//                 <p className="text-white text-2xl font-bold">{paginationData.count || 0}</p>
//               </div>
//             </div>

//             <div className="w-full md:w-1/3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by ID or Name"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   className="block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Employee Table */}
//         <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
//           {/* Table Header */}
//           <div className="grid grid-cols-12 bg-gray-900 p-4 text-gray-300 font-semibold uppercase text-sm tracking-wider">
//             <div className="col-span-1">S.No</div>
//             <div className="col-span-2">ID</div>
//             <div className="col-span-3">Name</div>
//             <div className="col-span-2">Position</div>
//             <div className="col-span-2">Department</div>
//             <div className="col-span-2 text-right">Actions</div>
//           </div>

//           {/* Table Body */}
//           {loading ? (
//             <div className="p-8 text-center text-gray-400">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
//               <p className="text-xl">Loading employees...</p>
//             </div>
//           ) : filteredRecords.length > 0 ? (
//             <ul className="divide-y divide-gray-700">
//               {filteredRecords.map((item, index) => (
//                 <li key={item.id} className="hover:bg-gray-750 transition-colors duration-200">
//                   <div className="grid grid-cols-12 items-center p-4">
//                     <div className="col-span-1 text-gray-300">{(paginationData.current_page - 1) * paginationData.limit + index + 1}</div>
//                     <div className="col-span-2 text-white font-medium">{item.id}</div>
//                     <div className="col-span-3 text-white">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                           {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-medium">{item.first_name} {item.last_name}</p>
//                           <p className="text-gray-400 text-sm">{item.email}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-gray-300">{item.position}</div>
//                     <div className="col-span-2">
//                       <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
//                         {item.department}
//                       </span>
//                     </div>
//                     <div className="col-span-2 flex justify-end space-x-2">
//                       <button
//                         onClick={() => DetailRecord(item.id)}
//                         className="p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors"
//                         title="View Details"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
                      
//                       {permissions.update_employee && (
//                         <button
//                           onClick={() => updateRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-green-400 hover:bg-gray-600 hover:text-green-300 transition-colors"
//                           title="Edit"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                       )}
                      
//                       {permissions.delete_employee && (
//                         <button
//                           onClick={() => deleteRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors"
//                           title="Delete"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-8 text-center text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-xl">No employees found</p>
//               <p className="mt-1">Try adjusting your search or add a new employee</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredRecords.length > 0 && (
//             <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => handlePageChange(paginationData.current_page - 1)}
//                   disabled={!paginationData.previous}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => handlePageChange(paginationData.current_page + 1)}
//                   disabled={!paginationData.next}
//                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div className="flex items-center gap-4">
//                   <p className="text-sm text-gray-400">
//                     Showing <span className="font-medium">{(paginationData.current_page - 1) * paginationData.limit + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(paginationData.current_page * paginationData.limit, paginationData.count)}</span> of{' '}
//                     <span className="font-medium">{paginationData.count}</span> results
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-gray-400">Items per page:</span>
//                     <select 
//                       value={paginationData.limit}
//                       onChange={handleLimitChange}
//                       className="border rounded p-1 bg-gray-700 text-white text-sm"
//                     >
//                       <option value="5">5</option>
//                       <option value="10">10</option>
//                       <option value="20">20</option>
//                       <option value="50">50</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <button
//                       onClick={() => handlePageChange(paginationData.current_page - 1)}
//                       disabled={!paginationData.previous}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="sr-only">Previous</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                     {Array.from({ length: Math.min(5, paginationData.total_pages) }, (_, i) => {
//                       let pageNum;
//                       if (paginationData.total_pages <= 5) {
//                         pageNum = i + 1;
//                       } else if (paginationData.current_page <= 3) {
//                         pageNum = i + 1;
//                       } else if (paginationData.current_page >= paginationData.total_pages - 2) {
//                         pageNum = paginationData.total_pages - 4 + i;
//                       } else {
//                         pageNum = paginationData.current_page - 2 + i;
//                       }
                      
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                             paginationData.current_page === pageNum
//                               ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
//                               : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                     {paginationData.total_pages > 5 && paginationData.current_page < paginationData.total_pages - 2 && (
//                       <>
//                         <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400">
//                           ...
//                         </span>
//                         <button
//                           onClick={() => handlePageChange(paginationData.total_pages)}
//                           className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                             paginationData.current_page === paginationData.total_pages
//                               ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
//                               : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
//                           }`}
//                         >
//                           {paginationData.total_pages}
//                         </button>
//                       </>
//                     )}
//                     <button
//                       onClick={() => handlePageChange(paginationData.current_page + 1)}
//                       disabled={!paginationData.next}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="sr-only">Next</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCom;





// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const EmployeeCom = () => {
//   const router = useRouter();
//   const { permissions = {
//     create_employee: false,
//     read_employee: false,
//     update_employee: false,
//     delete_employee: false
//   } } = useContext(AuthContext);
  
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [paginationData, setPaginationData] = useState({
//     count: 0,
//     total_pages: 1,
//     current_page: 1,
//     limit: 10,
//     offset: 0,
//     next: false,
//     previous: false
//   });

//   const fetchEmployees = async (page = 1, limit = 10, offset = 0) => {
//     if (!permissions.read_employee) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await AxiosInstance.get('/ecommerce/employee', {
//         params: {
//           page,
//           limit,
//           offset,
//         },
//       });

//       if (res && res.data && res.data.data) {
//         setRecords(res.data.data.data);
//         setPaginationData({
//           count: res.data.data.count,
//           total_pages: res.data.data.total_pages,
//           current_page: res.data.data.current_page,
//           limit: res.data.data.limit,
//           offset: res.data.data.offset,
//           next: res.data.data.next,
//           previous: res.data.data.previous,
//         });
//       } else {
//         console.error('Unexpected response structure:', res);
//       }
//     } catch (error) {
//       console.error('Error occurred:', error);
//       if (error.response?.status === 403) {
//         toast.error('You do not have permission to view employees');
//       } else {
//         toast.error('Failed to load employees');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [permissions.read_employee]);

//   const deleteRecord = async (id) => {
//     if (!permissions.delete_employee) {
//       toast.error('You do not have permission to delete employees');
//       return;
//     }

//     if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
//       if (res) {
//         toast.success('Employee deleted successfully!');
//         fetchEmployees(paginationData.current_page, paginationData.limit, paginationData.offset);
//       }
//     } catch (error) {
//       toast.error('Error deleting employee!');
//     }
//   };

//   const updateRecord = (empid) => {
//     if (!permissions.update_employee) {
//       toast.error('You do not have permission to update employees');
//       return;
//     }
//     router.push(`/updateemployeepage?empid=${empid}`);
//   };

//   const DetailRecord = (employeeId) => {
//     if (!permissions.read_employee) {
//       toast.error('You do not have permission to view employee details');
//       return;
//     }
//     router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= paginationData.total_pages) {
//       fetchEmployees(newPage, paginationData.limit, (newPage - 1) * paginationData.limit);
//     }
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     fetchEmployees(1, newLimit, 0);
//   };

//   const filteredRecords = Array.isArray(records) ? records.filter((record) => {
//     const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
//     const idMatch = record.id?.toString() === searchTerm;
//     const nameMatch = fullName.includes(searchTerm);
//     return idMatch || nameMatch;
//   }) : [];

//   if (!permissions.read_employee) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
//         <div className="text-center p-8 max-w-md">
//           <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
//           <p className="text-gray-300 mb-6">
//             You don't have permission to view employees. Please contact your administrator.
//           </p>
//           <button 
//             onClick={() => router.push('/')}
//             className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//         <ToastContainer position="top-right" autoClose={2000} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Employee Records</h1>
//             <p className="text-gray-300">Manage your organization's workforce</p>
//           </div>
          
//           {permissions.create_employee && (
//             <button
//               onClick={() => router.push('/addemployeepage')}
//               className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//               </svg>
//               Add Employee
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <div className="bg-indigo-600 p-3 rounded-lg mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Total Employees</p>
//                 <p className="text-white text-2xl font-bold">{paginationData.count || 0}</p>
//               </div>
//             </div>

//             <div className="w-full md:w-1/3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by ID or Name"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   className="block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Employee Table */}
//         <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
//           {/* Table Header */}
//           <div className="grid grid-cols-12 bg-gray-900 p-4 text-gray-300 font-semibold uppercase text-sm tracking-wider">
//             <div className="col-span-1">S.No</div>
//             <div className="col-span-2">ID</div>
//             <div className="col-span-3">Name</div>
//             <div className="col-span-2">Position</div>
//             <div className="col-span-2">Department</div>
//             <div className="col-span-2 text-right">Actions</div>
//           </div>

//           {/* Table Body */}
//           {loading ? (
//             <div className="p-8 text-center text-gray-400">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
//               <p className="text-xl">Loading employees...</p>
//             </div>
//           ) : filteredRecords.length > 0 ? (
//             <ul className="divide-y divide-gray-700">
//               {filteredRecords.map((item, index) => (
//                 <li key={item.id} className="hover:bg-gray-750 transition-colors duration-200">
//                   <div className="grid grid-cols-12 items-center p-4">
//                     <div className="col-span-1 text-gray-300">{(paginationData.current_page - 1) * paginationData.limit + index + 1}</div>
//                     <div className="col-span-2 text-white font-medium">{item.id}</div>
//                     <div className="col-span-3 text-white">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                           {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-medium">{item.first_name} {item.last_name}</p>
//                           <p className="text-gray-400 text-sm">{item.email}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-gray-300">{item.position}</div>
//                     <div className="col-span-2">
//                       <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
//                         {item.department}
//                       </span>
//                     </div>
//                     <div className="col-span-2 flex justify-end space-x-2">
//                       <button
//                         onClick={() => DetailRecord(item.id)}
//                         className="p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors"
//                         title="View Details"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
                      
//                       {permissions.update_employee && (
//                         <button
//                           onClick={() => updateRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-green-400 hover:bg-gray-600 hover:text-green-300 transition-colors"
//                           title="Edit"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                       )}
                      
//                       {permissions.delete_employee && (
//                         <button
//                           onClick={() => deleteRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors"
//                           title="Delete"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-8 text-center text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-xl">No employees found</p>
//               <p className="mt-1">Try adjusting your search or add a new employee</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredRecords.length > 0 && (
//             <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => handlePageChange(paginationData.current_page - 1)}
//                   disabled={!paginationData.previous}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => handlePageChange(paginationData.current_page + 1)}
//                   disabled={!paginationData.next}
//                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div className="flex items-center gap-4">
//                   <p className="text-sm text-gray-400">
//                     Showing <span className="font-medium">{(paginationData.current_page - 1) * paginationData.limit + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(paginationData.current_page * paginationData.limit, paginationData.count)}</span> of{' '}
//                     <span className="font-medium">{paginationData.count}</span> results
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-gray-400">Items per page:</span>
//                     <select 
//                       value={paginationData.limit}
//                       onChange={handleLimitChange}
//                       className="border rounded p-1 bg-gray-700 text-white text-sm"
//                     >
//                       <option value="5">5</option>
//                       <option value="10">10</option>
//                       <option value="20">20</option>
//                       <option value="50">50</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <button
//                       onClick={() => handlePageChange(paginationData.current_page - 1)}
//                       disabled={!paginationData.previous}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="sr-only">Previous</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                     {Array.from({ length: Math.min(5, paginationData.total_pages) }, (_, i) => {
//                       let pageNum;
//                       if (paginationData.total_pages <= 5) {
//                         pageNum = i + 1;
//                       } else if (paginationData.current_page <= 3) {
//                         pageNum = i + 1;
//                       } else if (paginationData.current_page >= paginationData.total_pages - 2) {
//                         pageNum = paginationData.total_pages - 4 + i;
//                       } else {
//                         pageNum = paginationData.current_page - 2 + i;
//                       }
                      
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                             paginationData.current_page === pageNum
//                               ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
//                               : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                     {paginationData.total_pages > 5 && paginationData.current_page < paginationData.total_pages - 2 && (
//                       <>
//                         <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400">
//                           ...
//                         </span>
//                         <button
//                           onClick={() => handlePageChange(paginationData.total_pages)}
//                           className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                             paginationData.current_page === paginationData.total_pages
//                               ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
//                               : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
//                           }`}
//                         >
//                           {paginationData.total_pages}
//                         </button>
//                       </>
//                     )}
//                     <button
//                       onClick={() => handlePageChange(paginationData.current_page + 1)}
//                       disabled={!paginationData.next}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="sr-only">Next</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCom;







'use client';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const EmployeeCom = () => {
  const router = useRouter();
  const { permissions = {
    create_employee: false,
    read_employee: false,
    update_employee: false,
    delete_employee: false
  } } = useContext(AuthContext);
  
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 12,
    offset: 0,
    totalPages: 1,
    count: 0,
    next: false,
    previous: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch employees with pagination
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!permissions.read_employee) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { currentPage, limit, offset } = pagination;
        const res = await AxiosInstance.get(
          `/ecommerce/employee?page=${currentPage}&limit=${limit}&offset=${offset}`
        );
        
        const responseData = res?.data?.data;
        const dataArr = responseData?.data || [];
        
        setRecords(dataArr);
        setFilteredRecords(dataArr);
        setPagination(prev => ({
          ...prev,
          count: responseData?.count || 0,
          totalPages: responseData?.total_pages || 1,
          next: responseData?.next || false,
          previous: responseData?.previous || false
        }));
      } catch (e) {
        console.error('Error fetching employees:', e);
        if (e.response?.status === 403) {
          toast.error('You do not have permission to view employees');
        } else {
          toast.error('Failed to load employees', { theme: 'dark', autoClose: 2000 });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [refreshKey, pagination.currentPage, pagination.limit, pagination.offset, permissions.read_employee]);

  // Handle pagination change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ 
      ...prev, 
      limit: newLimit,
      currentPage: 1,
      offset: 0
    }));
  };

  // Handle offset change
  const handleOffsetChange = (e) => {
    const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
    setPagination(prev => ({ 
      ...prev, 
      offset: newOffset,
      currentPage: 1
    }));
  };

  const deleteRecord = async (id) => {
    if (!permissions.delete_employee) {
      toast.error('You do not have permission to delete employees');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
      setRefreshKey(k => k + 1);
      toast.success('Employee removed successfully', { theme: 'dark', autoClose: 2000 });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Error deleting employee', { theme: 'dark', autoClose: 2000 });
    }
  };

  const updateRecord = (empid) => {
    if (!permissions.update_employee) {
      toast.error('You do not have permission to update employees');
      return;
    }
    router.push(`/updateemployeepage?empid=${empid}`);
  };

  const DetailRecord = (employeeId) => {
    if (!permissions.read_employee) {
      toast.error('You do not have permission to view employee details');
      return;
    }
    router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = records.filter(r => 
      r.id.toString() === value ||
      `${r.first_name?.toLowerCase() || ''} ${r.last_name?.toLowerCase() || ''}`.includes(value) ||
      r.position?.toLowerCase().includes(value) ||
      r.department?.toLowerCase().includes(value)
    );
    
    setFilteredRecords(filtered);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Return early if no read permission
  if (!permissions.read_employee) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to view employees. Please contact your administrator.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white">EMPLOYEE RECORDS</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-1"></div>
          </div>
          
          {permissions.create_employee && (
            <button 
              onClick={() => router.push('/addemployeepage')}
              className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-transform mt-4 md:mt-0"
            >
              Add Employee
            </button>
          )}
        </div>

        {/* Search and Stats Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-800/50 rounded-xl mb-8 gap-4">
          <div className="text-amber-400">
            Showing {filteredRecords.length} of {pagination.count} items
            {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <div className="relative w-full">
              <span className="absolute left-3 top-3 text-gray-400">
                🔍
              </span>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearch}
                placeholder="Search by name, ID, position or department..."
                className="w-full pl-10 py-3 bg-gray-700 rounded-full text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <select 
                value={pagination.limit}
                onChange={handleLimitChange}
                className="bg-gray-700 text-white rounded-full px-3 py-2 focus:outline-none focus:ring-amber-500"
              >
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
                <option value="36">36 per page</option>
                <option value="48">48 per page</option>
              </select>
              
              <input
                type="number"
                value={pagination.offset}
                onChange={handleOffsetChange}
                min="0"
                max={pagination.count}
                placeholder="Offset"
                className="bg-gray-700 text-white rounded-full px-3 py-2 w-20 focus:outline-none focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-900 p-4 text-gray-300 font-semibold uppercase text-sm tracking-wider">
            <div className="col-span-1">S.No</div>
            <div className="col-span-2">ID</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Position</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-xl">Loading employees...</p>
            </div>
          ) : filteredRecords.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {filteredRecords.map((item, index) => (
                <li key={item.id} className="hover:bg-gray-750 transition-colors duration-200">
                  <div className="grid grid-cols-12 items-center p-4">
                    <div className="col-span-1 text-gray-300">{(pagination.currentPage - 1) * pagination.limit + index + 1}</div>
                    <div className="col-span-2 text-white font-medium">{item.id}</div>
                    <div className="col-span-3 text-white">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{item.first_name} {item.last_name}</p>
                          <p className="text-gray-400 text-sm">{item.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-gray-300">{item.position}</div>
                    <div className="col-span-2">
                      <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                        {item.department}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={() => DetailRecord(item.id)}
                        className="p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors"
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {permissions.update_employee && (
                        <button
                          onClick={() => updateRecord(item.id)}
                          className="p-2 rounded-full bg-gray-700 text-green-400 hover:bg-gray-600 hover:text-green-300 transition-colors"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      
                      {permissions.delete_employee && (
                        <button
                          onClick={() => deleteRecord(item.id)}
                          className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl">No employees found</p>
              <p className="mt-1">Try adjusting your search or add a new employee</p>
            </div>
          )}

          {/* Enhanced Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-gray-900 gap-4">
              <div className="text-gray-400 text-sm">
                Page {pagination.currentPage} of {pagination.totalPages} • {pagination.count} total items
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  aria-label="First page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.previous}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-full text-sm transition-colors ${
                          pagination.currentPage === pageNum
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                        aria-label={`Page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.next}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  aria-label="Last page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCom;