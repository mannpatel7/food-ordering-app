//only export one thing
//for multiple exports use named exports
//for importing named exports use curly braces
//import {x,y} from "module"

import "../index4.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { lazy,Suspense } from "react";
import Header from "./components/Headercopy";
import Body from "./components/Bodycopy";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Cart from "./components/cart";

import Restaurantmenue from "./components/restaurantmenuecopy";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
//Chunking or code splitting or lazy loading
//Lazy loading Grocery component


const AppLayout= ()=> {
    return(
      <Provider store={appStore}>
        <div className="app">
            <Header />
            <Outlet />
        </div>
      </Provider>
    )      
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
        element: <Restaurantmenue />, // Placeholder for restaurant dishes
      },
      {
        path:"cart",
        element:<Cart />,
      }
    ],
    errorElement: <Error />,
  },
]);


const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
