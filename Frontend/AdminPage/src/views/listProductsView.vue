<script>
import ProductAPI from "../services/productAPI"
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
import addproduct from "../components/addproduct.vue"
import updateProduct from "../components/updateProduct.vue"
export default {
    components: {
        Header,
        Navbar,
        addproduct,
        updateProduct
    },
    name: "ListProductsView",
    data() {
        return {
            products: [],
            page: 1,
            totalpages: 0,
        }
    },
    methods: {
        async listProducts() {
            await ProductAPI.listProducts(this.page, 4).then((res) => {
                this.products = res.data.products;
                this.page = res.data.currentPage;
                this.totalpages = res.data.totalPages;
                window.scrollTo(0, 0);
            }).catch((err) => {
                console.log(err);
            })
        },
        async pageActive(page) {
            document.getElementById(this.page).classList.remove("active");
            this.page = page;
            this.listProducts();
            console.log(page);
            const active = document.getElementById(page)
            active.classList.add("active");
        },
        async deleteProduct(id) {
            await ProductAPI.deleteProduct(id).then((res) => {
                this.listProducts();
            }).catch((err) => {
                console.log(err);
                alert("Loi ")
            })
        },
    },
    created() {
        this.listProducts();
    }
}
</script>

<template>
    <Header></Header>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 p-0">
                <Navbar></Navbar>
            </div>
            <div class="col-md-10 p-3" style="background-color: rgb(243, 247, 255);">
                <div>
                    <h2 class="text-center my-3">DANH SÁCH SẢN PHẨM</h2>
                    <div style="float: right; margin-bottom: 10px;">
                        <addproduct @list="listProducts" />
                    </div>
                </div>
                <table class="table  table-light " style="border: solid 2px rgba(223, 223, 223, 0.799);">
                    <thead class="thead-dark">
                        <tr class="text-center">
                            <th scope="col">STT</th>
                            <th scope="col">Tên Sách</th>
                            <th scope="col">Thể Loại</th>
                            <th scope="col">Tác Giả</th>
                            <th scope="col">NXB</th>
                            <th scope="col">Số Trang</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Hình Ảnh</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product, index in products" :key="product._id" class="text-center my-auto" style="">
                            <th scope="row">{{ index + 1 }}</th>
                            <th scope="col">{{ product.nameProduct }}</th>
                            <th scope="col">{{ product.category }}</th>
                            <th scope="col">{{ product.author }}</th>
                            <th scope="col">{{ product.nxb }}</th>
                            <th scope="col">{{ product.numberPage }}</th>
                            <th scope="col">{{ product.price }}</th>
                            <th scope="col">{{ product.quantity }}</th>
                            <th scope="col">
                                <img v-bind:src="'/image/products/' + product.images[0].imageName" alt=""
                                    style="width:100px; height: 100px;">
                            </th>
                            <th scope="col" v-if="product.status">
                                <updateProduct :id="product._id" @list="listProducts"></updateProduct>
                                <br />
                                <button class="btn btn-danger mt-3" data-toggle="modal" :data-target="'#delete'+product._id"> <i
                                        class="fa-solid fa-xmark"></i>
                                </button>
                                <div class="modal" :id="'delete'+product._id" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body" >
                                                <p>Bạn có chắc là muốn xóa sản phẩm này không?</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button"  data-dismiss="modal" class="btn btn-danger"
                                                    @click="deleteProduct(product._id)">Xóa</button>
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" v-else>
                                <p class="text-secondary">Dừng bán</p>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div class=" d-flex" style="justify-content: center;">
                    <ul class="pagination" v-if="totalpages > 1">
                        <a class="page-link" v-if="this.page > 1" @click="pageActive(this.page - 1)"><i
                                class="fa-solid fa-angle-left"></i></a>
                        <li v-for="index in totalpages" class="page-item ">
                            <a class="page-link font-weight-bold" :id="index" @click="pageActive(index)">{{ index }}</a>
                        </li>
                        <a class="page-link" v-if="this.page < totalpages" @click="pageActive(parseInt(this.page) + 1)"><i
                                class="fa-solid fa-angle-right"></i></a>
                    </ul>
                </div>
            </div>
        </div>
        <!-- modaldelete -->

    </div>
</template>

<style>
.page-link {
    padding: 10px 15px;
}

.active {
    background-color: rgb(139, 143, 142);
}</style>