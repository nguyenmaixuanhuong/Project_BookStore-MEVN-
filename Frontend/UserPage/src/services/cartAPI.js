import API from "./API";

export default{
    addtoCart(id,product){
        return API().post('/bookstore/cart/add',{id:id,product:product})
    },
    getAllCart(id){
        return API().get("/bookstore/cart/getallcart",{params:{id:id}});
    },
    increase(id,product){
        return API().get('/bookstore/cart/increase',{params:{userId:id,productId:product}})
    },
    decrease(id,product){
        return API().get('/bookstore/cart/decrease',{params:{userId:id,productId:product}})
    },
    deleteCartItem(id,product){
        return API().delete('/bookstore/cart/delete',{params:{userId:id,productId:product}});
    }
}