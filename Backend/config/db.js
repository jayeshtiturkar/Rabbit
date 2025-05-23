const mongoose = require('mongoose');

const main = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Sucessfully");

    } catch (error) {
        console.log("Database Connection Failed !",error);
        process.exit(1);
    }

};

module.exports = main;