import React, { useState, useEffect } from "react";
import Restaurantcard,{withpromoted} from "./restaurantcard copy";
import Loading from "./Loading";
// import dishes from "../../dishes.json";
import Searchnotavailable from "./Searchnotavailable";
import useOnlineStatus from "./useonlinestatus";
import { useAppContext } from "../context/appcontext";

const PromotedRestro = withpromoted(Restaurantcard);

const Body = () => {
    const { restaurant } = useAppContext();
    const [filteredRestro, setFilteredRestro] = useState([]);
    const [searchText, setSearchText] = useState("");
    const onlineStatus = useOnlineStatus();

    useEffect(() => { setFilteredRestro(restaurant); }, [restaurant]);

    if (!restaurant || restaurant.length === 0) {
    return <Loading />;
}

if (filteredRestro.length === 0) {
    return <Searchnotavailable />;
}

    return(
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
                        const filtered = restaurant.filter(d => d.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredRestro(filtered);
                    }} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Search
                    </button>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => setFilteredRestro(restaurant.filter(d => d.rating > 4.5))} className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500">Top Rated</button>
                    <button onClick={() => setFilteredRestro(restaurant.filter(d => d.isPreferred))} className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500">Preferred</button>
                    <button onClick={() => setFilteredRestro(restaurant)} className="px-4 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500">Show All</button>
                </div>
            </div>
                
            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
                {filteredRestro.map((restro) => (
                    restro.isPromoted ? (
                        <PromotedRestro key={restro._id} restaurant={restro} />
                    ) : (
                        <Restaurantcard key={restro._id} restaurant={restro} />
                    )
                ))}
            </div>
        </div>
    );
};
export default Body;
