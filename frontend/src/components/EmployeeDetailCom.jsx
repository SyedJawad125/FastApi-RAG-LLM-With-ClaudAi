// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from '@/components/AxiosInstance';

// const EmployeeDetail = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const EpmloyeeId = searchParams.get('EpmloyeeId');

//     if (EpmloyeeId) {
//       const fetchEmployees = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/employee?id=${EpmloyeeId}`);
//           if (res && res.data && res.data.data) {
//             setEmployees(res.data.data.data); // Convert to array if it's a single object
//           } else {
//             console.error('Unexpected API response structure:', res.data);
//           }
//         } catch (error) {
//           console.error('Error fetching employee:', error);
//         }
//       };
//       fetchEmployees();
//     }
//   }, [searchParams]);

//   return (
//     <div className="container mx-auto my-0 p-6 bg-gray-800 rounded-lg shadow-lg">
//     <h2 className="text-2xl font-bold mb-4 text-white ml-5">Employee Details</h2>
  
//     {employees.length ? (
//       employees.map((employee) => (
//         <div key={employee.id} className="flex flex-col md:flex-row gap-4 text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg ml-5">
//           <div className="flex flex-col items-center md:items-start md:w-1/3">
//             {employee.image && (
//               <div className="flex flex-col items-center md:items-start mt-5">
//                 <img 
//                   src={`http://localhost:8000/${employee.image}`} 
//                   alt={`${employee.first_name} ${employee.last_name}`} 
//                   className="rounded-lg shadow-lg w-48 h-48 object-cover mb-2" 
//                 />
//                 <p className="text-white font-semibold mb-5">{`${employee.first_name} ${employee.last_name}`}</p>
//               </div>
//             )}
//           </div>
//           <div className="md:w-2/3">
//             <p><strong>ID:</strong> {employee.id}</p>
//             <p><strong>First Name:</strong> {employee.first_name}</p>
//             <p><strong>Last Name:</strong> {employee.last_name}</p>
//             <p><strong>Email:</strong> {employee.email}</p>
//             <p><strong>Phone Number:</strong> {employee.phone_number}</p>
//             <p><strong>Date of Birth:</strong> {employee.date_of_birth}</p>
//             <p><strong>Hire Date:</strong> {employee.hire_date}</p>
//             <p><strong>Position:</strong> {employee.position}</p>
//             <p><strong>Department:</strong> {employee.department}</p>
//             <p><strong>Salary:</strong> {employee.salary}</p>
//           </div>
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-400">No employee details available.</p>
//     )}
//     <button
//       className="mt-4 bg-blue-700 text-white py-2 px-4 rounded ml-5"
//       onClick={() => router.push('/employeepage')}
//     >
//       Back to Employee List
//     </button>
//   </div>
  

//   );
// };

// export default EmployeeDetail;


'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

const EmployeeDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const EpmloyeeId = searchParams.get('EpmloyeeId');

    if (EpmloyeeId) {
      const fetchEmployees = async () => {
        try {
          const res = await AxiosInstance.get(`/ecommerce/employee?id=${EpmloyeeId}`);
          if (res && res.data && res.data.data) {
            setEmployees(res.data.data.data);
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
      fetchEmployees();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Employee Profile
          </h1>
          <button
            onClick={() => router.push('/employeepage')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Employees
          </button>
        </div>

        {employees.length ? (
          employees.map((employee) => (
            <div key={employee.id} className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                {/* Profile Image Section */}
                <div className="md:w-1/3 p-8 bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center">
                  {employee.image && (
                    <div className="mb-6">
                      <img 
                        src={`http://localhost:8000/${employee.image}`} 
                        alt={`${employee.first_name} ${employee.last_name}`} 
                        className="rounded-full border-4 border-amber-500 shadow-xl w-64 h-64 object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-3xl font-bold text-white text-center mb-2">
                    {`${employee.first_name} ${employee.last_name}`}
                  </h2>
                  <p className="text-amber-200 font-medium">{employee.position}</p>
                  <p className="text-gray-300 mt-1">{employee.department}</p>
                  
                  <div className="mt-8 w-full">
                    <div className="flex justify-between items-center p-4 bg-gray-900 bg-opacity-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-400">Employee ID</p>
                        <p className="text-white font-mono">{employee.id}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-600"></div>
                      <div>
                        <p className="text-xs text-gray-400">Salary</p>
                        <p className="text-amber-400 font-medium">PKR {employee.salary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:w-2/3 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-amber-500 border-b border-amber-800 pb-2">
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">First Name</p>
                          <p className="text-white font-medium">{employee.first_name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Last Name</p>
                          <p className="text-white font-medium">{employee.last_name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Date of Birth</p>
                          <p className="text-white font-medium">{employee.date_of_birth}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-amber-500 border-b border-amber-800 pb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                          <p className="text-white font-medium">{employee.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Phone Number</p>
                          <p className="text-white font-medium">{employee.phone_number}</p>
                        </div>
                      </div>
                    </div>

                    {/* Employment Details */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-amber-500 border-b border-amber-800 pb-2">
                        Employment Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Hire Date</p>
                          <p className="text-white font-medium">{employee.hire_date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Position</p>
                          <p className="text-white font-medium">{employee.position}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Department</p>
                          <p className="text-white font-medium">{employee.department}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-amber-500 border-b border-amber-800 pb-2">
                        Additional Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Salary</p>
                          <p className="text-amber-400 font-medium">PKR {employee.salary}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                          <p className="text-green-400 font-medium">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-300">No employee details available</h3>
            <p className="mt-2 text-gray-500">The requested employee profile could not be found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;