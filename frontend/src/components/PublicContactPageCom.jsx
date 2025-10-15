// 'use client';
// import React, { useState } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';


// const Contact = () => {
//   const [name, setname] = useState('')
//   const [phone_number, setphone_number] = useState('')
//   const [email, setemail] = useState('')
//   const [message, setmessage] = useState('')

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     try {
//         e.preventDefault();
//         const payload = {"name":name ,"phone_number":phone_number, 
//           "email":email, "message":message}
        
//         const response = await AxiosInstance.post('/ecommerce/contact', payload , {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         });
//         if (response){
           
//           console.log('Response:', response.data);
//           setname('');
//           setphone_number('');
//           setemail('');
//           setmessage('');

//           router.push('/contact');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
//     };
  
//   return (
//     <div className="min-h-screen bg-black-100 mt-0 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ml-56 w-3/4">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">Contact Us</h2>
//           <p className="mt-2 text-center text-sm text-white-600">
//             We'd love to hear from you!
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//               placeholder="Your Name" value={name} onChange= {e => setname(e.target.value)} />
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//               placeholder="Email address"  value={email} onChange= {e => setemail(e.target.value)} />
//             </div>
//             <div>
//               <label htmlFor="phone-number" className="sr-only">Phone Number</label>
//               <input id="phone-number" name="email" type="phone-number" autoComplete="phone-number" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//               placeholder="Phone Number"   value={phone_number} onChange= {e => setphone_number(e.target.value)}/>
//             </div>
//             <div>
//               <label htmlFor="message" className="sr-only">Message</label>
//               <textarea id="message" name="message" rows="4" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
//               placeholder="Your Message"  value={message} onChange= {e => setmessage(e.target.value)}></textarea>
//             </div>
//           </div>

//           <div>
//             <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//               Send Message
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;



// Without framer-motion

// 'use client';
// import React, { useState } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone_number: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const response = await AxiosInstance.post('/ecommerce/contact', formData, {
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (response) {
//         setFormData({
//           name: '',
//           phone_number: '',
//           email: '',
//           message: ''
//         });
//         router.push('/contact');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
//             Get In Touch
//           </h1>
//           <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//             Our concierge team is available to assist you with any inquiries. 
//             Reach out and we'll respond promptly.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 border border-gray-700">
//               <h2 className="text-2xl font-serif font-light text-white mb-6">Contact Information</h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="bg-black p-3 rounded-full mr-4">
//                     <FaPhoneAlt className="text-gold-500 text-lg" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-300 text-sm uppercase tracking-wider mb-1">Phone</h3>
//                     <p className="text-white text-lg">(+92) 333 1906382</p>
//                     <p className="text-white text-lg">(+92) 51 0000000</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-black p-3 rounded-full mr-4">
//                     <FaEnvelope className="text-gold-500 text-lg" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-300 text-sm uppercase tracking-wider mb-1">Email</h3>
//                     <p className="text-white text-lg">contact@luxurybrand.com</p>
//                     <p className="text-white text-lg">support@luxurybrand.com</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-black p-3 rounded-full mr-4">
//                     <FaMapMarkerAlt className="text-gold-500 text-lg" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-300 text-sm uppercase tracking-wider mb-1">Address</h3>
//                     <p className="text-white text-lg">DHA 2, Islamabad</p>
//                     <p className="text-white text-lg">Pakistan</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 border border-gray-700">
//               <h2 className="text-2xl font-serif font-light text-white mb-6">Business Hours</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between border-b border-gray-700 pb-2">
//                   <span className="text-gray-300">Monday - Friday</span>
//                   <span className="text-white">9:00 AM - 6:00 PM</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-700 pb-2">
//                   <span className="text-gray-300">Saturday</span>
//                   <span className="text-white">10:00 AM - 4:00 PM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-300">Sunday</span>
//                   <span className="text-white">Closed</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 border border-gray-700">
//             <h2 className="text-2xl font-serif font-light text-white mb-6">Send Us a Message</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
//                     placeholder="your@email.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
//                   <input
//                     id="phone_number"
//                     name="phone_number"
//                     type="tel"
//                     required
//                     className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
//                     placeholder="+92 333 1906382"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="5"
//                   required
//                   className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
//                   placeholder="How can we assist you?"
//                   value={formData.message}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-md hover:from-gold-700 hover:to-gold-800 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   <FaPaperPlane className="mr-2" />
//                   {isSubmitting ? 'Sending...' : 'Send Message'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;




// 'use client';
// import React, { useState } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const PublicContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone_number: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const response = await AxiosInstance.post('/ecommerce/publiccontact', formData, {
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (response) {
//         setFormData({
//           name: '',
//           phone_number: '',
//           email: '',
//           message: ''
//         });
//         router.push('/publiccontact');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-serif font-light text-black mb-4"
//           >
//             Get In Touch
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-lg text-black max-w-2xl mx-auto"
//           >
//             Our concierge team is available to assist you with any inquiries. 
//             Reach out and we'll respond promptly.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="space-y-8"
//           >
//             <div className="bg-gray-100 rounded-xl p-8 border border-gray-300">
//               <h2 className="text-2xl font-serif font-light text-black mb-6">Contact Information</h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="bg-gray-200 p-3 rounded-full mr-4">
//                     <FaPhoneAlt className="text-gray-700 text-lg" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-700 text-sm uppercase tracking-wider mb-1">Phone</h3>
//                     <p className="text-black text-lg">(+92) 333 1906382</p>
//                     <p className="text-black text-lg">(+92) 51 0000000</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-gray-200 p-3 rounded-full mr-4">
//                     <FaEnvelope className="text-gray-700 text-lg" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-700 text-sm uppercase tracking-wider mb-1">Email</h3>
//                     <p className="text-black text-lg">contact@luxurybrand.com</p>
//                     <p className="text-black text-lg">support@luxurybrand.com</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-gray-200 p-3 rounded-full mr-4">
//                     <FaMapMarkerAlt className="text-gray-700 text-lg" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-700 text-sm uppercase tracking-wider mb-1">Address</h3>
//                     <p className="text-black text-lg">DHA 2, Islamabad</p>
//                     <p className="text-black text-lg">Pakistan</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-8 border border-gray-300">
//               <h2 className="text-2xl font-serif font-light text-black mb-6">Business Hours</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between border-b border-gray-300 pb-2">
//                   <span className="text-gray-700">Monday - Friday</span>
//                   <span className="text-black">9:00 AM - 6:00 PM</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-300 pb-2">
//                   <span className="text-gray-700">Saturday</span>
//                   <span className="text-black">10:00 AM - 4:00 PM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-700">Sunday</span>
//                   <span className="text-black">Closed</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="bg-gray-100 rounded-xl p-8 border border-gray-300"
//           >
//             <h2 className="text-2xl font-serif font-light text-black mb-6">Send Us a Message</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
//                     placeholder="your@email.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     id="phone_number"
//                     name="phone_number"
//                     type="tel"
//                     required
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
//                     placeholder="0300 0000000"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="5"
//                   required
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
//                   placeholder="How can we assist you?"
//                   value={formData.message}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full flex items-center justify-center px-6 py-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   <FaPaperPlane className="mr-2" />
//                   {isSubmitting ? 'Sending...' : 'Send Message'}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicContactPage;





'use client';
import React, { useState } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PublicContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone_number: '',
    email: '',
    message: '',
    general: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const validateField = (name, value) => {
  switch (name) {
    case 'name':
      if (!value) return 'Name is required';
      if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(value)) {
        return 'Name must contain only letters and single spaces between words';
      }
      return '';
    case 'email':
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email';
      }
      return '';
    case 'phone_number':
      if (!value) return 'Phone number is required';
      if (!/^[\d\-\+\(\) ]+$/.test(value)) {
        return 'Phone number can contain only digits, spaces, dashes (-), parentheses (), and plus (+)';
      }
      const digitCount = value.replace(/\D/g, '').length;
      if (digitCount < 9 || digitCount > 15) {
        return 'Phone number must be 9 to 15 digits long';
      }
      return '';
    case 'message':
      if (!value) return 'Message is required';
      return '';
    default:
      return '';
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrors({
      name: '',
      phone_number: '',
      email: '',
      message: '',
      general: ''
    });

    // Validate all fields before submission
    let hasErrors = false;
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await AxiosInstance.post('/ecommerce/publiccontact', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.data && response.data.success) {
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({
          name: '',
          phone_number: '',
          email: '',
          message: ''
        });
        // Optional: Redirect after delay
        setTimeout(() => router.push('/publiccontact'), 3000);
      }
    } catch (error) {
      if (error.response) {
        // Backend validation errors
        if (error.response.data && error.response.data.errors) {
          const backendErrors = {};
          Object.keys(error.response.data.errors).forEach(key => {
            backendErrors[key] = error.response.data.errors[key].message;
          });
          setErrors(backendErrors);
        } else {
          setErrors(prev => ({
            ...prev,
            general: error.response.data.error || 'An error occurred while submitting the form'
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Network error. Please check your connection and try again.'
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="text-center mb-16">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-serif font-light text-black mb-4"
      >
        Get In Touch
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-black max-w-2xl mx-auto"
      >
        Our concierge team is available to assist you with any inquiries. 
        Reach out and we'll respond promptly.
      </motion.p>
    </div>

    {/* Success Message */}
    {successMessage && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        {successMessage}
      </motion.div>
    )}

    {/* General Error Message */}
    {errors.general && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
      >
        {errors.general}
      </motion.div>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="bg-gray-100 rounded-xl p-8 border border-gray-300">
          <h2 className="text-2xl font-serif font-light text-black mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-gray-200 p-3 rounded-full mr-4">
                <FaPhoneAlt className="text-gray-700 text-lg" />
              </div>
              <div>
                <h3 className="text-gray-700 text-sm uppercase tracking-wider mb-1">Phone</h3>
                <p className="text-black text-lg">(+92) 333 1906382</p>
                <p className="text-black text-lg">(+92) 51 0000000</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-200 p-3 rounded-full mr-4">
                <FaEnvelope className="text-gray-700 text-lg" />
              </div>
              <div>
                <h3 className="text-gray-700 text-sm uppercase tracking-wider mb-1">Email</h3>
                <p className="text-black text-lg">contact@luxurybrand.com</p>
                <p className="text-black text-lg">support@luxurybrand.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-200 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-gray-700 text-lg" />
              </div>
              <div>
                <h3 className="text-gray-700 text-sm uppercase tracking-wider mb-1">Address</h3>
                <p className="text-black text-lg">DHA 2, Islamabad</p>
                <p className="text-black text-lg">Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-300">
          <h2 className="text-2xl font-serif font-light text-black mb-6">Business Hours</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="text-gray-700">Monday - Friday</span>
              <span className="text-black">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="text-gray-700">Saturday</span>
              <span className="text-black">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Sunday</span>
              <span className="text-black">Closed</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-100 rounded-xl p-8 border border-gray-300"
      >
        <h2 className="text-2xl font-serif font-light text-black mb-6">Send Us a Message</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={`w-full px-4 py-3 bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-3 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                className={`w-full px-4 py-3 bg-white border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
                placeholder="0300 0000000"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className={`w-full px-4 py-3 bg-white border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
              placeholder="How can we assist you?"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center px-6 py-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FaPaperPlane className="mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  </div>
</div>
  );
};

export default PublicContactPage;