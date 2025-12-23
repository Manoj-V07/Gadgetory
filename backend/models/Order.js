const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        shippingAddress: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            default: 'cod'
        }
    },
    { timestamps: true }
);

// Index for better query performance
orderSchema.index({ user: 1 });

module.exports = mongoose.model('Order', orderSchema);
