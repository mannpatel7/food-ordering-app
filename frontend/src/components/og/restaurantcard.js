 import { Link } from "react-router-dom";

const Restaurantcard = ({ restaurant }) => {
    return (
        <Link to={`/restaurant/${restaurant.id}`} className="rest-card">
            <div className="dish-card">
                <div className="dish-image">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="dish-rating">★ {restaurant.rating}</div>
                </div>
                <div className="dish-info">
                    <h3 className="dish-name">{restaurant.name}</h3>
                    <p className="dish-cuisine">{restaurant.cuisine}</p>
                    <p className="dish-cost">Cost for Two: ₹{restaurant.costForTwo}</p>
                </div>
            </div>
        </Link>
    );
};

export default Restaurantcard;


//export const Restaurantcard;
//only export one thing
//for multiple exports use named exports
//export const x=10;
//for importing named exports use curly braces
//import {x,y} from "module"