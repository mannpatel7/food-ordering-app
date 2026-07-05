import { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");

 const { user, setCartItems } = useAppContext();

  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  

  const navigate = useNavigate();

  const handleOrder = async () => {
    
    try {

      if (!address) {
        toast.error("Please enter delivery address");
        return;
      }

      if (payment === "cod") {

        const res = await axios.post(`${baseUrl}/order/create`, {
          user: user._id,
          paymentMethod: "cod",
          deliveryAddress: address
        });
        setCartItems([]);
        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/order");
        }, 1500);

      }

      else {

        const { data } = await axios.post(
          `${baseUrl}/payment/create`,
          { user: user._id }
        );

        const options = {

          key: data.key,

          amount: data.razorpayOrder.amount,

          currency: "INR",

          name: "Mr Food",

          description: "Food Order Payment",

          order_id: data.razorpayOrder.id,

          handler: async function (response) {

  const verify = await axios.post(`${baseUrl}/payment/verify`, {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature
  });

  if (verify.data.success) {

    await axios.post(`${baseUrl}/order/create`, {
      user: user._id,
      paymentMethod: "razorpay",
      deliveryAddress: address
    });

    setCartItems([]);
    toast.success("Payment Successful 🎉");
    navigate("/order");

  } else {
    toast.error("Payment verification failed ❌");
  }
},

prefill: {
  name: user?.name,
  email: user?.email
},
  theme: {
            color: "#f97316"
          }

};

        const razor = new window.Razorpay(options);


razor.on("payment.failed", function (response) {
  console.log("Payment Failed:", response.error);
  toast.error("Payment Failed ❌");
});

razor.open();

      }

    } catch (error) {

      console.log(error);

      toast.error("Payment failed");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-slate-900 p-4 transition-colors">

      <div className="w-full max-w-lg bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 border border-gray-200 dark:border-slate-700">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Checkout 🧾
        </h2>

        {/* Address */}

        <div className="mb-5">

          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Delivery Address
          </label>

          <textarea
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address..."
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

        </div>

        {/* Payment Method */}

        <div className="mb-6">

          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Payment Method
          </label>

          <div className="mt-3 space-y-3">

            {/* COD */}

            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer 
            ${payment === "cod"
              ? "border-green-500 bg-green-50 dark:bg-green-900/30"
              : "border-gray-200 dark:border-slate-600"}`}>

              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />

              <span className="text-gray-800 dark:text-white font-medium">
                Cash on Delivery
              </span>

            </label>


            {/* Razorpay */}

            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer 
            ${payment === "razorpay"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "border-gray-200 dark:border-slate-600"}`}>

              <input
                type="radio"
                name="payment"
                value="razorpay"
                onChange={(e) => setPayment(e.target.value)}
              />

              <span className="text-gray-800 dark:text-white font-medium">
                Online Payment (UPI / Card / Wallet)
              </span>

            </label>

          </div>

        </div>

        {/* Button */}

        <button
          onClick={handleOrder}
          className="w-full py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition"
        >
          Place Order 🍔
        </button>

      </div>

    </div>

  );

};

export default Checkout;