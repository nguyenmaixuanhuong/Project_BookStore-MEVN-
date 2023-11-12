const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartShema = mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
        },
    products:[ {
        productId:{
            type: Schema.Types.ObjectId,
            ref:'Product'
        },  
        quantity: Number,
        totalprice: Number,
        image:{
            type: String,
            require: true
        },  
        date: {
            type: Date,
            default: Date.now
        }
      }],
   
})

const Cart = mongoose.model('Cart',cartShema);
module.exports = Cart;