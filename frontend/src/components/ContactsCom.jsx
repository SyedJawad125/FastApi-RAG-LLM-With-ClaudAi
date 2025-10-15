// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const ContactsCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshKey, setRefreshKey] = useState(false);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     limit: 10,
//     offset: 0,
//     totalPages: 1,
//     count: 0,
//     hasNext: false,
//     hasPrevious: false
//   });

//  const fetchContacts = async () => {
//   try {
//     setIsLoading(true);
//     const { currentPage, limit, offset } = pagination;
    
//     // Construct query parameters
//     const params = new URLSearchParams();
//     params.append('page', currentPage);
//     params.append('limit', limit);
//     if (offset > 0) params.append('offset', offset);

//     const res = await AxiosInstance.get(`/contact`, {
//       params: params
//     });
    
//     if (!res.data) {
//       throw new Error('No data received from server');
//     }

//     const responseData = res.data;
    
//     if (responseData?.status === 'SUCCESS') {
//       setContacts(responseData.data || []);
//       setFilteredContacts(responseData.data || []);
//       setPagination(prev => ({
//         ...prev,
//         count: responseData?.meta?.total || 0,
//         totalPages: responseData?.meta?.pages || 1,
//         hasNext: responseData?.meta?.has_next || false,
//         hasPrevious: responseData?.meta?.has_previous || false
//       }));
//     } else {
//       toast.error(responseData?.message || 'Failed to load contacts', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     let errorMessage = 'Failed to load contacts';
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       errorMessage = error.response.data?.message || 
//                     `Server error: ${error.response.status}`;
//     } else if (error.request) {
//       // The request was made but no response was received
//       errorMessage = 'No response from server';
//     }
    
//     toast.error(errorMessage, {
//       position: "top-center",
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };
//     fetchContacts();

    

//   const deleteContact = async (id) => {
//     try {
//       await AxiosInstance.delete(`/contact?id=${id}`);
//       setRefreshKey(prev => !prev);
//       toast.success('Contact deleted successfully', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } catch (error) {
//       toast.error('Error deleting contact', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = contacts.filter((contact) => {
//       const idMatch = contact.id.toString() === value;
//       const nameMatch = contact.name?.toLowerCase().includes(value);
//       const emailMatch = contact.email?.toLowerCase().includes(value);
//       const phoneMatch = contact.phone?.toLowerCase().includes(value);
//       const subjectMatch = contact.subject?.toLowerCase().includes(value);
//       const messageMatch = contact.message?.toLowerCase().includes(value);
      
//       return idMatch || nameMatch || emailMatch || phoneMatch || subjectMatch || messageMatch;
//     });

