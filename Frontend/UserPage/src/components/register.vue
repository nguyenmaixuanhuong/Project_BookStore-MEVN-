<script>
import UserAPI from "../services/userAPI";
export default {
  name: "RegisterView",
  data() {
    return {
      phone: "",
      username: "",
      address: "",
      password: "",
      confirmPassword: "",
      message: "",
      errorphone: "",
      errorpassword: "",
    }
  },
  methods: {
    register() {
      UserAPI.register(this.phone, this.username, this.address, this.password).then(res => {
        this.message = "Bạn đã đăng kí thành công"
        alert(this.message)
        UserAPI.login(this.phone, this.password).then((res) => {
          const token = res.data;
          sessionStorage.setItem("token", token);
          this.$router.push("/");
          $("#myModalregister").modal("hide");
        })
      })
        .catch(err => {
          const error = err.response.data
          this.message = error.error
          if (error.errors.phoneNumber) {
            this.errorphone = error.errors.phoneNumber.message
          }
          if (error.errors.password) {
            this.errorpassword = error.errors.password.message
          }
          console.log(err);
        })
    },
    checkPasscfm() {
      if (this.password != this.confirmPassword) {
        this.status = 400
        this.message = "Nhập lại mật khẩu không khớp";
        event.preventDefault();
      }
    },
    reset(){
      this.message = '',
      this.errorphone= "",
      this.errorpassword= ""

    }
  }
}
</script>

<template>
  <a class="text-white btn-account" style="cursor: pointer; " data-toggle="modal" data-target=".bd-example-modal-lg-res"> Đăng
    Kí</a>
  <div class="modal fade bd-example-modal-lg-res" id="myModalregister" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="exampleModalLabel">Chào mừng đến với Bookstore</p>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body py-0" style="background-image: url(https://i.pinimg.com/564x/76/18/60/76186090ba47027792a5fb4563e0d9c3.jpg);">
          <div class="row">
            <div class="loginform col-sm-8 py-4 px-5 my-4">
              <h2 class="text-center mb-4" style="color:  rgb(4, 4, 134);;">ĐĂNG KÍ TÀI KHOẢN</h2>
              <form method="post" @submit.prevent="register()" id="register" @change="reset">
                <div class="form-group m-0">
                  <label for="phone">Số điện thoại</label>
                  <input type="text" name="phone" class="form-control" id="phone" placeholder="Nhập số điện thoại"
                    v-model="phone" required>
                  <p class=" message ">{{ errorphone }}</p>
                </div>
                <div class="form-group">
                  <label for="username">Họ Tên</label>
                  <input type="text" name="username" class="form-control" id="username" placeholder="Nhập tên"
                    v-model="username" required>

                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" name="address" class="form-control" id="address" placeholder="Nhập địa chỉ"
                    v-model="address" required>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" name="password" class="form-control" id="password" placeholder="Password"
                    v-model="password" required>
                  <p class="message">{{ errorpassword }}</p>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Nhập lại Password</label>
                  <input type="password" name="confirmPassword" class="form-control" id="repassword"
                    placeholder="Password" v-model="confirmPassword" required>
                </div>
                <p class="message">{{ message }}</p>
                <button type="submit" @click.prevent="checkPasscfm" class=" form-control btn btn-primary w-100 font-weight-bold mt-3"
                  style="background-color: rgb(0, 0, 160);">ĐĂNG KÍ</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loginform {
  width: 50%;
  margin: auto;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.873);
  box-shadow: 2px 2px 10px rgba(206, 206, 206, 0.726);
}

.form-control {
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 0;
}

.message {
  display: flex;
  justify-content: center;
  margin: 0;
  color: red;
}
</style>