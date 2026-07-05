//only export one thing
//for multiple exports use named exports
//for importing named exports use curly braces
//import {x,y} from "module"

import "../index4.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";

import Header from "./components/Headercopy";
import Body from "./components/Bodycopy";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Cart from "./components/cart";
import Login from "./components/Login";

import Restaurantmenue from "./components/restaurantmenuecopy";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import { AppProvider } from "./context/appcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile.js";
import SignUp from "./components/SignUp.js";
import Checkout from "./components/Checkout.js";
import Orders from "./components/Order.js";
import Addresses from "./components/Addresses.js";
import Payments from "./components/Payments.js";
import Help from "./components/Help.js";

import OwnerLayout from "./components/restroowner/OwnerLayout.js";
import OrdersPage from "./components/restroowner/OrdersPage.js";
import RestrosPage from "./components/restroowner/RestrosPage.js";
import AddRestaurantPage from "./components/restroowner/AddRestaurantPage.js";
import MenuManagerPage from "./components/restroowner/MenuManagerPage.js";
import AdminLayout from "./components/admin/AdminLayout.js";
import AdminDashboard from "./components/admin/AdminDashboard.js";
import RestaurantRequests from "./components/admin/RestaurantRequests.js";
//Chunking or code splitting or lazy loading  
//Lazy loading Grocery component


const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <AppProvider>
        <div className="app min-h-screen bg-orange-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
          <Header />
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            theme="colored"
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            toastStyle={{
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "14px"
            }}
          />
        </div>
      </AppProvider>
    </Provider>
  );
};
const appRouter = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "restaurant/:id",
        element: <Restaurantmenue />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "addresses",
        element: (
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: "help",
        element: (
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "owner",
        element: (
          <ProtectedRoute role="owner">
            <OwnerLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <OrdersPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "restaurants",
            element: <RestrosPage />,
          },
          {
            path: "add",
            element: <AddRestaurantPage />,
          },
          {
            path: "restaurants/:id/menu",
            element: <MenuManagerPage />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "approve", element: <RestaurantRequests /> },
        ],
      },
    ],
    errorElement: <Error />,
  },
]);


const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
