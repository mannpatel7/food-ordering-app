import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/appcontext";

const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Preparing: "bg-orange-100 text-orange-700",
  "Out for Delivery": "bg-violet-100 text-violet-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {

  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);

  const baseUrl = "http://localhost:5000/api";

  useEffect(() => {

    const fetchOrders = async () => {
      try {

        const res = await axios.get(`${baseUrl}/order/${user._id}`);
        console.log(res.data.order)
       setOrders(res.data.order || []);

      } catch (error) {
        console.log(error);
      }
    };

    if (!user?._id) return;

    fetchOrders();
    const refreshTimer = setInterval(fetchOrders, 5000);

    return () => clearInterval(refreshTimer);

  }, [user?._id]);

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Your Orders 🍔
      </h1>

      {orders.length === 0 ? (

        <div className="text-center text-gray-600 dark:text-gray-300">
          No orders yet
        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-700"
            >

              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">

                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Order ID
                  </p>

                  <p className="text-sm text-gray-500">
                    {order._id}
                  </p>
                </div>

                <div className="text-right">

                  <p className="font-bold text-lg text-green-600">
                    ₹{order.totalAmount}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.paymentMethod}
                  </p>

                </div>

              </div>

              {/* Items */}
              <div className="border-t pt-4 space-y-3">

  {order.items.map((item) => {

    const menu = item.menuItem;

    return (

      <div
        key={item._id}
        className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 p-3 rounded-lg"
      >

        {/* Left side */}
        <div className="flex items-center gap-3">

          {menu?.image ? (
            <img
              src={menu.image}
              alt={menu.name || "Menu item"}
              className="w-14 h-14 object-cover rounded-md"
            />
          ) : (
            <div
              className="w-14 h-14 rounded-md bg-gray-200 dark:bg-slate-600"
              aria-hidden="true"
            />
          )}

          <div>

            <p className="font-semibold text-gray-800 dark:text-white">
              {menu?.name || "Item"}
            </p>

            <p className="text-sm text-gray-500">
              Quantity: {item.quantity}
            </p>

          </div>

        </div>

        {/* Price */}
        <span className="font-semibold text-gray-700 dark:text-white">
          ₹{item.priceAtOrderTime * item.quantity}
        </span>

      </div>

    );

  })}

</div>

              {/* Footer */}
              <div className="border-t mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">

                <span>
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-500 dark:text-gray-300">
                    Payment: {order.paymentStatus}
                  </span>
                  <span className={`rounded-full px-3 py-1 font-semibold ${STATUS_STYLES[order.status] || STATUS_STYLES.Pending}`}>
                    {order.status || "Pending"}
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default Orders;

