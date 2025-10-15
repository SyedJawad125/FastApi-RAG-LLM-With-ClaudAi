// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faArrowLeft  } from '@fortawesome/free-solid-svg-icons';

// const ChangePassword = () => {
//   const router = useRouter();

//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Reset error and success messages
//     setError('');
//     setSuccess('');

//     // Basic validation
//     if (newPassword !== confirmPassword) {
//       setError('New password and confirm password do not match.');
//       return;
//     }

//     const payload = {
//       old_password: currentPassword,
//       new_password: newPassword,
//       confirm_password: confirmPassword,
//     };

//     try {
//       const response = await AxiosInstance.post('/user/change-password', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         setSuccess('Password changed successfully.');
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         setError(response.data.message || 'Failed to change password. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//    const handleback = () => {
//     router.push("/admindashboard");
//    }

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-700">
//       <div className="w-full max-w-md p-8 space-y-8 bg-black rounded shadow-lg">
//         <button onClick={handleback} className="text-white">
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>
//         <h2 className="text-2xl font-bold text-center">Change Password</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-500">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400">
//               Current Password
//             </label>
//             <div className="relative">
//               <input
//                 id="currentPassword"
//                 type={showCurrentPassword ? 'text' : 'password'}
//                 className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//               >
//                 <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} className="text-black" />
//               </span>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">
//               New Password
//             </label>
//             <div className="relative">
//               <input
//                 id="newPassword"
//                 type={showNewPassword ? 'text' : 'password'}
//                 className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//               >
//                 <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} className="text-black" />
//               </span>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
//               Confirm New Password
//             </label>
//             <div className="relative">
//               <input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-black" />
//               </span>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Change Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;



'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await AxiosInstance.post('/user/change-password', {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword
      });

      if (response.status === 200) {
        setSuccess('Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(response.data.message || 'Failed to change password. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    router.push("/admindashboard");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          </div>

          {(error || success) && (
            <div className={`mb-6 p-3 rounded-lg ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {error || success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  <FontAwesomeIcon icon={showPassword.current ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  <FontAwesomeIcon icon={showPassword.new ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  <FontAwesomeIcon icon={showPassword.confirm ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;