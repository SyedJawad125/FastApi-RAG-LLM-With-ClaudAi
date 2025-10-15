// 'use client';
// import React, { createContext, useState, useEffect, useCallback } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';

// export const AuthContext = createContext();

// // Define available roles and their hierarchy
// const ROLE_HIERARCHY = {
//   SUPER_ADMIN: ['ADMIN', 'MANAGER', 'USER'],
//   ADMIN: ['MANAGER', 'USER'],
//   MANAGER: ['USER'],
//   USER: []
// };

// // Define permission sets for each role
// const ROLE_PERMISSIONS = {
//   SUPER_ADMIN: ['all'],
//   ADMIN: [
//     'manage_users',
//     'manage_employees',
//     'manage_products',
//     'manage_categories',
//     'view_reports',
//     'manage_settings'
//   ],
//   MANAGER: [
//     'manage_employees',
//     'manage_products',
//     'view_reports'
//   ],
//   USER: [
//     'view_products',
//     'view_categories'
//   ]
// };

// export const AuthProvider = ({ children }) => {
//   const router = useRouter();
//   const [token, setToken] = useState(null);
//   const [refreshToken, setRefreshToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [permissions, setPermissions] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   // Load auth state from localStorage
//   useEffect(() => {
//     const loadAuthState = () => {
//       try {
//         const storedToken = localStorage.getItem('token');
//         const storedRefreshToken = localStorage.getItem('refreshToken');
//         const storedUser = localStorage.getItem('user');
//         const storedRole = localStorage.getItem('role');
//         const storedPermissions = localStorage.getItem('permissions');

//         if (storedToken) setToken(JSON.parse(storedToken));
//         if (storedRefreshToken) setRefreshToken(JSON.parse(storedRefreshToken));
//         if (storedUser) setUser(JSON.parse(storedUser));
//         if (storedRole) setRole(JSON.parse(storedRole));
//         if (storedPermissions) setPermissions(JSON.parse(storedPermissions));
//       } catch (error) {
//         console.error('Error loading auth state:', error);
//         // Clear potentially corrupted data
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('user');
//         localStorage.removeItem('role');
//         localStorage.removeItem('permissions');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadAuthState();
//   }, []);

//   // Check if user has permission
//   const hasPermission = useCallback((requiredPermission) => {
//     if (!role || !permissions) return false;
    
//     // Super admin has all permissions
//     if (role === 'SUPER_ADMIN') return true;
    
//     // Check if user has the specific permission
//     if (Array.isArray(permissions)) {
//       return permissions.includes(requiredPermission);
//     }
    
//     return false;
//   }, [role, permissions]);

//   // Check if user has role
//   const hasRole = useCallback((requiredRole) => {
//     if (!role) return false;
    
//     // Check if user has the exact role
//     if (role === requiredRole) return true;
    
//     // Check if user's role is higher in hierarchy
//     const higherRoles = ROLE_HIERARCHY[role] || [];
//     return higherRoles.includes(requiredRole);
//   }, [role]);

//   // Login function
// const login = useCallback(async (credentials) => {
//   try {
//     const response = await AxiosInstance.post('/users/login', credentials);
//     const {
//       access_token,
//       refresh_token,
//       user_id,
//       username,
//       email,
//       is_superuser,
//       role_name,
//       permissions
//     } = response.data;

//     const userData = { user_id, username, email, is_superuser };

//     localStorage.setItem('token', JSON.stringify(access_token));
//     localStorage.setItem('refreshToken', JSON.stringify(refresh_token));
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('role', JSON.stringify(role_name));
//     localStorage.setItem('permissions', JSON.stringify(permissions));

//     setToken(access_token);
//     setRefreshToken(refresh_token);
//     setUser(userData);
//     setRole(role_name);
//     setPermissions(permissions);

//     // toast.success('Login successful!');
//     toast.success('Logged out successfully!', {
//       autoClose: 1500,
//     });
    
    
//     // Redirect all users to admindashboard
//     router.push('/admindashboard');
    
//   } catch (error) {
//     console.error('Login error:', error);
//     toast.error(error.response?.data?.detail || 'Login failed');
//     throw error;
//   }
// }, [router]);
  

//   // Register function
//   const register = useCallback(async (userData) => {
//     try {
//       const response = await AxiosInstance.post('/users/signup', userData);
//       toast.success('Registration successful! Please login.');
//       return response.data;
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error(error.response?.data?.message || 'Registration failed');
//       throw error;
//     }
//   }, []);


//   // Logout function
// const logout = useCallback(() => {
//   try {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     localStorage.removeItem('role');
//     localStorage.removeItem('permissions');

//     setToken(null);
//     setRefreshToken(null);
//     setUser(null);
//     setRole(null);
//     setPermissions({});

