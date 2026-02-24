const validator=require("validator")

const validatedata=(req)=>{
    const {name,email,password,phoneNo}=req.body;
    if(!name || !email || !password){
        throw new Error("All fields are required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid email format");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is weak");
    }
    if(phoneNo && !validator.isMobilePhone(phoneNo.toString())){
        throw new Error("Invalid phone number");
    }
}
module.exports={
    validatedata
}