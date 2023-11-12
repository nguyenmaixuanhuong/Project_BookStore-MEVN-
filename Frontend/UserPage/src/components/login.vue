<script>
import { RouterLink } from "vue-router";
import UserAPI from "../services/userAPI";
export default {
    name: "LoginView",
    data() {
        return {
            phone: "",
            password: "",
            message: "",
        };
    },
    methods: {
        async login() {
            await UserAPI.login(this.phone, this.password).then((res) => {
                const token = res.data;
                sessionStorage.setItem("token", token);
                window.location.reload();
                $("#myModal").modal("hide");
                
            })
                .catch((err) => {
                    this.message = err.response.data.error;
                });
        },
        async showmodal(){     
            this.$emit("show-modal", $("#myModal").modal("show"))
        },
        reset(){
            this.message = "";
        }
    },
    components: { RouterLink }
}
</script>
<template>
    <a class="text-white btn-account" style="cursor: pointer; " data-toggle="modal" data-target=".bd-example-modal-lg"> Đăng nhập</a>
    <div class="modal fade bd-example-modal-lg"  id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" id="exampleModalLabel">Chào mừng đến với Bookstore</p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body py-0">
                    <div class="row">
                        <div class="loginform col-sm-8 py-4 px-5">
                            <h2 class="text-center mb-4" style="color:  rgb(4, 4, 134);;">ĐĂNG NHẬP</h2>
                            <form method="post" @submit.prevent="login()" @change="reset()">
                                <div class="form-group">
                                    <label for="phone">Số điện thoại</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại"
                                        v-model="phone">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                        v-model="password">
                                </div>
                                <p class="text-center text-danger font-weight-bold">{{ this.message }}</p>
                                <button type="submit" class=" form-control btn btn-primary w-100 font-weight-bold mt-3"
                                    style="background-color: rgb(0, 0, 160);">ĐĂNG NHẬP</button>
                            </form>
                    </div>
                    <div class="col-sm-4 p-0">
                        <img src="https://i.pinimg.com/564x/76/18/60/76186090ba47027792a5fb4563e0d9c3.jpg" style="width: 100%; height: 100%;" alt="">
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loginform {
    justify-content: center;
    border-radius: 10px;
    padding: 16px 16px;
}

.form-control {
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 20px;
}
</style>