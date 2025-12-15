import React, { useEffect } from 'react';

export const LockerScript: React.FC = () => {
  useEffect(() => {
    const existingScript = document.getElementById('ogjs');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'ogjs';
      script.type = 'text/javascript';
      // Add timestamp to bypass cache
      script.src = `https://www.craftgaminghub.xyz/cl/js/82dk53?v=${Date.now()}`;
      script.async = true;
      script.setAttribute('data-cfasync', 'false'); 
      
      document.body.appendChild(script);
      
      script.onload = () => {
        console.log("Content Locker Script Loaded Successfully");
        // Ensure error flag is cleared on success
        if (window.og_block) window.og_block = undefined;
      };
      
      script.onerror = () => {
         // Silently handle the error in console, but set a flag for the UI to read
         console.warn("Locker script could not be loaded (likely AdBlock).");
         window.og_block = true;
      };
    }
  }, []);

  return null;
};