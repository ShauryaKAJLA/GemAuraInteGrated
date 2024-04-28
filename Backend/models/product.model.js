const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  desc: {
    type: String,
  },
  metal: {
    type: {
      type: String,
    },
    pricePerGram: {
      type: Number,
      required: true,
    },
    weightInGram: {
      type: Number,
      required: true,
    },
  },
  Gem: {
    type: {
      type: String,
    },
    weightInCaret: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  gender: {
    type: String,
    enum: ["m", "w", "k"], // m->men ,w->women , k->kids
  },
  type_of: {
    type: String,
  },
  images: [
    {
      //url of cloudinary
      type: String,
    },
  ],
  inStock: {
    type: Boolean,
    default: true,
  },
});


const Product = mongoose.model('Product',productSchema)

module.exports=Product
