const Product = require("../../models/seller/Product");
const Category = require("../../models/seller/Category");
const TotalPrice = require("../../models/seller/TotalPrice");
const multer = require("multer");
const path = require("path");

// Set up multer storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Folder where the images will be saved
  },
  filename: (req, file, cb) => {
    // Create a unique filename using timestamp and file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Only image files are allowed"), false); // Reject non-image files
  }
};

// Multer upload instance
const upload = multer({ storage, fileFilter });

// Modify the addProduct function to handle image uploads
exports.addProduct = [
  // Handle image upload via multer
  upload.single("image"), // The 'image' field in the form will be handled by multer
  async (req, res) => {
    try {
      const { name, modelNumber, vendor, category, price, details, quantity } = req.body;
      const sellerId = req.user._id;

      // Ensure image file exists after multer processing
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!image) {
        return res.status(400).json({ success: false, message: "Image file is required." });
      }

      // Check if the category exists; if not, create it
      let categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        categoryDoc = new Category({ name: category });
        await categoryDoc.save();
      }

      // Check if product already exists for the same seller
      const existingProduct = await Product.findOne({ name, modelNumber, sellerId });
      if (existingProduct) {
        // If the product exists for the seller, update the quantity
        existingProduct.quantity += quantity;
        await existingProduct.save();

        // Update the total price for the seller
        let totalPriceDoc = await TotalPrice.findOne({ sellerId });
        if (!totalPriceDoc) {
          totalPriceDoc = new TotalPrice({ sellerId, totalPrice: 0 });
        }
        totalPriceDoc.totalPrice += price * quantity;
        await totalPriceDoc.save();

        console.log(`Product quantity updated. Seller's total price: ${totalPriceDoc.totalPrice}`);
        return res.status(200).json({ success: true, message: "Product quantity updated.", product: existingProduct });
      } else {
        // If product doesn't exist, create a new product
        const newProduct = new Product({
          name,
          modelNumber,
          image, // Save the image URL
          vendor,
          category: categoryDoc._id, // Save the category ID
          price,
          details,
          quantity,
          sellerId,
        });

        await newProduct.save();

        // Update the total price for the seller
        let totalPriceDoc = await TotalPrice.findOne({ sellerId });
        if (!totalPriceDoc) {
          totalPriceDoc = new TotalPrice({ sellerId, totalPrice: 0 });
        }

        totalPriceDoc.totalPrice += price * quantity; // Add the price of the newly added product
        await totalPriceDoc.save();

        console.log(`New product added. Seller's total price: ${totalPriceDoc.totalPrice}`);
        return res.status(201).json({ success: true, message: "Product added successfully.", product: newProduct });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  }
];

// Keep the updateProduct function the same as before if image isn't mandatory when updating the product
exports.updateProduct = async (req, res) => {
  const { name, modelNumber, vendor, category, price, details, quantity } = req.body;
  const sellerId = req.user._id;
  const productId = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findOne({ _id: productId, sellerId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found or you don't have permission." });
    }

    // Update the product details
    product.name = name || product.name;
    product.modelNumber = modelNumber || product.modelNumber;
    product.vendor = vendor || product.vendor;
    product.category = category || product.category;
    product.price = price || product.price;
    product.details = details || product.details;
    product.quantity = quantity || product.quantity;

    // Handle image upload if a new image is provided
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
    const sellerId = req.user._id;
    const productId = req.params.id;

    try {
        // Find the product by ID and seller ID
        const product = await Product.findOne({ _id: productId, sellerId });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found or you don't have permission." });
        }

        // Remove the product from the database
        await product.remove();

        // Update the total price for the seller
        const totalPrice = await TotalPrice.findOne({ sellerId });
        if (totalPrice) {
            totalPrice.totalPrice -= product.price * product.quantity;
            await totalPrice.save();
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
    }
};