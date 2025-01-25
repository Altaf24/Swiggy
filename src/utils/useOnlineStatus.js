import React, { useState } from 'react';
import { useEffect } from 'react';

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(true);
  // Check if online or offline
  useEffect(() => {
    window.addEventListener("offline", () => {
      console.log("Offline");
      setOnlineStatus(false);
      });
      
    window.addEventListener("online", () => {
      console.log("Online");
      setOnlineStatus(true);
      });

    

  }, [])

  return onlineStatus;

}

export default useOnlineStatus
