// // components/ThemeContext.jsx
// "use client";

// import { createContext, useContext, useState } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.setAttribute(
//       'data-theme',
//       !isDarkMode ? 'bw' : 'light'
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };




// // components/ThemeContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [isLoading, setIsLoading] = useState(true);

//   // Helper: read cookie
//   const getCookie = (name) => {
//     if (typeof document === 'undefined') return null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.trim().split('=');
//       if (cookieName === name) {
//         return decodeURIComponent(cookieValue);
//       }
//     }
//     return null;
//   };

//   // Initialize from cookie
//   useEffect(() => {
//     const initializeTheme = async () => {
//       try {
//         setIsLoading(true);
//         const cookieTheme = getCookie('user_theme');
//         setTheme(cookieTheme || 'dark');
//       } catch (error) {
//         console.error('Error initializing theme:', error);
//         setTheme('dark');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeTheme();
//   }, []);

//   // Apply theme to root element
//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       document.documentElement.setAttribute('data-theme', theme);
//     }
//   }, [theme]);

//   const toggleTheme = async (newTheme) => {
//   const nextTheme =
//     newTheme ||
//     (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');

//   const oldTheme = theme;
//   setTheme(nextTheme);

//   try {
//     await AxiosInstance.post('/user/set-theme/', new URLSearchParams({ theme: nextTheme }));
//     // Optional: set cookie manually if backend doesn't
//     document.cookie = `user_theme=${nextTheme}; path=/`;
//   } catch (error) {
//     console.error('Error saving theme:', error);
//     setTheme(oldTheme);
//   }
// };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };




// components/ThemeContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import AxiosInstance from '@/components/AxiosInstance';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [isLoading, setIsLoading] = useState(true);

//   // Helper: read cookie
//   const getCookie = (name) => {
//     if (typeof document === 'undefined') return null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.trim().split('=');
//       if (cookieName === name) {
//         return decodeURIComponent(cookieValue);
//       }
//     }
//     return null;
//   };

//   // Initialize theme from cookie
//   useEffect(() => {
//     const initializeTheme = () => {
//       try {
//         const cookieTheme = getCookie('user_theme');
//         setTheme(cookieTheme || 'dark');
//       } catch (error) {
//         console.error('Error initializing theme:', error);
//         setTheme('dark');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initializeTheme();
//   }, []);

//   // Apply theme to <html> tag
//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       document.documentElement.classList.remove('dark', 'light', 'bw');
//       document.documentElement.classList.add(theme);
//       document.documentElement.setAttribute('data-theme', theme); // optional, if your CSS uses data-theme
//     }
//   }, [theme]);

//   const toggleTheme = async (newTheme) => {
//     const nextTheme =
//       newTheme ||
//       (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');

//     const previousTheme = theme;
//     setTheme(nextTheme);

//     try {
//       await AxiosInstance.post('/set-theme', new URLSearchParams({ theme: nextTheme }));
//       // Optional: force-set cookie if backend doesn't set it
//       document.cookie = `user_theme=${nextTheme}; path=/`;
//     } catch (error) {
//       console.error('Error saving theme:', error);
//       setTheme(previousTheme);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading theme...</div>;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };




// // components/ThemeContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import AxiosInstance from '@/components/AxiosInstance';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [isLoading, setIsLoading] = useState(true);

//   const getCookie = (name) => {
//     if (typeof document === 'undefined') return null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.trim().split('=');
//       if (cookieName === name) {
//         return decodeURIComponent(cookieValue);
//       }
//     }
//     return null;
//   };

//   // Initialize theme from cookie
//   useEffect(() => {
//     const initializeTheme = () => {
//       try {
//         const cookieTheme = getCookie('admin_theme'); // Changed to admin_theme
//         setTheme(cookieTheme || 'dark');
//       } catch (error) {
//         console.error('Error initializing theme:', error);
//         setTheme('dark');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initializeTheme();
//   }, []);

//   // Apply theme only to admin container
//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       const adminContainer = document.getElementById('admin-container');
//       if (adminContainer) {
//         adminContainer.classList.remove('dark', 'light', 'bw');
//         adminContainer.classList.add(theme);
//         adminContainer.setAttribute('data-theme', theme);
//       }
//     }
//   }, [theme]);

//   const toggleTheme = async (newTheme) => {
//     const nextTheme =
//       newTheme ||
//       (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');

//     const previousTheme = theme;
//     setTheme(nextTheme);

//     try {
//       await AxiosInstance.post('/set-admin-theme', new URLSearchParams({ theme: nextTheme }));
//       document.cookie = `admin_theme=${nextTheme}; path=/`;
//     } catch (error) {
//       console.error('Error saving theme:', error);
//       setTheme(previousTheme);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading theme...</div>;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
//       <div id="admin-container">
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };





// components/ThemeContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import AxiosInstance from '@/components/AxiosInstance';

// const ThemeContext = createContext(null); // <- Add default null

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [isLoading, setIsLoading] = useState(true);

