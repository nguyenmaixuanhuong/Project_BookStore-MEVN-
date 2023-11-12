const express = require("express");
const router = express.Router();
const ordersController = require('../controllers/orders.controller')

router.route('/create').post(ordersController.createOrder)
router.route('/getorderuser').get(ordersController.getOrders)
router.route('/getAllOrders').get(ordersController.getAllOrders)
router.route('/getordersdeltails').get(ordersController.getOrdersDetail)
router.route('/confirmOrders').get(ordersController.orderConfirmation)

module.exports = router