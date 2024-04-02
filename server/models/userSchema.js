const mongoose = require("mongoose");
// install (npm i validator) for E-mail verification
const validator = require("validator");
// (npm i bcryptjs) package to be installed for hashing password
const bcryptjs = require("bcryptjs");
// (npm i jsonwebtoken) package to be installed for token generation
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY; 

const userSchema = new mongoose.Schema({
    fname: {
        type : String,
        required : [true, "Please provide your name"],
        trim : true
    },
    email: { 
        type : String,
        required : true,
        unique : true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    mobile: {
        type : Number,
        required : true,
        minlength : 10,
        unique : true
    },
    password: {
        type : String,
        required : true,
        minLength : 6
    },
    confirmpassword: {
        type : String,
        required : true,
        minLength : 6
    },
    tokens : [
        {
            token : {
                type : String,
                required : true,
            }
        }
    ],
    carts : Array
});

userSchema.pre("save", async function (next){
    // Hashing the password before saving it to database
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password , 12);
        this.confirmpassword = await bcryptjs.hash(this.confirmpassword , 12);
    }
    next();
});

// token generation process
// (npm i jsonwebtoken) to generate token to our website(Amazonweb)

userSchema.methods.generateAuthtoken = async function(){
    try{
        let token = jwt.sign({_id:this._id},secretKey);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error){
          console.log(error);
    }
}

// add to cart data

userSchema.methods.addcartdata = async function(cart){
    try{
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
        }catch(error){
            console.log(error); 
    }
}

// after the above step npm i cookie-parser for generating cookies of our website

const USER = new mongoose.model("USER",userSchema);


module.exports = USER;