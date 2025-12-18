import React, { useState, useEffect } from "react";
import Restaurantcard,{withpromoted} from "./restaurantcard copy";
import dishes from "../../dishes.json";
import Searchnotavailable from "./Searchnotavailable";
import useOnlineStatus from "./useonlinestatus";

const PromotedRestro = withpromoted(Restaurantcard);

const Body = () => {
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const onlineStatus = useOnlineStatus();

    useEffect(() => { setFilteredDishes(dishes); }, []);

    if (!onlineStatus) return <h1 className="text-center mt-10 text-2xl">Offline... check connection.</h1>;

    return filteredDishes.length === 0 ? <Searchnotavailable/> : (
        <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row justify-center items-center p-6 bg-slate-800 gap-4">
                
                {/* Search Group */}
                <div className="flex w-full lg:w-auto gap-2">
                    <input 
                        type="text" 
                        placeholder="Search restaurants..." 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-grow lg:w-96 p-3 rounded-lg text-black outline-none focus:ring-2 ring-blue-400"
                    />
                    <button onClick={() => {
                        const filtered = dishes.filter(d => d.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredDishes(filtered);
                    }} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Search
                    </button>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => setFilteredDishes(dishes.filter(d => d.rating > 4.5))} className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500">Top Rated</button>
                    <button onClick={() => setFilteredDishes(dishes.filter(d => d.isPreferred))} className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500">Preferred</button>
                    <button onClick={() => setFilteredDishes(dishes)} className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500">Show All</button>
                </div>
            </div>
                
            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
                {filteredDishes.map((dish) => (
                    dish.isPromoted ? (
                        <PromotedRestro key={dish.id} restaurant={dish} />
                    ) : (
                        <Restaurantcard key={dish.id} restaurant={dish} />
                    )
                ))}
            </div>
        </div>
    );
};
export default Body;
