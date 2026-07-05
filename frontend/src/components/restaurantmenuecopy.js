import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CategoryAccordion from "./catagory";
import RestaurantMap from "./restaurantmap";
import axios from "axios";

const Restaurantmenue = () => {
  const { id } = useParams();
  const [menue, setMenue] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const baseUrl = "/api";

 const fetchMenue = async (id) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/restaurant/${id}/menu`
    );

    if (data.success) {
      setMenue(data.menue);

      if (data.menue.length > 0) {
        setRestaurant(data.menue[0].restaurantId);
      }
    }
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};
console.log("Restaurant Menu:", menue);
console.log("Restaurant Details:", restaurant);
  useEffect(() => {
    if (id) {
      fetchMenue(id);
    }
  }, [id]);

  
  const groupedMenu = menue.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="pt-6 pr-4 pb-12 pl-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
  {restaurant?.image ? (
    <img
      src={restaurant.image}
      alt={restaurant.name || "Restaurant"}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600" />
  )}

  <div className="absolute inset-0 bg-black/40"></div>


  <div className="absolute bottom-4 left-6 text-white">
    <h2 className="text-3xl font-bold">{restaurant?.name}</h2>
    <p className="text-sm opacity-90">Explore our delicious menu</p>
  </div>
</div>
      

      {menue.length === 0 ? (
        <p>No menu available for this restaurant.</p>
      ) : (
        Object.entries(groupedMenu).map(([category, items]) => (
          <CategoryAccordion
            key={category}
            category={category}
            items={items}
          />
        ))
      )}

      {restaurant && (
        <RestaurantMap mapEmbed={restaurant.mapEmbed} />
      )}

      <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Foodie's Paradise.
      </footer>
    </div>
  );
};

export default Restaurantmenue;
