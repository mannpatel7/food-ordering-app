import { createSlice } from "@reduxjs/toolkit";
const cartslice=createSlice({
    name:"cart",
    initialState:{ 
        items:[] } ,
    reducers:{
        addItem:(state,action)=>{
            state.items.push(action.payload);
        },
        removeItem:(state,action)=>{
            state.items.pop();
        },
        clearCart:(state,action)=>{
            state.items.length=0;
        }
    }
});
export default cartslice.reducer;
export const { addItem, removeItem, clearCart } = cartslice.actions;