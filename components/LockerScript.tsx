import React, { useEffect } from 'react';

export const LockerScript: React.FC = () => {
  useEffect(() => {
    const existingScript = document.getElementById('ogjs');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'ogjs';
      script.type = 'text/javascript';
      script.src = 'https://www.craftgaminghub.xyz/cl/js/82dk53';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        console.log("Content Locker Script Loaded Successfully");
      };
    }
  }, []);

  return null; // This component does not render anything visible
};
