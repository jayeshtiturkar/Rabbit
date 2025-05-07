const express = require("express");
const cors = require("cors");
const myenv = require('dotenv');
const userRouts = require("./routes/userRoutes")
const productRouts = require("./routes/productRoutes")
const cartRouts = require("./routes/cartRoutes")
const checkoutRouts = require("./routes/checkout")
const orderRouts = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/subscribeRoute")
const adminRoutes = require("./routes/adminRoutes")
const adminProductsRoutes = require("./routes/adminProductsRoute")
const adminOrdesRoutes = require("./routes/adminOrderRoute")
myenv.config()

const connectDB = require("./config/db")
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Connect To Mongodb Database
connectDB()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World !!!')
  })

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routs
app.use("/api/users", userRouts)
app.use("/api/product", productRouts)
app.use("/api/cart", cartRouts)
app.use("/api/checkout", checkoutRouts)
app.use("/api/order", orderRouts)
app.use("/api/upload", uploadRoutes)
app.use("/api/subscribe", subscribeRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/admin/products", adminProductsRoutes)
app.use("/api/admin/orders", adminOrdesRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});