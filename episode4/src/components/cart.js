import { useAppContext } from "../context/appcontext";
import axios from "axios";
import CategoryAccordion from "./catagory";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, user, setCartItems } = useAppContext();
  const baseUrl = "http://localhost:5000/api";
  const navigate = useNavigate();

  const handleclear = async () => {
    try {

      await axios.delete(`${baseUrl}/cart/clear`, {
        data: { userid: user._id }
      });

      toast.success("Cart cleared successfully");
      setCartItems([]);

    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  // calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Your Cart 🛒
        </h1>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (

          <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow text-center">

            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Add some delicious food to get started 🍔
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              Browse Restaurants
            </button>

          </div>

        ) : (

          <>
           
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700">

              <CategoryAccordion
                category="Cart Items"
                items={cartItems}
              />

            </div>

            
            <div className="bg-white dark:bg-slate-800 mt-6 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700">

              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white">
                <span>Total Price</span>
                <span>₹{totalPrice}</span>
              </div>

              
              <div className="flex gap-4 mt-6">

                <button
                  onClick={handleclear}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Clear Cart
                </button>

                <button
                  onClick={() => navigate("/checkout")}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                >
                  Place Order
                </button>

              </div>

            </div>

          </>
        )}

      </div>

    </div>

  );
};

export default Cart;