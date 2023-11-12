import API from "./API";

export default{
    createOrder(cart,address,totalPriceOrder){
        return API().post('/bookstore/orders/create',{cart:cart,address:address,totalPriceOrder:totalPriceOrder})
    },
    getOrders(id){
        return API().get('/bookstore/orders/getorderuser',{params:{userId:id}});
    },
    getOrdersDetails(id){
        return API().get('/bookstore/orders/getordersdeltails',{params:{orderId:id}});
    }
}