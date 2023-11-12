import API from "./API";

export default{
    listProducts(page,category,limit){
        return API().get('/bookstore/products/',{params:{page:page,category:category,limit:limit}});
    },
    productdetails(id){
        return API().get('/bookstore/products/'+id);
    },
    allProducts(){
        return API().get('/bookstore/products/all');
    },
}