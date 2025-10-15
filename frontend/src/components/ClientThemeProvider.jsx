// // components/ClientThemeProvider.jsx
// "use client";

// import { ThemeProvider } from '@/components/ThemeContext';

// export default function ClientThemeProvider({ children }) {
//   return <ThemeProvider>{children}</ThemeProvider>;
// }



// components/ClientThemeProvider.jsx
// 'use client';
// import { ThemeProvider } from '@/components/ThemeContext';

// export default function ClientThemeProvider({ children }) {
//   return (
//     <ThemeProvider>
//       {children}
//     </ThemeProvider>
//   );
// }




'use client';
import { ThemeProvider } from '@/components/ThemeContext';
import { Suspense } from 'react';

export default function ClientThemeProvider({ children }) {
  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading theme...</div>}>
        {children}
      </Suspense>
    </ThemeProvider>
  );
}
