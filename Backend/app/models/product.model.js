const mongoose = require('mongoose');
const { Schema } = mongoose;
const productShema = mongoose.Schema({
    nameProduct: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    nxb: {
        type: String,
        require: true
    },
   yearPublish: {
        type: String,
        require: true
    },
    numberPage: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    images:[{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    status:{
       type: Boolean,
       default:true
    }
});

productShema.statics.findByName = async(name) =>{
    const product = await Product.find({
        name: { $regex: new RegExp(name), $options: "i" },
    })
    return product;
}

const Product = mongoose.model('Product',productShema);
module.exports = Product;
