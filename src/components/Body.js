import React, { useEffect, useState,useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";



const Body = () => {
   // State Variable - Super Powerful Variable 
   const [listOfRestaurants, setListOfRestaurants]  = useState([]);
   const [filteredRestaurant, setFilteredRestaurant] = useState([]); 
  //  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromted = withPromotedLabel(RestaurantCard);

   useEffect(() => {
    fetchData();
   }, []);

   const fetchData = async () => {
    try {
      const data = await fetch(
        
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.528913&lng=73.87441989999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      
      
      
      // Find the correct card that contains restaurant data
      const restaurantCard = json?.data?.cards?.find(
        card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
      // setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } 
   
   };
   
   const onlineStatus = useOnlineStatus();

   if(onlineStatus === false){
    return(
       <h1>Looks Like You're Offline!! Please Check Your Internet Connection</h1>
    );
   };

   const {loggedInUser,setUserName} = useContext(UserContext);
    

return listOfRestaurants.length === 0 ? (
 <Shimmer/> 
) : (
      <div className="max-w-[1400px] mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="search w-full sm:w-auto mb-4 sm:mb-0">
            <div className="flex">
              <input 
                type="text" 
                className="w-full sm:w-[350px] px-4 py-2 rounded-l-full border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-colors duration-200" 
                placeholder="Search for restaurants..." 
                value={searchText} 
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button 
                className="px-6 py-2 bg-orange-500 text-white rounded-r-full hover:bg-orange-600 transition-colors duration-200"
                onClick={() => {
                  console.log(searchText);
                  const filteredRestaurant = listOfRestaurants.filter((res) => 
                    res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="filter">
            <button 
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              onClick={() => {
                const filteredList = listOfRestaurants.filter((res) => res?.info?.avgRating > 4.5);
                setFilteredRestaurant(filteredList);
              }}
            >
              <span className="material-icons-outlined text-yellow-500">star</span>
              Top Rated Restaurants
            </button>
          </div>
          <div className="">
            <label>UserName: </label>
            <input className="border border-black p-2" value={loggedInUser} onChange={(e)=> setUserName(e.target.value)}/>

          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {
            filteredRestaurant.map((restaurant) => (
              <Link 
                key={restaurant?.info?.id} 
                to={"/restaurants/" + restaurant?.info?.id}
              >
                {restaurant?.info?.promoted ? (
                  <RestaurantCardPromted resData={restaurant?.info} />
                ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
        </Link>
             ) )
          }
        </div>
      </div>
    );
  };

  export default Body;