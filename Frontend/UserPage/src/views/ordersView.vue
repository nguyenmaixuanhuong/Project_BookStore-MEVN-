<script>
import ordersAPI from '../services/ordersAPI';
import userAPI from '../services/userAPI';
import ordersDetails from '../components/ordersDetails.vue';
import Header from "../components/header.vue"
import Footer from "../components/footer.vue";
export default {
    components: {
        ordersDetails, Header, Footer
    },
    data() {
        return {
            orders: [],
            user: [],
            length: 0,
        }
    },
    methods: {
        async getorders() {
            await userAPI.getInfor(sessionStorage.getItem("token")).then((res) => {
                this.user = res.data
                this.address = this.user.address
            })
            await ordersAPI.getOrders(this.user._id).then((res) => {
                this.orders = res.data;
                this.length = res.data.length
                this.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
            })
                .catch(e => {
                    console.log(e);
                })
        },
    },
    created() {
        this.getorders();
    }
}
</script>
<template>
    <Header></Header>
    <div class="bg-light">
        <div class="container pb-4">
            <h2 class="text-center my-4 pt-4 text-uppercase" style="color: rgb(0, 39, 132);">Danh Sách Đơn Hàng</h2>
            <div v-if="length > 0" class="card mb-4 " v-for="order in orders" :key="order._id">
                <div class="card-header font-weight-bold ">
                    {{ order.date }}
                    <span class="float-right font-weight-bold"> {{ order.address }}</span>
                </div>
                <div class="card-body p-0">
                    <ordersDetails :orderId="order._id"></ordersDetails>
                </div>
                <div class="card-footer d-flex justify-content-between font-weight-bold">
                    <div>
                        <span>Trạng Thái: </span>
                        <span v-if="order.statusOrder == 0">Chờ Xác Nhận</span>
                        <span v-else class="text-success">Đã xác nhận</span>
                    </div>
                    <p class="text-danger mb-0"> Tổng Hóa Đơn: {{ new Intl.NumberFormat()
                        .format(order.totalpriceOrder)
                        .replaceAll(",", ".") }}đ</p>
                </div>
            </div>
            <div v-else class="text-center pb-4">
                <img style="width: 50%; opacity: 0.6; position: relative;"
                    src="https://i.pinimg.com/originals/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.png" alt="">
                <p class="mt-4 h5">Bạn chưa có đơn hàng nào</p>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>
<style></style>
