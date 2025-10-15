// 'use client'
// import React from 'react'
// import AdminSideNavbarCom from "@/components/AdminSideNavbarCom";
// import AdminDashboardCom from "@/components/AdminDashboardCom";


// const AdminDashborad = () => {
//   return (
//     <div className="flex h-screen">
      
//       {/* <div className="w-[16%] bg-gray-800 text-white">
//        */}
//        <div className="w-[16%]">
//         <AdminSideNavbarCom />
//       </div>
//       {/* <div className="w-[84%] p-6 bg-black"> */}
//       <div className="w-[84%] p-6 bg-gray-100 dark:bg-gray-900">
//         <AdminDashboardCom />
//       </div>
//     </div> 
//   )
// }

// export default AdminDashborad




'use client';
import React from 'react';
// import ProtectedRoute from '@/components/ProtectedRoute';
import AdminSideNavbarCom from '@/components/AdminSideNavbarCom';
import AdminDashboardCom from '@/components/AdminDashboardCom';

const AdminDashboard = () => {
  return (
    // <ProtectedRoute>
      <div className="flex h-screen">
        <div className="w-[16%]">
          <AdminSideNavbarCom />
        </div>
        <div className="w-[84%] p-6 bg-gray-100 dark:bg-gray-900">
          <AdminDashboardCom />
        </div>
      </div>
    // </ProtectedRoute>
  );
};

export default AdminDashboard;
