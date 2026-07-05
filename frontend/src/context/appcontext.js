import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const AppContext=createContext();

export const AppProvider=({children})=>{
    const [restaurant,setRestaurant]=useState([])
    const [cartItems,setCartItems]=useState([])
    const [order,setOrder]=useState([])
    const baseUrl="http://localhost:5000/api"
    const navigate=useNavigate()
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchRestro=async()=>{
        try {
            const {data}=await axios.get(`${baseUrl}/res/getrestro`)
            console.log(data)
            setRestaurant(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getCartItems = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/cart/${user._id}`);

      console.log(data);

      if (data.cartItems.length > 0) {
        setCartItems(data.cartItems[0].items);
      }

    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/getuser`,
      { withCredentials: true }
    );

    setUser(data.user);
    setIsLoggedIn(true);

  } catch {
    setUser(null);
    setIsLoggedIn(false);
  } finally {
    setLoading(false);
  }
};



    useEffect(()=>{
        fetchRestro()
        fetchUser()
    },[])

    return(
        <AppContext.Provider value={{restaurant,cartItems,setCartItems,order,setOrder,isLoggedIn,setIsLoggedIn,user,setUser,fetchUser,fetchRestro,loading,getCartItems}}>
            {children}
        </AppContext.Provider>
    )

}
export const useAppContext=()=>{
    return useContext(AppContext)
}

