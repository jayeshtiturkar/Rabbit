const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true,
        trim :true
    },
    email : {
        type : String ,
        required : true,
        unique : true,
        trim : true,
        match : [/.+\@.+\..+/, "Please Enter Valid Email"]
    },
    password : {
        type: String,
        required : true,
        minLenght : 6
    },
    role : {
        type :String,
        enum : ["customer", "admin"],
        default : "customer"
    } },

    {timestamps : true }
)


// Password Hash middleeware

userSchema.pre("save",async function (next){
    if (!this.isModified("password")) return next(); // If user change the password then only we use this middleware else mover to the next() middleware or funciton

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Match User Enter Password to hashed during login Process
userSchema.methods.matchPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password)
}

// Export the Model module
module.exports = mongoose.model("User", userSchema);