 import { Link } from "react-router-dom";

const Restaurantcard = ({ restaurant }) => {
    return (
        <Link to={`/restaurant/${restaurant._id}`} className="rest-card">
            <div className=" rounded-lg bg-gray-300 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-slate-800">
                <div className=" relative h-[160px]">
                    <img src={restaurant.image} alt={restaurant.name}  className="w-[100%] h-[100%] object-cover block transition-transform 200ms ease-in"/>
                    <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full" >★ {restaurant.rating}</div>
                </div>
                <div className="mt-4 p-2 flex flex-col gap-2 dark:text-white">
                    <h3 className="m-0 font-bold text-lg">{restaurant.name}</h3>
                    <p className="m-0  text-sm">{restaurant.cuisine}</p>
                    <p className="dish-cost">Cost for Two:<span className="font-bold">₹{restaurant.costForTwo}</span> </p>
                </div>
            </div>
        </Link>
    );
};

 export const withpromoted=(Restaurantcard)=>{
    return(props)=>{
        return(
            <div>
                <div className="bg-red-500 text-white absolute z-10 rounded-md p-2">Promoted</div>
                <Restaurantcard {...props} />
            </div>
        )
    }
}

export default Restaurantcard;


//export const Restaurantcard;
//only export one thing
//for multiple exports use named exports
//export const x=10;
//for importing named exports use curly braces
//import {x,y} from "module"