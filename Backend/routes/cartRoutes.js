const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// Helper Function to find our that cart is featch by user or guest
const getCart = async (guestId, userId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId: guestId });
  } else {
    return null;
  }
};

// To Create the Cart As an Guest or Loged in User
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Check if the user is logged in or as a guest BELOW is the cart of User or Guest
    const cart = await getCart(guestId, userId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color === color &&
          p.size === size
      );

      if (productIndex > -1) {
        //  if the product already exist , update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        //  if the product is not present in the products
        cart.products.push({
          productId: productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      //   Recalculate the Total Price of Whole Cart
      cart.totalprice = cart.products.reduce(
        (acc, itme) => acc + itme.price * itme.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // if there is No cart Create New Cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId: productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalprice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Issue in Cart" });
  }
});

// To Update the Product (***Quntity Only****) in the Cart
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    if (guestId || userId) {
      const cart = await getCart(guestId, userId);
      if (cart) {
        const productIndex = cart.products.findIndex(
          (p) =>
            p.productId.toString() === productId &&
            p.color === color &&
            p.size === size
        );

        if (productIndex > -1) {
          if (quantity > 0) {
            cart.products[productIndex].quantity += quantity;
          } else if (
            quantity === -1 &&
            cart.products[productIndex].quantity > 1
          ) {
            cart.products[productIndex].quantity += quantity;
          } else {
            cart.products.splice(productIndex, 1);
          }
        }
        cart.totalprice = cart.products.reduce(
          (acc, itme) => acc + itme.price * itme.quantity,
          0
        );
        await cart.save();
        return res.status(200).json(cart);
      }
    } else {
      res.status(404).json({ message: "Please Check Your User Id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error to update Cart" });
  }
});

// To Delete the Product in the Cart
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }
    if (guestId || userId) {
      const cart = await getCart(guestId, userId);
      if (!cart) {
        res.status(404).json({ message: "Cart Not Found" });
      }
      if (cart) {
        const productIndex = cart.products.findIndex(
          (p) =>
            p.productId.toString() === productId &&
            p.color === color &&
            p.size === size
        );

        if (productIndex > -1) {
          cart.products.splice(productIndex, 1);
        }
        cart.totalprice = cart.products.reduce(
          (acc, itme) => acc + itme.price * itme.quantity,
          0
        );
        await cart.save();
        return res.status(200).json(cart);
      }
    } else {
      res.status(404).json({ message: "Please Check Your User Id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error Failed to Delete Product");
  }
});

// To Featch the Data of Cart as an Guest or Loged in User
router.get("/", async (req, res) => {
  const { guestId, userId } = req.query;
  try {
    const cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(500).json({ message: "Cart Not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error to delete Product" });
  }
});

// Merge Guest Cart into User Cart on login
// @Access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    // get Both User From Cart Collection
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest Cart is Empty" });
      }
      if (userCart) {
        // Merge guest cart into user Cart
        guestCart.products.forEach((guestproduct) => {
          const indexOfProductInUserCart = userCart.products.findIndex(
            (userproduct) => {
              userproduct.productId.toString() ===
                guestproduct.productId.toString() &&
                userproduct.color === guestproduct.color &&
                userproduct.size === guestproduct.size;
            }
          );
          if (indexOfProductInUserCart > -1) {
            userCart.products[indexOfProductInUserCart].quantity +=
              guestproduct.quantity;
          } else {
            userCart.products.push(guestproduct);
          }
        });
        userCart.totalprice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        await userCart.save();
        try {
          // Remove the guest cart after Merging
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error(error);
        }
        res.status(200).json(userCart);
      } else {
        // If Your has No Existing Cart Assign the Guest Cart to the user
        // Now this Guest Cart act Like usercart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        const updatedGuestCart = await guestCart.save();
        res.status(200).json(updatedGuestCart);
      }
    } else {
      if (userCart) {
        // Guest Card is already been merged , return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest Cart not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error to Merge Cart" });
  }
});

// router.delete("/", async (req, res) => {
//   const { guestId, userId } = req.body;
//   try {
//     if (guestId || userId) {
//       const cart = await getCart(guestId, userId);
//       const deletedcart = await Cart.findByIdAndDelete(cart._id)
//       res.status(200).json({message: "Product Cart",deletedcart})
//     } else {
//       res.status(404).json({ message: "Please Check Your User Id" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error Failed to Delete Book");
//   }
// });

module.exports = router;
