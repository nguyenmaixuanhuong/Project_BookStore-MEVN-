import API from "./API";

export default{
    getAllOrders(){
        return API().get('/bookstore/orders/getAllOrders')
    },
    getOrdersDetails(id){
        return API().get('/bookstore/orders/getordersdeltails',{params:{orderId:id}});
    },
    confirmOrders(id){
        return API().get('/bookstore/orders/confirmOrders',{params:{orderId:id}});
    }
}