import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../useonlinestatus";
import logo from "../mr_food_logo.png";



function Header() {
     const [btnname,setbtnname]=useState("login");
     const onlinestatus=useOnlineStatus();
    return (
        <header className="header">
            {/* <h1 className="text-red-500 text-3xl">Tailwind Test</h1> */}

            <div className="brand">
                <img src={logo} alt="logo" className="logo " />
                <h1 className="brand-title">Mr. food</h1>
            </div>

            <nav className="nav-items">
                <ul>
                    <li>
                        Online Status: {onlinestatus ? "✅" : "❌"}
                    </li>
                    <li>
                         <Link to="/">Home</Link></li> 
                    <li>
                        <Link to="/about">About Us</Link></li>
                    <li>
                        <Link to="/contact">Contact Us</Link></li>
                    <li>
                        <Link to="/grocery">Grocery</Link></li>
                    <li>Cart</li>
                </ul>
            </nav>
            <div className="actions">
                <button className="login-btn" onClick={() => {
                    if (btnname === "logout") {
                        setbtnname("login");
                    } else {
                        setbtnname("logout");
                    }
                }}>{btnname}</button>
            </div>
        </header>
    );
}
export default Header;
//only export one thing
//for multiple exports use named exports
//for importing named exports use curly braces
//import {x,y} from "module"