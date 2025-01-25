import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({resData}) => {
    const {cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla} = resData;

    const {loggedInUser} = useContext(UserContext)
    
    return (
      <div className="w-full p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-200">
        <img 
          className="rounded-lg w-full h-[150px] object-cover" 
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
        <h3 className="font-bold  py-2 text-lg text-gray-800 truncate">{name}</h3>
        <h4 className="text-gray-600 text-sm truncate">{cuisines.join(", ")}</h4>
        <div className="flex items-center justify-between mt-4">
          <span className="flex items-center gap-1">
            <span className="text-green-600 font-semibold">{avgRating}</span>
            <span className="text-yellow-500">★</span>
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{sla.deliveryTime} mins</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{costForTwo}</span><br></br>
          <div className="flex empty:">
            <h3  className="text-gray-600">User :{loggedInUser}</h3>
            </div>
          
        </div>
      </div>
    );
  };

  // Higher Order Component
  // input - RestaurantCard => RestaurantCardPromted
  // output - RestaurantCard
 export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
      return (
        <div className="promoted-label">

          <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>

          <RestaurantCard {...props}/>
        </div>
      );
    };
  };

  
export default RestaurantCard;