import { useEffect, useState } from "react";
import { useAppContext } from "../context/appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryAccordion = ({ category, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, setCartItems,cartItems,getCartItems } = useAppContext();
  const baseUrl = "/api";

  const handleAddItems = async (item) => {
    try {
      const res = await axios.post(`${baseUrl}/cart/add`, {
        user: user._id,
        items: [{ menuItem: item._id, quantity: 1 }]
      });

      toast.success(item.name + " added to cart" );
      getCartItems();

    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  

  const handlermvItems = async (item) => {
    try {
      const res = await axios.delete(`${baseUrl}/cart/remove`, {
        data: {
          user: user._id,
          menuItem: item._id
        }
      });
      toast.success(item.name + " removed from cart");
      getCartItems();

    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(()=>{
    if(user){
      getCartItems();
    }
    
   }, [])
  

  return (
    <div className="rounded-lg mb-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">

      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg"
      >
        <span className="text-lg font-bold">{category}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Body */}
      <div
  className={`transition-all duration-500 ease-in-out overflow-y-auto
  ${isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-slate-700">

       {items.filter(Boolean).map((item) => {

  const menu = item.menuItem ?? item;

  // find item in cart
  const cartItem = cartItems?.find(
    (ci) => (ci.menuItem?._id || ci.menuItem) === menu._id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div
      key={menu._id}
      className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 border border-gray-100 dark:border-slate-700"
    >

      {menu.image ? (
        <img
          src={menu.image}
          alt={menu.name || "Menu item"}
          className="h-32 w-full object-cover rounded"
        />
      ) : (
        <div
          className="h-32 w-full grid place-items-center rounded bg-gray-100 text-sm text-gray-500 dark:bg-slate-700 dark:text-gray-300"
          aria-label="No menu item image available"
        >
          No image available
        </div>
      )}
      <h4 className="font-bold mt-2">{menu.name}</h4>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={`text-xs px-2 py-1 rounded text-white
          ${menu.isVeg ? "bg-green-700" : "bg-red-700"}`}
        >
          {menu.isVeg ? "VEG" : "NON-VEG"}
        </span>
      </div>

      <div className="flex justify-between items-center mt-2">

        <span className="font-bold">₹{menu.price}</span>

        {quantity === 0 ? (

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => handleAddItems(menu)}
          >
            Add
          </button>

        ) : (

          <div className="flex items-center gap-2">

            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => handlermvItems(menu)}
            >
              -
            </button>

            <span className="font-bold">{quantity}</span>

            <button
              className="bg-green-500 text-white px-2 rounded"
              onClick={() => handleAddItems(menu)}
            >
              +
            </button>

          </div>

        )}

      </div>

    </div>
  );
})}

        </div>
      </div>

    </div>
  );
};

export default CategoryAccordion;
