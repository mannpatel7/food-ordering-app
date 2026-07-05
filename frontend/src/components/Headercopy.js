import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { HomeIcon, CartIcon, SunIcon, MoonIcon } from "./Icons";
import axios from "axios";
import { useAppContext } from "../context/appcontext";
import { User, LogOut } from "lucide-react";



function Header() {
    const { isLoggedIn, setIsLoggedIn, user, setUser,cartItems,getCartItems } = useAppContext();
    const baseUrl = "/api";
    const [profileOpen, setProfileOpen] = useState(false);
const handleLogout = async () => {
  await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
  setUser(null);
  setIsLoggedIn(false);
  window.location.href = "/login";

};
  
    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
        } catch (e) {}
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
        try { localStorage.setItem('theme', theme); } catch(e){}
    }, [theme]);
    
    useEffect(() => {
  const handleClick = () => setProfileOpen(false);
  window.addEventListener("click", handleClick);
  return () => window.removeEventListener("click", handleClick);
}, []);

useEffect(() => {
    if(user){
        getCartItems();
    }}, [user])
    
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-md">
            
            
            <div className="flex items-center gap-3">
                <div className="h-16 w-16 md:h-24 md:w-24 overflow-hidden rounded-xl bg-sky-300 shadow-sm ring-1 ring-slate-300 dark:ring-slate-700">
                    <img
                        src="https://th.bing.com/th/id/OIP.AD3MTrrEwlonf3E-MggQ4AHaHa?w=165&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                        alt="Mr. Food logo"
                        className="h-full w-full scale-110 object-cover"
                    />
                </div>
                <h1 className="text-lg md:text-xl font-bold">Mr. Food</h1>
            </div>

            
            <div className="flex items-center gap-2 md:order-3">
                <button
                    onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-blue-400 transition-all"
                >
                    {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>

                <button
                    className="md:hidden p-2 rounded bg-gray-200 dark:bg-slate-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className={`${menuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:items-center mt-4 md:mt-0`}>
                <ul className="flex flex-col md:flex-row gap-4 md:gap-6 font-medium bg-gray-200 dark:bg-slate-800 md:bg-transparent p-4 md:p-0 rounded-lg">
                    <li className="hover:text-blue-500 transition-colors"><Link className="flex items-center gap-2" to="/"><HomeIcon className="w-4 h-4" /> Home</Link></li>
                    <li className="hover:text-blue-500 transition-colors"><Link to="/about">About</Link></li>
                    <li className="hover:text-blue-500 transition-colors"><Link to="/contact">Contact</Link></li>
                   {!isLoggedIn ? (
  <li>
    <Link
      to="/login"
      className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700"
    >
      Login
    </Link>
  </li>
) : (
  <li className="relative">
  <div
    onClick={(e) => {
  e.stopPropagation();
  setProfileOpen(!profileOpen);
}}
    className="flex items-center gap-2 bg-gray-300 dark:bg-slate-700 px-3 py-1 rounded-full cursor-pointer"
  >
    <User size={20} />
    <span className="font-semibold">{user?.name}</span>
  </div>

  {profileOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">

    {/* Common */}
    <Link
      to="/profile"
      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700"
    >
      Profile
    </Link>

    <Link
      to="/order"
      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700"
    >
      Orders
    </Link>

    {/* OWNER SECTION */}
    {user?.role === "owner" && (
      <>
        <hr className="border-gray-300 dark:border-slate-600" />
        <Link to="/owner" className="block px-4 py-2">
  📦 Orders
</Link>

<Link to="/owner/restaurants" className="block px-4 py-2">
  🏪 My Restaurants
</Link>

<Link to="/owner/add" className="block px-4 py-2">
  ➕ Add Restaurant
</Link>
      </>
    )}

    {/* ADMIN SECTION */}
    {user?.role === "admin" && (
      <>
        <hr className="border-gray-300 dark:border-slate-600" />
        <Link
          to="/admin/dashboard"
          className="block px-4 py-2 text-red-500 hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          🛡️ Admin Panel
        </Link>

        <Link
          to="/admin/approve"
          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          Approve Restaurants
        </Link>
      </>
    )}

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
    >
      <LogOut size={16} />
      Logout
    </button>

  </div>
)}
</li>
)}
                    
                    <li className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700">
                        <Link to="/cart" className="flex items-center gap-2">
                            <CartIcon className="w-4 h-4" /> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;
//only export one thing
//for multiple exports use named exports
//for importing named exports use curly braces
//import {x,y} from "module"