//   const getCookie = (name) => {
//     if (typeof document === 'undefined') return null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.trim().split('=');
//       if (cookieName === name) {
//         return decodeURIComponent(cookieValue);
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     const initializeTheme = () => {
//       try {
//         const cookieTheme = getCookie('admin_theme');
//         setTheme(cookieTheme || 'dark');
//       } catch (error) {
//         console.error('Error initializing theme:', error);
//         setTheme('dark');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initializeTheme();
//   }, []);

//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       const adminContainer = document.getElementById('admin-container');
//       if (adminContainer) {
//         adminContainer.classList.remove('dark', 'light', 'bw');
//         adminContainer.classList.add(theme);
//         adminContainer.setAttribute('data-theme', theme);
//       }
//     }
//   }, [theme]);

//   const toggleTheme = async (newTheme) => {
//     const nextTheme =
//       newTheme ||
//       (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');

//     const previousTheme = theme;
//     setTheme(nextTheme);

//     try {
//       await AxiosInstance.post('/set-admin-theme', new URLSearchParams({ theme: nextTheme }));
//       document.cookie = `admin_theme=${nextTheme}; path=/`;
//     } catch (error) {
//       console.error('Error saving theme:', error);
//       setTheme(previousTheme);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading theme...</div>;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
//       <div id="admin-container">
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// // ❌ Unsafe (keep if you're sure it's used inside ThemeProvider)
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// // ✅ Safe hook (optional use)
// export const useSafeTheme = () => {
//   try {
//     return useContext(ThemeContext);
//   } catch {
//     return null;
//   }
// };


// components/ThemeContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import AxiosInstance from '@/components/AxiosInstance';
// import { useTheme } from '@/components/ThemeContext';

// const ThemeContext = createContext(undefined); // use `undefined` to detect misuse

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [isLoading, setIsLoading] = useState(true);

//   const getCookie = (name) => {
//     if (typeof document === 'undefined') return null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.trim().split('=');
//       if (cookieName === name) {
//         return decodeURIComponent(cookieValue);
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     const initializeTheme = () => {
//       try {
//         const cookieTheme = getCookie('admin_theme');
//         setTheme(cookieTheme || 'dark');
//       } catch (error) {
//         console.error('Error initializing theme:', error);
//         setTheme('dark');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initializeTheme();
//   }, []);

//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       const adminContainer = document.getElementById('admin-container');
//       if (adminContainer) {
//         adminContainer.classList.remove('dark', 'light', 'bw');
//         adminContainer.classList.add(theme);
//         adminContainer.setAttribute('data-theme', theme);
//       }
//     }
//   }, [theme]);

//   const toggleTheme = async (newTheme) => {
//     const nextTheme =
//       newTheme || (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');

//     const previousTheme = theme;
//     setTheme(nextTheme);

//     try {
//       await AxiosInstance.post('/set-admin-theme', new URLSearchParams({ theme: nextTheme }));
//       document.cookie = `admin_theme=${nextTheme}; path=/`;
//     } catch (error) {
//       console.error('Error saving theme:', error);
//       setTheme(previousTheme);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading theme...</div>;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
//       <div id="admin-container">
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// // ❌ Strict version for admin-only components
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider (admin only)');
//   }
//   return context;
// };

// // ✅ Safe version for shared components
// export const useSafeTheme = () => {
//   const context = useContext(ThemeContext);
//   return context ?? null;
// };












// components/ThemeContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import AxiosInstance from '@/components/AxiosInstance';

// const ThemeContext = createContext(undefined);

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [isLoading, setIsLoading] = useState(true);

//   const getCookie = (name) => {
//     if (typeof document === 'undefined') return null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.trim().split('=');
//       if (cookieName === name) {
//         return decodeURIComponent(cookieValue);
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     const initializeTheme = () => {
//       try {
//         const cookieTheme = getCookie('admin_theme');
//         setTheme(cookieTheme || 'dark');
//       } catch (error) {
//         console.error('Error initializing theme:', error);
//         setTheme('dark');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initializeTheme();
//   }, []);

//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       const adminContainer = document.getElementById('admin-container');
//       if (adminContainer) {
//         adminContainer.classList.remove('dark', 'light', 'bw');
//         adminContainer.classList.add(theme);
//         adminContainer.setAttribute('data-theme', theme);
//       }
//     }
//   }, [theme]);

//   const toggleTheme = async (newTheme) => {
//     const nextTheme =
//       newTheme || (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');

//     const previousTheme = theme;
//     setTheme(nextTheme);

//     try {
//       await AxiosInstance.post(
//         '/set-admin-theme',
//         new URLSearchParams({ theme: nextTheme })
//       );
//       document.cookie = `admin_theme=${nextTheme}; path=/`;
//     } catch (error) {
//       console.error('Error saving theme:', error);
//       setTheme(previousTheme);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading theme...</div>;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
//       <div id="admin-container" className={theme}>
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// // Strict version (throws error if used outside provider)
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// // Safe version (returns null if no provider)
// export const useSafeTheme = () => {
//   return useContext(ThemeContext) ?? null;
// };

// // Optional: Default theme values for static fallback
// export const defaultTheme = {
//   theme: 'dark',
//   toggleTheme: () => console.warn('ThemeProvider not initialized'),
//   isLoading: false
// };



// components/ThemeContext.jsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import AxiosInstance from '@/components/AxiosInstance';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  // Get theme from cookie
  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  };

  // Initialize theme
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const cookieTheme = getCookie('admin_theme');
        setTheme(cookieTheme || 'dark');
      } catch (error) {
        console.error('Error initializing theme:', error);
        setTheme('dark');
      } finally {
        setIsLoading(false);
      }
    };
    initializeTheme();
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.cookie = `admin_theme=${theme}; path=/; max-age=31536000`; // 1 year
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = async (newTheme) => {
    const nextTheme = newTheme || 
      (theme === 'dark' ? 'bw' : theme === 'bw' ? 'light' : 'dark');
    
    try {
      await AxiosInstance.post('/set-admin-theme', { theme: nextTheme });
      setTheme(nextTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading theme...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useSafeTheme = () => useContext(ThemeContext) ?? { theme: 'dark', toggleTheme: () => {} };