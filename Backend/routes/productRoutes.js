const express = require("express");
const Product = require("../models/Products");
const { protect, admin } = require("../middleware/authmiddleware");

const router = express.Router();

// @desc Create New product entry
// @access Private with Only admin Access
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountprice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      dimentions,
      weight,
    } = req.body;

    // Creating An Object
    const product = new Product({
      name,
      description,
      price,
      discountprice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      dimentions,
      weight,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @desc Update the existing product
// @access Private with Only admin Access

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountprice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      dimentions,
      weight,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountprice = discountprice || product.discountprice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.rating = rating || product.rating;
      product.numReviews = numReviews || product.numReviews;
      product.tags = tags || product.tags;
      product.dimentions = dimentions || product.dimentions;
      product.weight = weight || product.weight;

      // Save the Updated Products
      const updatedProduct = await product.save();
      return res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error While Updating");
  }
});

// @desc Delete the existing product
// @access Private with Only admin Access

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const respose = await Product.findByIdAndDelete(req.params.id);
      return res.json(respose);
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error While Deleting" });
  }
});

// @desc Get All Products with Optional Query Filter
// @access Public

router.get("/", async (req, res) => {
  try {
    const {
      collections,
      sizes,
      colors,
      gender,
      minprice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter Logic
    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.collections = collections;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (sizes) {
      query.sizes = { $in: sizes.split(",") };
    }
    if (colors) {
      query.colors = { $in: colors.split(",") };
    }
    // Ho this Query Looks Like  ==> { colors : {$in : ['black','white']} }

    if (gender) {
      query.gender = gender;
    }

    if (minprice || maxPrice) {
      query.price = {};
      if (minprice) {
        query.price.$gte = Number(minprice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
      // Ho this Query Looks Like  ==> {price : {$gte : 10, $lte : 50}}
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // Ho this Query Looks Like  ==> {$or : [{name : {$regex : "Resort",$options : "i"}},{description : {$regex : "classic ",$options : "i"}}]}

    // SORT Logic  ********
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    const findResult = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(findResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Bestseller products
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const Bestseller = await Product.findOne().sort({rating : -1})
    res.send(Bestseller);

    if (!Bestseller) {
      res.send("Not Best Seller Not Found !");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to Fetch Best Seller Products Due to Server Error"});
  }
});
// @desc New Arrivals
// @access Public

router.get("/new-arrival", async (req, res) => {
  try {
    const NewaArival = await Product.find().sort({updatedAt : -1}).limit(8)
    res.send(NewaArival);

    if (!NewaArival) {
      res.send("No New Arrival !");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to Fetch New sarrival Products Due to Server Error"});
  }
});

// @desc Single Product
// @access Public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error to get Products" });
  }
});

// @desc Show similer products to Given Id (Have to match the Standred)
// @access Public
router.get("/similer/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      let query = { _id: { $ne: product._id } };
      if (product.category) {
        query.category = product.category;
      }
      if (product.gender) {
        query.gender = product.gender;
      }
      const similerProduct = await Product.find(query).limit(4);
      res.json(similerProduct);
    } else {
      res.send("Product Not Found !");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to Fetch Similer Products Due to Server Error",
    });
  }
});


module.exports = router;
