<script>
import ProductAPI from "../services/productAPI"
export default {
    data() {
        return {
            products: [],
        }
    },
    props:["category"],
    methods: {
        async listProducts(category) {
            const limit = 4;
            await ProductAPI.listProducts(1, category, limit).then((res) => {
                this.products = res.data.products;
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    created() {
        this.listProducts(this.category);
    }
}
</script>
<template>
    <div class="menu p-3">
        <div class="menu-list d-flex ">
            <div class="menu-item m-3 p-2" style="width: 25%;" v-for="product in products" v-bind:key="product.idproduct">
                <RouterLink v-bind:to="'/products/' + product._id" @click="$emit('detail',product._id)" style="text-decoration: none;">
                    <div class="menu-item-img" style="position: relative;">
                        <img v-bind:src="'/image/products/' + product.images[0].imageName" alt="" style="width: 100%; max-height: 300px;">
                    </div>
                    <div class="menu-item-info text-center pt-3">
                        <p class="font-weight-bold mb-0 ">
                            {{ product.nameProduct }}
                        </p>
                        <div class="product-item-price pb-2" style="color: orangered;">
                            <p>{{
                                new Intl.NumberFormat()
                                    .format(product.price)
                                    .replaceAll(",", ".")
                            }}
                                đ</p>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>