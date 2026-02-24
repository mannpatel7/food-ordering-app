const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menue",   
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        priceAtOrderTime: {
          type: Number,
          required: true
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD"
    },

    deliveryAddress: {
      type: String,
      required: true
    }
  },{timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);