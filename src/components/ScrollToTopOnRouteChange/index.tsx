   // src/components/ScrollToTopOnRouteChange.tsx
   import { usePathname } from 'next/navigation';
   import { useEffect } from 'react';

   const ScrollToTopOnRouteChange = () => {
     const pathname = usePathname();

     useEffect(() => {
       window.scrollTo(0, 0);
     }, [pathname]);

     return null;
   };

   export default ScrollToTopOnRouteChange;