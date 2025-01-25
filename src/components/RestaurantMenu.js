import React from 'react'
import { useState,useEffect } from 'react';
import Shimmer  from './Shimmer';
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/constants';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
  // const [resInfo,setResInfo] = useState(null);

  const { resId } = useParams();  // Destructure resId from params

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);



 

  // Return Shimmer UI while data is loading
  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {};
  
  const itemCardsContainer = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
    card => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  
  const itemCards = itemCardsContainer?.card?.card?.itemCards || [];
  
  const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=> c.card?.card?.["@type"]=== "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");  
  

  return (
    <div className="text-center">
      <h1 className=" font-bold my-6 text-2xl">{name}</h1>
      <p className='font-bold text-lg'>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordians */}
      {
        categories.map((category,index) => 
        <RestaurantCategory
         key={category?.card?.card?.title} 
         data={category?.card?.card}
         showItems={index === showIndex ? true : false}
         setShowIndex={() => setShowIndex(index)}
        />)


      }
     </div> 

  );
    
}

export default RestaurantMenu;