<script>
import productAPI from '../services/productAPI';
import cartAPI from '../services/cartAPI';
import userAPI from '../services/userAPI';
import Header from "../components/header.vue"
import listProduct from '../components/listProduct.vue';
import Footer from "../components/footer.vue";
export default {
    components:{
    Header,Footer,listProduct
  },
    data() {
        return {
            product: {},
            id: this.$route.params.id,
            price: 0,
            number: 1,
            message: '',
            productsRelated: [],
            iduser: "",
        }
    },
    methods: {
        async getProductDetail(id) {
            this.id = id;
            await productAPI.productdetails(id).then((res) => {
                this.product = res.data
                this.price = this.product.price
                this.listProducts(this.product.category);
                window.scrollTo(0, 0);
            })
        },
        minusNumber() {
            if (this.number > 1) {
                this.number = this.number - 1;
                this.price = this.product.price * this.number;
            }
            else {
                this.number = 1;
                this.price = this.product.price;
            }
        },
        plusNumber() {
            if (this.number < this.product.quantity) {
                this.number = this.number + 1;
                this.price = this.product.price * this.number;
            }
        },
        async listProducts(category) {
            const limit = 5;
            await productAPI.listProducts(1, category, limit).then((res) => {
                this.productsRelated = res.data.products;
            }).catch((err) => {
                console.log(err);
            })
        },
        async addtoCart() {
            if (sessionStorage.getItem("token")) {
                await userAPI.getInfor(sessionStorage.getItem("token")).then((res) => {
                    this.iduser = res.data._id
                });
                console.log(this.id);
                const product = {
                    productId: this.id,
                    quantity: this.number,
                    totalprice: this.price
                }
                await cartAPI.addtoCart(this.iduser, product).then((res) => {
                    if (res.data.inCart) {
                        $("#myModalCart").modal("show")
                        setTimeout(() => {
                            $("#myModalCart").modal("hide")
                        }, 2000)
                    }
                    else {
                        this.message = "Thêm thành công sản phẩm vào giỏ hàng"
                        setTimeout(() => {
                            this.message = ""
                        }, 2000)
                    }
                });
            }
            else {
                $("#myModal").modal("show")
            }
        },
        hideModalCart() {
            $("#myModalCart").modal("hide")
        }
    },
    created() {
        this.getProductDetail(this.id)
    }
}
</script>
<template>
<Header></Header>
    <div class="container-fluid" style="background-color: rgba(240, 240, 240, 0.61);">
        <div class="container py-2">
            <div v-if="this.message" class="alert alert-success alert-dismissible fade show w-50 mx-auto mt-3" role="alert">
                <strong class="">{{ this.message }}</strong> .
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="row my-3 productdetail">
                <div class="col-md-5 border-right">
                    <img v-bind:src="'/image/products/' + product.images[0].imageName" alt=""
                        style="width: 100%; padding-right: 10px; ">
                </div>
                <div class="col-md-6 ml-4 mt-4 ">
                    <div class="mb-3">
                        <h3 class="text-uppercase font-weight-bold" style="color: rgb(113, 32, 32);">{{ product.nameProduct
                        }}</h3>
                        <div class="d-flex">
                            <p class="mr-5">Tác Giả: {{ product.author }}</p>
                            <p> Thể Loại: {{ product.category }}</p>
                        </div>
                        <div>
                            <p>Thông tin về sách:</p>
                            <table class="table border-bottom">
                                <thead>
                                    <tr class="text-center">
                                        <th scope="col">Nhà Xuất Bản</th>
                                        <th scope="col">Số Trang</th>
                                        <th scope="col">Năm Phát Hành</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-center">
                                        <td>{{ product.nxb }}</td>
                                        <td>{{ product.numberPage }}</td>
                                        <td>{{ product.yearPublish }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div class="buttons_added border" style="width: fit-content;">
                                <input class="minus is-form py-2 px-3 font-weight-bold" type="button" value="-"
                                    @click="minusNumber">
                                <input aria-label="quantity" class="input-qty text-center py-2 font-weight-bold bg-white"
                                    style="width: 40px; border: none; " min="1" name="numberProduct" disabled
                                    v-model="number">
                                <input class="plus is-form py-2 px-3 font-weight-bold" type="button" value="+"
                                    @click="plusNumber">
                            </div>
                        </div>
                    </div>
                    <p v-if="product.status">Số lượng còn trong kho: {{ product.quantity }}</p>
                    <div class="pb-3">
                        <p class="text-info-product  mb-1">Giá Sản Phẩm</p>
                        <div id="priceProduct">
                            <h5 class='pl-1' style="color: rgb(255, 123, 0);">{{
                                new Intl.NumberFormat()
                                    .format(price)
                                    .replaceAll(",", ".")
                            }}đ</h5>
                        </div>
                    </div>
                    <div>
                        <button v-if="product.status && product.quantity >0" type="submit" class="btn btn-info p-3 w-100" @click="addtoCart"> Thêm vào
                            giỏ hàng</button>
                        <button class=" btn btn-danger px-5 py-2 w-100" disabled v-else-if="product.quantity == 0"> Hết Hàng</button>
                        <button v-else type="submit" disabled class="btn btn-dark p-3 w-100"> Sản phẩm ngừng kinh doanh</button>
                    </div>
                </div>
            </div>
            <listProduct :category="product.category" @detail="getProductDetail"></listProduct>
        </div>
        <div class="modal fade" id="myModalCart">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body d-flex text-center">
                        <h6 class="m-2"> Sản phẩm đã có trong giỏ hàng =></h6>
                        <RouterLink to="/cart">
                            <button class="btn btn-danger" @click="hideModalCart">Đi tới giỏ hàng</button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
<Footer></Footer>
</template>

<style scoped>
.productdetail {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
}

.is-form {
    border: none;
}

.info {
    color: rgb(0, 0, 120);
    font-weight: 500;
    margin-top: 8px;
}
.info:hover{
    color: rgb(255, 149, 0);
}
.productRelated{
    padding: 8px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgb(206, 206, 206);
}
</style>        