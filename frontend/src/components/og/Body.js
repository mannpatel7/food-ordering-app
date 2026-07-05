import React, { useState, useEffect } from "react";
import Restaurantcard,{withp} from "./restaurantcard";
import dishes from "../../../dishes.json";
import Shimmer from "../shimmer";
import useOnlineStatus from "../useonlinestatus";

const Body = () => {
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleTopRated = () => {
        const topRated = dishes.filter(dish => dish.rating > 4.5);
        setFilteredDishes(topRated);
    };

    const handleAllDishes = () => {
        setFilteredDishes(dishes);
    };

    const handlePrefered = () => {
        const preferedDishes = dishes.filter(dish => dish.isPreferred);
        setFilteredDishes(preferedDishes);
    };

    useEffect(() => {
        setFilteredDishes(dishes);
    }, []);

    const onlinestatus=useOnlineStatus();

    if(onlinestatus===false)
        return(
            <h1>OOPs!! it seems You are offline</h1>
        )

    return filteredDishes.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="search">
                <input 
                    type="text" 
                    placeholder="search for restaurants" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <button onClick={() => {
                    const filtered = dishes.filter((dish) =>
                        dish.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                    setFilteredDishes(filtered);
                }}>
                    Search
                </button>

                <button className="filter-btn" onClick={handleTopRated}>Top Rated</button>
                <button className="filter-btn" onClick={handlePrefered}>Prefered</button>
                <button className="filter-btn" onClick={handleAllDishes}>All Restaurant</button>
            </div>

            <div className="res-container">
    {filteredDishes.map((dish) => (
        <Restaurantcard key={dish.id} restaurant={dish} />
    ))}
</div>

        </div>
    );
};

export default Body;
