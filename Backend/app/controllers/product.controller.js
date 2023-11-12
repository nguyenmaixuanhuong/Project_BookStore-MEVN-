const Product = require("../models/product.model");
const ApiError = require("../api-error");
const Image = require("../models/image.model");
const path = require('path');
const fs = require('fs');
const config = require("../config");
const Cart = require("../models/cart.model");
exports.addProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const imagename = req.files.file.name;
        const image = req.files.file;
        const imageNew = new Image({
            imageName: imagename,
            product: product._id
        });
        imageNew.save();
        product.images.push(imageNew);
        await product.save();
        const filepathAd = path.join(config.filepathAd + imagename)
        await image.mv(filepathAd)
        const filepathUser = path.join(config.filepathUser + imagename)
        await image.mv(filepathUser)
        res.status(200).send({ product })
    } catch (err) {
        return next(new ApiError(500, "them loi" + err));
    };
}
exports.findProductID = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('images').exec();
        res.status(200).send(product);
    } catch (err) {
        return next(new ApiError(400, "Product not found"));
    }
}
exports.findAllProduct = async (req, res, next) => {
    try {
        if(req.query.page){
            const limit = req.query.limit;
            const page = req.query.page;
            const category = req.query.category;
            if (category){
                const products = await Product.find({category:category}).populate('images')
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
                const count = await Product.countDocuments({category:category})
                const totalPages = Math.ceil( count/limit);
                res.status(200).send({products, totalPages:totalPages, currentPage:page });
                return;
            }
            const products = await Product.find().populate('images')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
            const count = await Product.countDocuments()
            const totalPages = Math.ceil( count/limit);
            res.status(200).send({products, totalPages:totalPages, currentPage:page });
        }
        else{
            const products = await Product.find();
            res.status(200).send(products);
        }
    } catch (err) {
        return next(new ApiError(404, "Khong tim thay"));
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('images');
        await Product.findOneAndUpdate(product._id, req.body);
        const imageUpdate = req.files;
        if (imageUpdate) {
            const image = await Image.findOne({ product: product._id });
            await Image.deleteMany({ product: product._id });
            const filepathAd = path.join(config.filepathAd + image.imageName)
            const filepathUser = path.join(config.filepathUser + image.imageName)
            console.log(filepathAd);
            await fs.unlink(filepathAd, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            await fs.unlink(filepathUser, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            product.images = [];
            await product.save();
            const imagename = imageUpdate.file.name;
            const imageNew = new Image({
                imageName: imagename,
                product: product._id
            });
            await imageUpdate.file.mv(config.filepathAd + imageNew.imageName)
            await imageUpdate.file.mv(config.filepathUser + imageNew.imageName)
            imageNew.save();
            product.images.push(imageNew);           
            await product.save();
        }
        const listcart = await Cart.find();
        listcart.forEach( async cart => {
            const itemIndex = cart.products.findIndex(p => p.productId == String(product._id));
            if(itemIndex >= 0){
                cart.products[itemIndex].totalprice = cart.products[itemIndex].quantity * parseInt(req.body.price) 
                cart.products[itemIndex].image = product.images[0].imageName  
                await cart.save();
            }
        });
        res.status(200).send("Update product successfully");
    } catch (err) {
        return next(new ApiError(404, "Khong tim thay" + err));
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.id);
        product.status = false;
        
        product.save();
        res.status(200).send("Delete product successfully");
    }
    catch (err) {
        return next(new ApiError(404, "Khong tim thay" + err));
    }
}

exports.findAll= async (req, res, next) => {
    const products = await Product.find().populate('images')
    return res.status(200).send(products);
};