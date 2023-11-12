<script>
import ProductAPI from "../services/productAPI"
import search from "../components/search.vue"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue";
export default {
    components: {
        search, Header,Footer
    },
    data() {
        return {
            products: [],
            page: 1,
            totalpages: 0,
            category: "",
            searchText: "",
            productSearch: [],
        }
    },
    computed: {
        searchProducts() {
            const name = this.searchText.toLowerCase().trim()
            if (!name) return this.products;
            else {
                ProductAPI.allProducts().then((res) => {
                    this.productSearch = res.data;
                })
                return this.productSearch.filter((product) => {
                    return product.nameProduct.toLowerCase().includes(name)
                })
            }
        },
    },
    methods: {
        async listProducts(category) {
            this.category = category
            const limit = 9;
            await ProductAPI.listProducts(this.page, category, limit).then((res) => {
                this.products = res.data.products;
                this.page = res.data.currentPage;
                this.totalpages = res.data.totalPages;
            }).catch((err) => {
                console.log(err);
            })
        },

        async pageActive(page) {
            document.getElementById(this.page).classList.remove("active");
            this.page = page;
            this.listProducts(this.category);
            console.log(page);
            const active = document.getElementById(page)
            active.classList.add("active");
        },
        async deleteProduct(id) {
            await ProductAPI.deleteProduct(id).then((res) => {
                alert(res.data)
                this.listProducts();
            }).catch((err) => {
                console.log(err);
                alert("Loi ")
            })
        }
    },
    created() {
        this.listProducts();
    }
}
</script>
<template>
    <Header></Header>
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-lg-3 p-0 mt-5" style="border-right: 3px solid rgba(219, 219, 219, 0.484);">
                <ul class=" btn-menu" style="">
                    <h3 class="p-2 mb-3 bg-light text-center">Thể Loại</h3>
                    <div class="category">
                        <input type="radio" checked name="category" id="all"  @click="listProducts('')"
                            value="Tất Cả">
                        <label class="categoryName" for="all">Tất Cả</label><br>
                    </div>
                    <div class="category">
                        <input type="radio" name="category" id="tieuthuyet" 
                            @click="listProducts('Tiểu Thuyết')" value="Tiểu Thuyết">
                        <label class="categoryName" for="tieuthuyet">Tiểu Thuyết</label><br>
                    </div>
                    <div class="category">
                        <input type="radio" name="category" id="tinhcam"  @click="listProducts('Tình cảm')"
                            value="Tình Cảm">
                        <label class="categoryName" for="tinhcam">Tình Cảm</label><br>
                    </div>
                    <div class="category">
                        <input type="radio" name="category" id="truyenngan" 
                            @click="listProducts('Truyện Ngắn')" value="Truyện Ngắn">
                        <label class="categoryName" for="truyenngan">Truyện Ngắn</label><br>
                    </div>
                    <div class="category">
                        <input type="radio" name="category" id="dangian"  @click="listProducts('Dân Gian')"
                            value="Dân Gian">
                        <label class="categoryName" for="dangian">Dân Gian</label><br>
                    </div>
                </ul>
            </div>
            <div class="col-md-9 col-lg-9 col-sm-12 col-xs-12 pt-3">
                <div class="menu p-3">
                    <h1 class="text-center mb-4 text-uppercase">Danh Sách Sản Phẩm</h1>
                    <search v-model="searchText"></search>
                    <div class="menu-list d-flex flex-wrap ">
                        <div class="menu-item" v-for="product in searchProducts" v-bind:key="product.idproduct">
                            <RouterLink v-bind:to="'/products/' + product._id" style="text-decoration: none;">
                                <div class="menu-item-img" style="position: relative;">
                                    <img v-bind:src="'/image/products/' + product.images[0].imageName" alt=""
                                        style="width: 100%; max-height: 310px;">
                                </div>
                                <div class="menu-item-info text-center pt-3">
                                    <p class="font-weight-bold mb-0 ">
                                        {{ product.nameProduct }}
                                    </p>
                                    <div class="product-item-price pb-2" >
                                        <p v-if="product.status" style="color: orangered;">{{
                                            new Intl.NumberFormat()
                                                .format(product.price)
                                                .replaceAll(",", ".")
                                        }}đ</p>
                                        <p v-else class="text-dark">
                                            Sản phẩm ngừng kinh doanh
                                        </p>
                                    </div>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
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
    </div>
    <Footer></Footer>
</template>
<style scoped>
.active {
    color: #ff7700 !important;
}
.categoryName{
    padding-left: 10px;
    font-weight: 600;
    margin-bottom: 0px;
}
.category {
    border-bottom: 1px solid rgb(223, 223, 223);
    margin-bottom: 30px;
    cursor: pointer;
    margin-right: 2px;
    padding-left: 10px;
}

.product-list {
    font-weight: 500;
    color: rgb(147, 147, 147);
    display: block;
    font-size: 100%;
    text-decoration: none !important;
    ;
    padding-left: 10px;
}

.product-list:hover {
    cursor: pointer;
    font-weight: 700;
    color: rgb(33, 174, 174);
}

.menu-item {
    width: 30%;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 36px;
    border-radius: 10px;
    @media (max-width:792px) {
        width: 45%;
    }
    @media (max-width:1345px) {
        width: 33%;
    }

}

.menu-item:hover {
    /* border: 1px solid rgb(197, 197, 197); */
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgb(232, 232, 232);
    border-bottom: none;
}

.menu-item:hover+.details {
    display: block;
}

.btn-menu {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    line-height: 2;
    padding-left: 50px;

}

.decoration-none {
    text-decoration: none !important;
}</style>
