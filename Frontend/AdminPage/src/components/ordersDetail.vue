<script>
import ordersAPI from '../services/ordersAPI';
export default {
    data() {
        return {
            ordersDetails: [],
        }
    },
    props: ["orderId"],
    methods: {
        async OrdersDetails(id) {
            await ordersAPI.getOrdersDetails(id).then((res) => {
                this.ordersDetails = res.data;
            })
        }
    },
    created() {
        this.OrdersDetails(this.orderId)
    }
}
</script>
<template>
    <p class="mb-1">
        <button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="'#'+this.orderId"
            aria-expanded="false" :aria-controls="this.orderId">
           Xem chi tiết
        </button>
    </p>
    <div class="collapse" :id="this.orderId">
        <div class="card card-body p-0">
            <table class="table">
                <thead>
                    <tr>
                        <th class="pl-5">Sản phẩm</th>
                        <th class="text-center">Số lượng</th>
                        <th class="text-center">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="orderItem in ordersDetails" :key="orderItem._id" style="line-height: 50px;">
                        <td class="pl-5 d-flex">
                            <img :src="'/image/products/' + orderItem.image" style="width: 50px;" alt="">
                            <p class="ml-4"> {{ orderItem.productId.nameProduct }}</p>
                        </td>
                        <td class="text-center">{{ orderItem.quantityOrdersDetail }}</td>
                        <td class="text-center"> {{ new Intl.NumberFormat()
                            .format(orderItem.priceOrderDetails)
                            .replaceAll(",", ".") }}đ </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>