//     // toast.success('Logged out successfully!');
//     toast.success('Logged out successfully!', {
//       autoClose: 1500,
//     });
    
//     router.push('/login');
//   } catch (error) {
//     console.error('Logout error:', error);
//     toast.error('Logout failed');
//   }
// }, [router]);

//   // Context value
//   const value = {
//     token,
//     user,
//     role,
//     permissions,
//     isLoading,
//     isAuthenticated: !!token,
//     login,
//     logout,
//     register,
//     hasPermission,
//     hasRole,
//   };

//   // Loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




'use client';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

// Define available roles and their hierarchy
const ROLE_HIERARCHY = {
  SUPER_ADMIN: ['ADMIN', 'MANAGER', 'USER'],
  ADMIN: ['MANAGER', 'USER'],
  MANAGER: ['USER'],
  USER: []
};

// Define permission sets for each role
const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['all'],
  ADMIN: [
    'manage_users',
    'manage_employees',
    'manage_products',
    'manage_categories',
    'view_reports',
    'manage_settings'
  ],
  MANAGER: [
    'manage_employees',
    'manage_products',
    'view_reports'
  ],
  USER: [
    'view_products',
    'view_categories'
  ]
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('role');
        const storedPermissions = localStorage.getItem('permissions');

        if (storedToken) setToken(JSON.parse(storedToken));
        if (storedRefreshToken) setRefreshToken(JSON.parse(storedRefreshToken));
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedRole) setRole(JSON.parse(storedRole));
        if (storedPermissions) setPermissions(JSON.parse(storedPermissions));

        // Log user data to console for debugging
        console.log('Loaded user data:', {
          user: JSON.parse(storedUser || 'null'),
          role: JSON.parse(storedRole || 'null'),
          permissions: JSON.parse(storedPermissions || 'null'),
          is_superuser: JSON.parse(storedUser || '{}')?.is_superuser || false
        });
      } catch (error) {
        console.error('Error loading auth state:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('permissions');
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // Check if user has permission
  const hasPermission = useCallback((requiredPermission) => {
    if (!role || !permissions) return false;
    
    // Super admin has all permissions
    if (user?.is_superuser || role === 'SUPER_ADMIN') return true;
    
    // Check if user has the specific permission
    return permissions.includes(requiredPermission);
  }, [role, permissions, user]);

  // Check if user has role
  const hasRole = useCallback((requiredRole) => {
    if (!role) return false;
    
    // Check if user has the exact role
    if (role === requiredRole) return true;
    
    // Check if user's role is higher in hierarchy
    const higherRoles = ROLE_HIERARCHY[role] || [];
    return higherRoles.includes(requiredRole);
  }, [role]);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      const response = await AxiosInstance.post('/users/login', credentials);
      
      // Handle intercepted 403 errors
      if (response.error) {
        toast.error(response.error.message);
        return { success: false };
      }
  
      const {
        access_token,
        refresh_token,
        user_id,
        username,
        email,
        is_superuser,
        role_name,
        permissions
      } = response.data;
  
      const userData = { 
        id: user_id,
        username,
        email,
        is_superuser: Boolean(is_superuser)
      };
  
      localStorage.setItem('token', JSON.stringify(access_token));
      localStorage.setItem('refreshToken', JSON.stringify(refresh_token));
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', JSON.stringify(role_name));
      localStorage.setItem('permissions', JSON.stringify(permissions));
  
      setToken(access_token);
      setRefreshToken(refresh_token);
      setUser(userData);
      setRole(role_name);
      setPermissions(permissions);
  
      // toast.success('Login successful!');
      toast.success('Login successful!', {
        autoClose: 1500,
      });
      router.push('/admindashboard');
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      // This will only catch non-403 errors now
      // toast.error('Login failed. Please try again later.');
      toast.success('Login failed. Please try again later.', {
        autoClose: 1500,
      });
      return { success: false };
    }
  }, [router]);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      const response = await AxiosInstance.post('/users/signup', userData);
      // toast.success('Registration successful! Please login.');
      toast.success('Registration successful! Please login.', {
        autoClose: 1500,
      });
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    try {
      // Log user data before logout for debugging
      console.log('Logging out user:', {
        user,
        role,
        permissions,
        is_superuser: user?.is_superuser || false
      });

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('permissions');

      setToken(null);
      setRefreshToken(null);
      setUser(null);
      setRole(null);
      setPermissions([]);

      // toast.success('Logged out successfully!');
      toast.success('Logged out successfully!', {
        autoClose: 1500,
      });
      
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  }, [router, user, role, permissions]);

  // Context value
  const value = {
    token,
    user,
    role,
    permissions,
    isLoading,
    isAuthenticated: !!token,
    isSuperuser: user?.is_superuser || false, // Direct access to superuser status
    login,
    logout,
    register,
    hasPermission,
    hasRole,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};