import API from "./API";

export default{
    listProducts(page,limit){
        return API().get('/bookstore/products/',{params:{page:page,limit:limit}});
    },
    addProduct(product){
        return API().post('/bookstore/products/add',product)
    },
    deleteProduct(id){
        return API().delete('/bookstore/products/delete', {params:{id:id}})
    },
    getProduct(id){
        return API().get('/bookstore/products/'+id,)
    },
    updateProduct(id, product){
        return API().put('/bookstore/products/update/'+id,product)
    }
}