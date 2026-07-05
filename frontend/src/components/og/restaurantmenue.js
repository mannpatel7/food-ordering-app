import { useState } from "react";
import { useParams } from "react-router-dom";
import menue from "../../../menue.json";
import rest from "../../../dishes.json";

const Restaurantmenue = () => {
    const { id } = useParams(); // get dynamic restaurant ID from URL

    const [menuItems] = useState(
        menue.filter((item) => item.restaurantId === Number(id)) // filter by restaurant
    );

    const restaurant = rest.find((r) => r.id === Number(id)) || {};

    return (
        <div className="menu-page bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <header className="menu-header p-4 border-b border-gray-200 dark:border-slate-700">
                <div className="menu-title-row">
                    <h2 className="restaurant-name text-xl font-semibold">{restaurant.name || "Restaurant"}</h2>
                    <div className="restaurant-meta text-sm text-gray-600 dark:text-gray-300">
                        {restaurant.cuisine && <span className="cuisine">{restaurant.cuisine}</span>}
                        <span className="rating">{restaurant.rating ? ` • ⭐ ${restaurant.rating}` : ""}</span>
                    </div>
                </div>
                {restaurant.description && (
                    <p className="restaurant-desc mt-2 text-gray-700 dark:text-gray-300 p-2">{restaurant.description}</p>
                )}
            </header>

            <h3 className="section-title px-4 py-3 text-lg font-medium">Menu</h3>

            {menuItems.length === 0 ? (
                <p className="empty px-4 py-3 text-gray-600 dark:text-gray-300">No menu available for this restaurant.</p>
            ) : (
                <div className="menu-grid p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {menuItems.map((item) => (
                        <article className="menu-card bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg overflow-hidden" key={item.id}>
                            <div
                                className="menu-image h-40 bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.image})` }}
                                aria-hidden="true"
                            />
                            <div className="menu-content p-3">
                                <div className="menu-top flex justify-between items-start">
                                    <h4 className="menu-name font-medium">{item.name}</h4>
                                    <div className="menu-category text-sm text-gray-500 dark:text-gray-300">{item.category}</div>
                                </div>
                                <div className="menu-desc mt-2 flex items-center gap-2">
                                    <span className={item.isVeg ? "veg-badge inline-block px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800" : "nonveg-badge inline-block px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800"}>
                                        {item.isVeg ? "VEG" : "NON-VEG"}
                                    </span>
                                </div>
                                <div className="menu-bottom mt-4 flex items-center justify-between">
                                    <span className="menu-price font-semibold">₹{Math.round(item.price*100)}</span>
                                    <button className="add-btn px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Add</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Restaurantmenue;
