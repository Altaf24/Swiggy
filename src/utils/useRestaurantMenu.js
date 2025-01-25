import React from 'react';
import { useState,useEffect } from 'react';

import { MENU_API } from './constants';

const useRestaurantMenu = (resId) => {
    const [resInfo,setResInfo] = useState(null);
    // FetchData
    useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async () =>{
    try {
      const data = await fetch(MENU_API + resId );
      const json = await data.json();
      console.log("Restaurant Data:", json);
      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  return resInfo;
}

export default useRestaurantMenu;
