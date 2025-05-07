const express = require("express")
const multer = require("multer")
const path = require('path');
// const cloudinary = require("cloudinary")
// const streamifier = require("streamifier");
// require("dotenv").config();

// Cloudinary config
// cloudinary.config({
//     cloud_name : process.env.Cloudinary_Cloud_Name,
//     api_key : process.env.Cloudinary_API_KEY,
//     api_secret : process.env.Cloudinary_API_SECRET,
// });

// Multer SetUp using mermory usage
// const storage = multer.memoryStorage();
// const upload = multer({storage});

const router = express.Router()
// Using Multer Storing Data in our Server
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function (req, file, cb) {
      return cb(null, Date.now() + '-' + file.originalname)
    }
  })

const upload = multer({ storage : storage })
router.post("/",upload.single("image"), async (req,res) => {
    try {
        res.json({message : "File Uploaded Sucessfully", image_url :req.file.path, url: `/uploads/${req.file.filename}`})
    } catch (error) {
        console.error(error)
        res.send("Failed To Send")
    }
    
})

// Using Cloudinary
// router.post("/",upload.single("image"),async (req,res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({message : "No File Uploaded"})
//         }

//         // Function to handle file upload to Cloudinary
//         const streamupload = (fileBuffer) =>{
//             return new Promise ((resolve ,reject) =>{
//                 const theTransformStream  = cloudinary.uploader.upload_stream((error,result) =>{
//                     if (result) {
//                         resolve(result)
//                     }else{
//                         reject(error)
//                     }
//                 });
//                 // APIs (like Cloudinary, AWS S3, etc.) prefer stream-based uploads rather than receiving the whole file at once.
//                 // If you're using Multer with memoryStorage, a file is available as a buffer
//                 // But Cloudinary expects a stream, so you do
//                 // Now stream behaves like a file being read from disk – but it’s from memory

//                 // Use streamifier to convert file buffer into stream <--- Thats why we use
//                 streamifier.createReadStream(fileBuffer).pipe(theTransformStream )
//             })
//         }
//         // Call The stream upload function
//         const result = await streamupload(req.file.buffer)
//         res.json({img_url : result.secure_url})
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({img_url : error.secure_url});
//     }
// });

module.exports = router;