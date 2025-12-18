import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "./useonlinestatus";
import { useSelector } from "react-redux"; 
import { HomeIcon, CartIcon, SunIcon, MoonIcon } from "./Icons";



function Header() {
    const onlinestatus = useOnlineStatus();
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

    const cart = useSelector((store) => store.cart);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-md">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <img src="https://penji.co/wp-content/uploads/2022/08/10.-mr.-d-food-logo.jpg.webp" alt="logo" className="w-16 md:w-24 rounded-lg" />
                <h1 className="text-lg md:text-xl font-bold">Mr. Food</h1>
            </div>

            {/* Mobile Actions (Theme + Menu Toggle) */}
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
                    <li className="flex items-center gap-2 text-sm italic">
                        <span>{onlinestatus ? "✅" : "❌"}</span>
                        <span className="md:hidden lg:inline">Online Status</span>
                    </li>
                    <li className="hover:text-blue-500 transition-colors"><Link className="flex items-center gap-2" to="/"><HomeIcon className="w-4 h-4" /> Home</Link></li>
                    <li className="hover:text-blue-500 transition-colors"><Link to="/about">About</Link></li>
                    <li className="hover:text-blue-500 transition-colors"><Link to="/contact">Contact</Link></li>
                   
                    <li className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700">
                        <Link to="/cart" className="flex items-center gap-2">
                            <CartIcon className="w-4 h-4" /> Cart ({cart.items.length})
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