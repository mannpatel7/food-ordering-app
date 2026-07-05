import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const [onlinestatus,setonlinestatus]=useState(true);

    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setonlinestatus(false);
        })
        window.addEventListener("online",()=>{
            setonlinestatus(true);
        })
    },[]);



    return onlinestatus;
}
export default useOnlineStatus;