//     setFilteredContacts(filtered);
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination(prev => ({ ...prev, currentPage: newPage }));
//     }
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     setPagination(prev => ({ 
//       ...prev, 
//       limit: newLimit,
//       currentPage: 1,
//       offset: 0
//     }));
//   };

//   const handleOffsetChange = (e) => {
//     const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
//     setPagination(prev => ({ 
//       ...prev, 
//       offset: newOffset,
//       currentPage: 1
//     }));
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const updateRecord = async (contactId) => {
//     router.push(`/updatecontactpage?contactId=${contactId}`);
//   };

//   const getStatusBadge = (status) => {
//     const statusMap = {
//       'pending': { color: 'bg-yellow-500/20 text-yellow-400', label: 'Pending' },
//       'responded': { color: 'bg-green-500/20 text-green-400', label: 'Responded' },
//       'spam': { color: 'bg-red-500/20 text-red-400', label: 'Spam' }
//     };
    
//     const statusInfo = statusMap[status] || { color: 'bg-gray-500/20 text-gray-400', label: status };
    
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
//         {statusInfo.label}
//       </span>
//     );
//   };

//   if (!permissions.read_contact) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
//         <div className="text-center p-8 max-w-md">
//           <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
//           <p className="text-gray-300 mb-6">
//             You don't have permission to view Contacts. Please contact your administrator.
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
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer 
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar
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
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white mb-2">Contact Messages</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
//             <p className="text-gray-400 text-sm">Customer inquiries and messages</p>
//           </div>
//         </div>
        
//         {/* Stats and Search */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl gap-4">
//           <div className="text-amber-400 font-light">
//             Showing {filteredContacts.length} of {pagination.count} contacts
//             {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
//           </div>
          
//           <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name, email, phone or subject..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
//               />
//             </div>
            
//             <div className="flex gap-2 items-center">
//               <select 
//                 value={pagination.limit}
//                 onChange={handleLimitChange}
//                 className="bg-gray-700 text-white rounded-full px-3 py-2 border border-gray-600 focus:outline-none focus:ring-amber-500"
//               >
//                 <option value="10">10 per page</option>
//                 <option value="20">20 per page</option>
//                 <option value="30">30 per page</option>
//                 <option value="50">50 per page</option>
//               </select>
              
//               <input
//                 type="number"
//                 value={pagination.offset}
//                 onChange={handleOffsetChange}
//                 min="0"
//                 max={pagination.count}
//                 placeholder="Offset"
//                 className="bg-gray-700 text-white rounded-full px-3 py-2 w-20 border border-gray-600 focus:outline-none focus:ring-amber-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="space-y-6">
//             {[...Array(pagination.limit)].map((_, index) => (
//               <div key={index} className="animate-pulse bg-gray-800 rounded-xl p-6">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
//                   <div className="space-y-2">
//                     <div className="h-4 bg-gray-700 rounded w-32"></div>
//                     <div className="h-3 bg-gray-700 rounded w-24"></div>
//                   </div>
//                 </div>
//                 <div className="h-4 bg-gray-700 rounded w-16 mb-4"></div>
//                 <div className="space-y-2">
//                   <div className="h-3 bg-gray-700 rounded w-full"></div>
//                   <div className="h-3 bg-gray-700 rounded w-5/6"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Contacts List */}
//         {!isLoading && (
//           <>
//             {filteredContacts.length > 0 ? (
//               <div className="space-y-6">
//                 {filteredContacts.map((contact) => (
//                   <div 
//                     key={contact.id} 
//                     className="bg-gray-800/50 rounded-xl p-6 shadow-lg hover:shadow-amber-500/10 transition-shadow duration-300"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex items-center space-x-4">
//                         <div className="bg-amber-500/20 h-10 w-10 rounded-full flex items-center justify-center text-amber-400 font-medium">
//                           {contact.name?.charAt(0) || 'C'}
//                         </div>
//                         <div>
//                           <h3 className="text-white font-medium">{contact.name || 'Anonymous'}</h3>
//                           <p className="text-gray-400 text-sm">{formatDate(contact.created_at)}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2">
//                         {getStatusBadge(contact.status || 'pending')}
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                       <div>
//                         <p className="text-gray-400 text-sm">Email</p>
//                         <p className="text-white">{contact.email || '-'}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-400 text-sm">Phone</p>
//                         <p className="text-white">{contact.phone || '-'}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-400 text-sm">Subject</p>
//                         <p className="text-white">{contact.subject || 'No subject'}</p>
//                       </div>
//                     </div>
                    
//                     <div className="mb-4">
//                       <p className="text-gray-400 text-sm">Message</p>
//                       <p className="text-gray-300 whitespace-pre-line">{contact.message}</p>
//                     </div>
                    
//                     <div className="flex justify-end space-x-3">
//                       {permissions.delete_contact && (
//                         <button
//                           onClick={() => deleteContact(contact.id)}
//                           className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-red-600/30 to-red-700/20 border border-red-500/30 text-red-300 rounded-lg hover:from-red-600/40 hover:to-red-700/30 transition-all duration-300 group flex items-center shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span className="relative z-10 font-medium">Delete</span>
//                           <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                         </button>
//                       )}

                      
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20">
//                 <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
//                   <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-light text-white mb-2">No contacts found</h3>
//                 <p className="text-gray-400 max-w-md mx-auto">We couldn't find any contacts matching your search.</p>
//               </div>
//             )}
//           </>
//         )}

//         {/* Enhanced Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
//             <div className="text-gray-400 text-sm">
//               Page {pagination.currentPage} of {pagination.totalPages} • Total {pagination.count} contacts
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handlePageChange(1)}
//                 disabled={pagination.currentPage === 1}
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
//                 aria-label="First page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => handlePageChange(pagination.currentPage - 1)}
//                 disabled={!pagination.hasPrevious}
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
//                 aria-label="Previous page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.currentPage >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       className={`w-8 h-8 rounded-full text-sm transition-colors ${
//                         pagination.currentPage === pageNum
//                           ? 'bg-amber-600 text-white'
//                           : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
//                       }`}
//                       aria-label={`Page ${pageNum}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => handlePageChange(pagination.currentPage + 1)}
//                 disabled={!pagination.hasNext}
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
//                 aria-label="Next page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => handlePageChange(pagination.totalPages)}
//                 disabled={pagination.currentPage === pagination.totalPages}
//                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
//                 aria-label="Last page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactsCom;





'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const ContactsCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    offset: 0,
    totalPages: 1,
    count: 0,
    hasNext: false,
    hasPrevious: false
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const { currentPage, limit, offset } = pagination;
        
        const params = {
          page: currentPage,
          limit: limit,
        };
        if (offset > 0) params.offset = offset;

        const res = await AxiosInstance.get('/ecommerce/contact', { params });
        
        if (res.data?.status === 'SUCCESS') {
          setContacts(res.data.data || []);
          setFilteredContacts(res.data.data || []);
          setPagination(prev => ({
            ...prev,
            count: res.data.meta?.total || 0,
            totalPages: res.data.meta?.pages || 1,
            hasNext: res.data.meta?.has_next || false,
            hasPrevious: res.data.meta?.has_previous || false
          }));
        } else {
          toast.error(res.data?.message || 'Failed to load contacts', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        let errorMessage = 'Failed to load contacts';
        if (error.response) {
          errorMessage = error.response.data?.message || 
                        `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = 'No response from server';
        }
        
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [pagination.currentPage, pagination.limit, pagination.offset, refreshKey]);

  const deleteContact = async (id) => {
    try {
      await AxiosInstance.delete(`/ecommerce/contact?id=${id}`);
      setRefreshKey(prev => prev + 1);
      toast.success('Contact deleted successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting contact', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = contacts.filter((contact) => {
      const idMatch = contact.id.toString().includes(value);
      const nameMatch = contact.name?.toLowerCase().includes(value);
      const emailMatch = contact.email?.toLowerCase().includes(value);
      const phoneMatch = contact.phone_number?.toLowerCase().includes(value);
      const messageMatch = contact.message?.toLowerCase().includes(value);
      
      return idMatch || nameMatch || emailMatch || phoneMatch || messageMatch;
    });

    setFilteredContacts(filtered);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ 
      ...prev, 
      limit: newLimit,
      currentPage: 1,
      offset: 0
    }));
  };

  const handleOffsetChange = (e) => {
    const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
    setPagination(prev => ({ 
      ...prev, 
      offset: newOffset,
      currentPage: 1
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCreatedByInfo = (contact) => {
    if (!contact.created_by) return 'N/A';
    return `${contact.created_by.get_full_name} (${contact.created_by.email})`;
  };

  const getStatusBadge = () => {
    // Since your response doesn't include status, we'll use a default
    const status = 'pending';
    const statusMap = {
      'pending': { color: 'bg-yellow-500/20 text-yellow-400', label: 'Pending' },
      'responded': { color: 'bg-green-500/20 text-green-400', label: 'Responded' },
      'spam': { color: 'bg-red-500/20 text-red-400', label: 'Spam' }
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-500/20 text-gray-400', label: status };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  if (!permissions.read_contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to view Contacts. Please contact your administrator.
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white mb-2">Contact Messages</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
            <p className="text-gray-400 text-sm">Customer inquiries and messages</p>
          </div>
        </div>
        
        {/* Stats and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl gap-4">
          <div className="text-amber-400 font-light">
            Showing {filteredContacts.length} of {pagination.count} contacts
            {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, email, phone or message..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <select 
                value={pagination.limit}
                onChange={handleLimitChange}
                className="bg-gray-700 text-white rounded-full px-3 py-2 border border-gray-600 focus:outline-none focus:ring-amber-500"
              >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="30">30 per page</option>
                <option value="50">50 per page</option>
              </select>
              
              <input
                type="number"
                value={pagination.offset}
                onChange={handleOffsetChange}
                min="0"
                max={pagination.count}
                placeholder="Offset"
                className="bg-gray-700 text-white rounded-full px-3 py-2 w-20 border border-gray-600 focus:outline-none focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            {[...Array(pagination.limit)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-32"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-16 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contacts List */}
        {!isLoading && (
          <>
            {filteredContacts.length > 0 ? (
              <div className="space-y-6">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="bg-gray-800/50 rounded-xl p-6 shadow-lg hover:shadow-amber-500/10 transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-amber-500/20 h-10 w-10 rounded-full flex items-center justify-center text-amber-400 font-medium">
                          {contact.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{contact.name || 'Anonymous'}</h3>
                          <p className="text-gray-400 text-sm">ID: {contact.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{contact.email || '-'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white">{contact.phone_number || '-'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Created By</p>
                        <p className="text-white">{getCreatedByInfo(contact)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm">Message</p>
                      <p className="text-gray-300 whitespace-pre-line">{contact.message}</p>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      {permissions.delete_contact && (
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-red-600/30 to-red-700/20 border border-red-500/30 text-red-300 rounded-lg hover:from-red-600/40 hover:to-red-700/30 transition-all duration-300 group flex items-center shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="relative z-10 font-medium">Delete</span>
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">No contacts found</h3>
                <p className="text-gray-400 max-w-md mx-auto">We couldn't find any contacts matching your search.</p>
              </div>
            )}
          </>
        )}

        {/* Enhanced Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
            <div className="text-gray-400 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages} • Total {pagination.count} contacts
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                aria-label="First page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevious}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
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
                disabled={!pagination.hasNext}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-500 disabled:opacity-50 transition-colors"
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
  );
};

export default ContactsCom;