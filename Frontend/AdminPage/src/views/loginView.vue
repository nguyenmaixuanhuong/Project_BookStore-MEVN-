<script>
import UserAPI from "../services/userAPI";
export default{
    name: "LoginView",
    data(){
        return{
            phone: "",
            password: "",
            message: "",
        }
    },
    methods:{
        async login(){
            await UserAPI.login(this.phone,this.password).then((res) =>{              
                this.$router.push("/homeAdmin");
                sessionStorage.setItem("id", res.data._id)
            })
            .catch((err) =>{
                this.message = err.response.data.error;
            });
        },
        reset(){
            this.message = '';
        }
       
    }
}
</script>

<template>
 <div class="container-fluid" style="background-image: url(https://i.pinimg.com/564x/be/88/92/be8892132b589f4152ebd5f20ed679c5.jpg); height: 100vh;" >
                <h1 class="text-white text-center pt-5">Chào Mừng Bạn Đến Với Trang Quản Lý BookStore</h1>
            <div class="col-md-5 p-5 mx-auto"  style="background-color:white; border-radius: 20px; opacity: 1; margin-top: 100px;">
                <h2 class="text-center m-0" style="color: rgb(0, 0, 104);">ĐĂNG NHẬP</h2>
                <form  method="post" @submit.prevent="login()" @change="reset">
                    <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại" v-model="phone">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                  </div>
                  <p class="text-danger">{{ message }}</p>
                  <button type="submit" class="btn btn-primary form-control w-100 font-weight-bold" style="background-color: rgb(0, 0, 104); font-size: 20px;" >ĐĂNG NHẬP</button>
                </form>
            </div>
        </div>
</template>

<style scoped>
*{
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
}
.form-control{
    padding: 10px;
    border-radius: 10px;
    margin-top: 5px;
}
</style>