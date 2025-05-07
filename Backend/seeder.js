const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Product = require("./models/Products")
const User = require("./models/User")
const Cart = require("./models/Cart")
const products = require("./data/products")

dotenv.config();

// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI)

// Function to Seed Data

const seedData =  async () => {
    try {
        // Clearing Existing Data
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()

        // Create Default Admin User
        const newuser = await User.create({
            name : "Ethan Hunt",
            email : "ethan@example.com",
            password : "123456",
            role :"admin"
        });

        // Assign default user id to reach product
        const userId = newuser._id

        const sampleData = products.map((product) =>{
            return {...product, user : userId}
        })

        // Insert Data in Database
        const response =  await Product.insertMany(sampleData);
        process.exit()
    } catch (error) {
        console.error("Error While Seeding the Data",error)
        process.exit(1)
    }
};

seedData();