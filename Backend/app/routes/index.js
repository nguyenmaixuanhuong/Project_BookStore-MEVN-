const userRouter = require("../routes/user.route");
const productRouter = require("../routes/product.route");
const cartRouter = require("../routes/cart.route");
const ordersRouter = require("../routes/orders.route");
function route(app){
    app.use('/bookstore/users',userRouter);
    app.use('/bookstore/products',productRouter);
    app.use('/bookstore/cart',cartRouter);
    app.use('/bookstore/orders',ordersRouter);
}

module.exports = route;