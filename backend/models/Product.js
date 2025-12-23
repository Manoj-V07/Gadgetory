const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        id : {
            type : String,
            required : true,
            unique : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type :String,
            required : true
        },
        image : {
            type : String,
            required : true
        },
        originalPrice : {
            type  : Number,
            required : true
        },
        discountedPrice : {
            type : Number,
            required : true
        },
        rating : {
            type : Number,
            default : 0,
            min : 0,
            max : 5
        }
    }, 
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Product', productSchema)