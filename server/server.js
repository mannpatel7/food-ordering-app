const express=require('express');
const cors=require('cors');
const { dbConnect } = require('./configs/dbconnect');
const { cookie } = require('express-validator');
const authRouter=require("./router/authrouter")
const restrouter=require("./router/restrorouter")
const menueRouter=require("./router/menuerouter")
const cartRouter=require("./router/cartrouter")
const orderRouter=require("./router/orederrouter")
const adminRouter=require("./router/adminrouter")
const adminorderRouter=require("./router/adminorderrouter")
const cookieParser = require('cookie-parser');
const app=express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());


app.use("/api",authRouter)
app.use("/api/res",restrouter)
app.use("/api",menueRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)
app.use("/api",adminRouter)
app.use("/api",adminorderRouter)

dbConnect().then(()=>{
    console.log("DB Connected");
    app.listen(5000,()=>{
        console.log("Server is running on port 5000");
    })
});