<script>
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
import userAPI from "../services/userAPI.js"
import productAPI from "../services/productAPI.js"
import orderAPI from "../services/ordersAPI.js"
export default {
    components: {
        Header,
        Navbar
    },
    data() {
        return {
            totalUser: 0,
            totalProduct: 0,
            orderNew: 0,
        }
    },
    methods: {
        async statistical() {
            await userAPI.listUsers('').then(res => {
                this.totalUser = res.data.length
            })
            await productAPI.listProducts('', '').then(res => {
                this.totalProduct = res.data.length
            });
            await orderAPI.getAllOrders().then(res => {
                console.log(res.data);
                res.data.orders.forEach(element => {
                    if (element.statusOrder == 0) {
                        this.orderNew++;
                    }
                });
            });
        }
    },
    created() {
        this.statistical();
    }

}
</script>
<template>
    <Header></Header>
    <div class="container-fluid">
        <div class="row ">
            <div class="col-md-2 col-sm-12  p-0">
                <Navbar></Navbar>
            </div>
            <div class="col-md-10 col-sm-12 p-2 d-flex flex-wrap-reverse justify-content-center h-100 ">
                <div class="card ">
                    <router-link to="/listusers" class="link">
                        <div class="card-body d-flex  ">
                            <img src="/image/logo/users.png" class=" w-100 col-sm-7 col-xs-12" alt="">
                            <div class="card-text col-sm-5 col-xs-12 my-auto">
                                <h5 class="text-center">Customer</h5>
                                <h2 class="text-danger text-center">{{ totalUser }}</h2>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="card">
                    <router-link to="/listproducts" class="link">
                    <div class="card-body d-flex ">
                        <img src="/image/logo/book.png" class="w-100 col-sm-7 col-xs-12" style="width: 250px;" alt="">
                        <div class="card-text col-sm-5 col-xs-12 my-auto">
                            <h5 class="text-center">Products</h5>
                            <h2 class="text-danger text-center">{{ totalProduct }}</h2>
                        </div>
                    </div>
                    </router-link>
                </div>
                <div class="card">
                    <router-link to="/orders" class="link">
                    <div class="card-body d-flex">
                        <img src="/image/logo/order.png" class="w-100 col-sm-7 col-xs-12" alt="">
                        <div class="card-text col-sm-5 col-xs-12 my-auto">
                            <h5 class="text-center">Orders</h5>
                            <h2 class="text-danger text-center">{{ orderNew }}</h2>
                            <span class="font-weight-bold"> Cần duyệt</span>
                        </div>
                    </div>
                </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin: 16px 24px;
    box-shadow: 2px 2px 5px rgb(223, 223, 223);
    border: none;
    width: 25rem;
    padding: 16px;
    max-height: 250px;

    @media (max-width:992px) {
        width: 45%;
    }
}
.link{
    text-decoration: none;
    color: black;
}
.link:hover{
    background-color: rgb(236, 244, 255);
}
.card-body {
    padding: 36px;
}</style>