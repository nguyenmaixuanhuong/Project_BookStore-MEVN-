<template>
    <Header :number="this.length"></Header>
    <div class="container mt-4">
        <h4>Giỏ hàng của bạn</h4>
        <div class="row mt-4">
            <div class="col-md-7 col-sm-12">
                <table v-if="this.length > 0" class="table">
                    <thead>
                        <tr>
                            <th class="pl-5" scope="col">Sản Phẩm</th>
                            <th class="text-center" scope="col">Số Lượng</th>
                            <th class="text-center" scope="col">Thành Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="product in cart.products">
                            <td class="d-flex">
                                <img v-bind:src="'/image/products/' + product.image" alt="" style="width: 10rem;">
                                <div class="ml-3 my-auto">
                                    <p class="m-1">{{ product.productId.nameProduct }}</p>
                                    <p class="text-danger mb-0">{{ new Intl.NumberFormat()
                                        .format(product.productId.price)
                                        .replaceAll(",", ".") }}đ</p>
                                    <p class="m-0 mb-2" style="font-size: 14px;"> Số lượng trong kho: {{
                                        product.productId.quantity }}</p>
                                    <p class="deleteCart" @click="deletecartItem(product.productId._id)"><i
                                            class="fa-solid fa-trash-can"></i> Xóa sản phẩm</p>

                                </div>
                            </td>
                            <td class="align-middle">
                                <div>
                                    <div class="buttons_added d-flex border" style="width: fit-content;">
                                        <input class="minus is-form  px-2 font-weight-bold" type="button" value="-"
                                            @click="minusNumber(product.productId._id)">
                                        <p aria-label="quantity" class="input-qty text-center m-0  bg-white"
                                            style="width: 40px; " min="1" name="numberProduct" disabled>{{ product.quantity
                                            }}</p>
                                        <input class="plus is-form  px-2 font-weight-bold " type="button" value="+"
                                            @click="plusNumber(product.productId._id)">
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-danger">{{
                                new Intl.NumberFormat()
                                    .format(product.totalprice)
                                    .replaceAll(",", ".")
                            }}đ</td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="text-center">
                    <img src="/image/logo/emptycart.svg" alt="">
                    <p class="mt-4">Chưa có sản phẩm trong giỏ hàng của bạn.</p>
                    <RouterLink to="/products">
                        <button class="btn btn-danger">Mua sắm ngay</button>
                    </RouterLink>
                </div>
            </div>
            <div class="col-md-5 col-sm-12">
                <h5 class="text-center py-3 border text-uppercase text-white"
                    style="box-shadow: 2px 2px 5px rgb(227, 227, 227); background-color: rgb(0, 48, 115);">Thông tin khách
                    hàng</h5>
                <div class="infor-user mt-3 p-4">
                    <p class="textInfor"> Họ tên khách hàng: {{ this.user.name }}</p>
                    <p class="textInfor">Số điện thoại: {{ this.user.phoneNumber }}</p>
                    <div class="form-group" style="position: relative;">
                        <label for="exampleInputPassword1" class="textInfor">Địa chỉ nhận hàng:</label>
                        <input type="text" class="form-control address" id="exampleInputPassword1"
                            placeholder="Nhập địa chỉ nhận hàng" v-model="address">
                        <label for="exampleInputPassword1" style="position: absolute; right: 20px; bottom: 5px;"> <i
                                class="fa-solid fa-pen"></i></label>
                    </div>
                    <p class="textInfor">Tổng tiền: <span class="float-right pr-4 text-danger font-weight-bold"> {{ new
                        Intl.NumberFormat()
                        .format(totalpriceCart)
                        .replaceAll(",", ".") }}đ</span></p>
                    <button v-if="this.length > 0" type="button" class="btn w-100 p-2 bg-danger text-white"
                        @click="createOrders"> ĐẶT HÀNG</button>
                </div>
            </div>
        </div>
        <!-- modal orders-success -->
        <div class="modal" id="successOrder" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="getCart" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <img style="width: 100px; " src="/image/logo/success.png" alt="">
                        <p class="h5 mt-3">Bạn đã đặt hàng thành công</p>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <RouterLink to="cart">
                            <button type="button" @click="hideModal" class="btn btn-danger">Tiếp tục mua hàng </button>
                        </RouterLink>
                        <RouterLink  to="/orders">
                            <button type="button" @click="hideModal" class="btn btn-success">Xem chi tiết đơn hàng </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<style scoped>
.is-form {
    background-color: white;
    border: none;
}

.form-control {
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 20px;
}

.deleteCart {
    cursor: pointer;
    color: rgb(0, 0, 136);
    font-size: 14px;
    margin-top: 5px;
    ;
}

.deleteCart:hover {
    color: rgb(236, 98, 0);
}

.infor-user {

    box-shadow: 2px 2px 5px rgb(219, 219, 219);
    border-radius: 5px;
}

.textInfor {
    color: rgb(0, 0, 129);
    font-weight: 600;
}
</style>

<script>
import cartAPI from '../services/cartAPI';
import userAPI from '../services/userAPI';
import ordersAPI from '../services/ordersAPI';
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
export default {
    components:{
        Header,Footer
    },
    data() {
        return {
            cart: [],
            user: [],
            length: 0,
            address: "",
            totalpriceCart: 0,
            name: "Huong",
        };
    },
    methods: {
        async getCart() {
            await userAPI.getInfor(sessionStorage.getItem("token")).then((res) => {
                this.user = res.data;
                this.address = this.user.address;
            });
            await cartAPI.getAllCart(this.user._id).then((res) => {
                this.cart = res.data;
                console.log(this.cart.products);
                this.length = res.data.products.length;
                this.totalpriceCart = this.cart.products.reduce(function (total, product) {
                    return total + product.totalprice;
                }, 0);
                this.cart.products.sort((a, b) => new Date(b.date) - new Date(a.date));
            });
        },
        async plusNumber(productId) {
            await cartAPI.increase(this.user._id, productId).then((res) => {
                this.getCart();
            });
        },
        async minusNumber(productId) {
            await cartAPI.decrease(this.user._id, productId).then((res) => {
                this.getCart();
            });
        },
        async deletecartItem(productId) {
            await cartAPI.deleteCartItem(this.user._id, productId).then((res) => {
                console.log(res.data);
                this.getCart();
            });
        },
        async createOrders() {
            try {
                await ordersAPI.createOrder(this.cart, this.address, this.totalpriceCart).then((res) => {
                    $("#successOrder").modal("show");
                    this.length = 0;
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        hideModal(){
            $("#successOrder").modal("hide");
        }
    },
    created() {
        this.getCart();
    },
}
</script>