// import axios from 'axios';
// import { toast } from 'react-toastify';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000',
//   timeout: 10000, // 10 seconds timeout
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Get the token from localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const parsedToken = JSON.parse(token);
//         config.headers.Authorization = `Bearer ${parsedToken}`;
//       } catch (error) {
//         console.error('Error parsing token:', error);
//         localStorage.removeItem('token'); // Remove invalid token
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is due to an invalid/expired token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Try to refresh the token
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//           throw new Error('No refresh token available');
//         }

//         const response = await axios.post('http://localhost:8000/user/refresh-token', {
//           refresh_token: JSON.parse(refreshToken)
//         });

//         if (response.data.token) {
//           // Save the new tokens
//           localStorage.setItem('token', JSON.stringify(response.data.token));
//           localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token));

//           // Update the Authorization header
//           originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          
//           // Retry the original request
//           return axiosInstance(originalRequest);
//         }
//       } catch (refreshError) {
//         // If refresh token is invalid or expired, logout the user
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('permissions');
//         localStorage.removeItem('role');
        
//         // Show error message
//         toast.error('Session expired. Please login again.', {
//           position: "top-center",
//           autoClose: 3000,
//         });

//         // Redirect to login page
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle other types of errors
//     const errorMessage = error.response?.data?.message || 'An error occurred';
//     toast.error(errorMessage, {
//       position: "top-center",
//       autoClose: 3000,
//     });

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
});

// Request interceptor remains the same
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsedToken}`;
      } catch (error) {
        console.error('Error parsing token:', error);
        localStorage.removeItem('token');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Modified response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 403 errors (wrong credentials)
    if (error.response?.status === 403) {
      return Promise.resolve({
        data: null,
        error: {
          status: 403,
          message: 'Wrong email or password. Please try again.'
        }
      });
    }

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await axios.post('http://localhost:8000/user/refresh-token', {
          refresh_token: JSON.parse(refreshToken)
        });

        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token));
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('permissions');
        localStorage.removeItem('role');
        toast.error('Session expired. Please login again.', {
          position: "top-center",
          autoClose: 3000,
        });
        window.location.href = '/login';
      }
    }

    // For other errors, show generic message
    const errorMessage = error.response?.data?.message || 'An error occurred';
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 3000,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;