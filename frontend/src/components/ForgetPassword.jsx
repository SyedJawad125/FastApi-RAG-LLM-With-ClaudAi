// 'use client';
// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function ForgetPassword() {
//     const router = useRouter();

//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [step, setStep] = useState(1); // Step 1 for email, Step 2 for OTP and reset
//     const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

//     const handleForgetPassword = async () => {
//         try {
//             const response = await AxiosInstance.post('/user/forget-password', { email });
//             console.log("Email sent successfully:", response);
//             setStep(2);
//         } catch (error) {
//             console.error("Error sending email:", error.response?.data || error.message);
//             alert("Failed to send OTP. Please try again.");
//         }
//     };

//     const handleVerifyOtp = async () => {
//         try {
//             const response = await AxiosInstance.post('/user/verify-otp', {
//                 otp,
//                 new_password: newPassword,
//                 confirm_password: confirmPassword,
//             });
//             console.log("OTP verified successfully:", response);

//             // Show success toast
//             toast.success("Password reset successful!", {
//                 onClose: () => {
//                     // Navigate to the Login page after the toast is closed
//                     router.push("/Login");
//                 },
//             });

//             // Clear the OTP, new password, and confirm password fields
//             setOtp("");
//             setNewPassword("");
//             setConfirmPassword("");
//         } catch (error) {
//             console.error("Error verifying OTP:", error.response?.data || error.message);
//             alert("Failed to verify OTP. Please try again.");
//         }
//     };

//     const handleback = () => {
//         router.push("/Login");
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-700">
//             <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-md">
//                 {step === 1 && (
//                     <button onClick={handleback} className="text-white">
//                         <FontAwesomeIcon icon={faArrowLeft} />
//                     </button>
//                 )}
//                 <h2 className="text-2xl font-bold text-center text-white">
//                     {step === 1 ? "Forgot Password" : "Verify OTP"}
//                 </h2>

//                 {step === 1 ? (
//                     <div>
//                         <input
//                             type="email"
//                             className="w-full p-3 border border-gray-300 text-black rounded focus:outline-none focus:ring focus:ring-indigo-200"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <button
//                             onClick={handleForgetPassword}
//                             className="w-full mt-4 bg-indigo-600 text-white p-3 rounded hover:bg-indigo-500 transition"
//                         >
//                             Send OTP
//                         </button>
//                     </div>
//                 ) : (
//                     <div>
//                         <input
//                             type="text"
//                             className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
//                             placeholder="Enter OTP"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                         />
//                         <div className="relative w-full mt-4">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
//                                 placeholder="New Password"
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                             />
//                             <span
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
//                             >
//                                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                             </span>
//                         </div>
//                         <div className="relative w-full mt-4">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
//                                 placeholder="Confirm New Password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <span
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
//                             >
//                                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                             </span>
//                         </div>
//                         <button
//                             onClick={handleVerifyOtp}
//                             className="w-full mt-4 bg-indigo-600 text-white p-3 rounded hover:bg-indigo-500 transition"
//                         >
//                             Reset Password
//                         </button>
//                     </div>
//                 )}
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }


'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleForgetPassword = async () => {
        setIsLoading(true);
        try {
            const response = await AxiosInstance.post('/user/forget-password', { email: formData.email });
            console.log("Email sent successfully:", response);
            setStep(2);
            toast.success("OTP sent to your email!");
        } catch (error) {
            console.error("Error sending email:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await AxiosInstance.post('/user/verify-otp', {
                otp: formData.otp,
                new_password: formData.newPassword,
                confirm_password: formData.confirmPassword,
            });

            toast.success("Password reset successful!", {
                onClose: () => router.push("/Login"),
            });

            setFormData({
                email: "",
                otp: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error verifying OTP:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        router.push("/Login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex items-center mb-6">
                        <button 
                            onClick={handleBack}
                            className="text-gray-600 hover:text-gray-800 transition-colors mr-4"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {step === 1 ? "Forgot Password" : "Reset Password"}
                        </h2>
                    </div>

                    <ToastContainer position="top-center" autoClose={3000} />

                    {step === 1 ? (
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleForgetPassword}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition duration-200 shadow-md disabled:opacity-70 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <span className="animate-spin mr-2">↻</span>
                                ) : null}
                                Send OTP
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                                    placeholder="Enter 6-digit OTP"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10 text-black"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10 text-black"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition duration-200 shadow-md disabled:opacity-70 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <span className="animate-spin mr-2">↻</span>
                                ) : null}
                                Reset Password
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}