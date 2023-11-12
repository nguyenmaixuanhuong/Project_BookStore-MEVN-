<template>
    <Header></Header>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 p-0">
                <Navbar></Navbar>
            </div>
            <div class="col-md-10 p-3" style="background-color: rgb(243, 247, 255);">
                <h2 class="text-center">DANH SÁCH ĐƠN HÀNG</h2>
                <div class="card mb-4 " v-for="order in orders" :key="order._id">
                    <div class="card-header font-weight-bold ">
                        {{ order.date }}
                        <span class="float-right font-weight-bold"> Mã Hóa Đơn: {{ order._id }}</span>
                    </div>
                    <div class="card-body p-0">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="pl-5">Tên khách hàng</th>
                                    <th class="text-center">Số điện thoại</th>
                                    <th class="text-center">Địa chỉ</th>
                                    <th class="text-center">Tổng Hóa Đơn</th>
                                    <th class="text-center">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="pl-5">{{ order.user.name }}</td>
                                    <td class="text-center">{{ order.user.phoneNumber }}</td>
                                    <td class="text-center">{{ order.address }}</td>
                                    <td class="text-center"> {{ new Intl.NumberFormat()
                                        .format(order.totalpriceOrder)
                                        .replaceAll(",", ".") }}đ</td>
                                    <td class="text-center">
                                        <button v-if="order.statusOrder == 0" class="btn btn-dark"
                                            @click="ordersConfirmation(order._id)">Xác Nhận</button>
                                        <p class="text-secondary" v-else>Đã xác nhận</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer d-flex justify-content-between font-weight-bold">
                        <div class=" w-100" style="justify-content: space-between;">
                            <ordersDetail :orderId="order._id"></ordersDetail>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style></style>
<script>
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
import ordersAPI from "../services/ordersAPI"
import ordersDetail from "../components/ordersDetail.vue"
export default {
    components: {
        Header,
        Navbar,
        ordersDetail
    },
    data() {
        return {
            orders: [],
        }
    },
    methods: {
        async getAllorders() {
            await ordersAPI.getAllOrders().then((res) => {
                this.orders = res.data.orders;
                this.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
            })
                .catch(e => {
                    console.log(e);
                })
        },
        async ordersConfirmation(id) {
            await ordersAPI.confirmOrders(id).then(() => {
                this.getAllorders();
            })
                .catch(e => {
                    console.log(e);
                })
        }
    },
    created() {
        this.getAllorders();
    }
}
</script>