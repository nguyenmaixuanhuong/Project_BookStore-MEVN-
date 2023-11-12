<script>
import login from './login.vue';
import register from './register.vue';
export default {
  components: {
    login,
    register
  },
  props:["number"],
 data(){
  return{
    token: sessionStorage.getItem("token"),
  }
 },
 methods:{
    logout(){
        sessionStorage.clear();
        this.token = sessionStorage.getItem("token")
        this.$router.push('/')
      },
 },
 created(){
  this.$emit("getcart")
 }
}
</script>

<template>
  <div class="container-fluid p-0">
    <img src="/image/logo/banner.jpg" style="width: 98.9vw;" alt="">
  </div>
  <div class="container header">
    <div class=" navbars ">
      <nav class="navbar navbar-expand-lg navHomepage ">
        <img src="/image/logo/logo.png" style="width: 100px; height: 100px;" alt="">
        <div class=" ml-2">
          <button id="menu" class="navbar-toggler py-1 px-2" type="button" data-toggle="collapse"
            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fa-solid fa-bars "></i>
          </button>
        </div>
        <div class="collapse navbar-collapse mt-2 navigation" id="navbarTogglerDemo02">
          <ul class="navbar-nav mt-2 mt-lg-0 ">
            <li class="nav-item ">
              <RouterLink to="/" class="nav-link px-4 ">TRANG CHỦ </RouterLink>
            </li>
            <li class="nav-item ">
              <RouterLink to="/about" class="nav-link px-4  " href="#">GIỚI THIỆU </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/products" class="nav-link px-4  ">SẢN PHẨM</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/contact" class="nav-link px-4  " href="#">LIÊN HỆ</RouterLink>
            </li>
          </ul>
          <div class="mb-2 pt-2 d-flex ml-3">
            <RouterLink to="/cart" v-if="token">
              <a class="fa-solid fa-bag-shopping cart mr-3" style="font-size: 24px; position: relative;">
                <span class="badge" style="position: absolute; left: 3px; font-size: 10px; color: white; top: 10px;">{{ this.number }}</span>
              </a>
            </RouterLink>
            <div style=" float: right; " class="align-middle d-flex mr-3 ">
              <div class="d-flex" v-if="token">
                <div class="btn-group text-white">
                  <a type="button" class=" dropdown-toggle font-weight-bold " data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa-solid fa-user ml-2" style="font-size: 24px; color: rgb(255, 105, 12);"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-left " style="width: 20px; background-color:rgb(255, 255, 255); ">
                    <RouterLink to="/orders" style="text-decoration: none;">
                      <button class="dropdown-item py-3 font-weight-bold border-bottom" type="button">Xem Đơn Hàng</button>
                    </RouterLink>
                    <button class="dropdown-item py-3 font-weight-bold " @click="logout" type="button">Đăng Xuất</button>
                  </div>
                </div>
              </div>
              <div class="pl-0" v-else>
                <register></register>
                <span class="text-white"> / </span>
                <login></login>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<style >
.navHomepage {
  padding: 5px;
}

.cart {
  color: #e76c00 !important;
}

.cart:hover {
  color: #ff7904 !important;
  transition: all 0.4s ease;
}

a {
  color: black;
}

.register {
  text-decoration: none;
}

.navigation {
  background-color: #0d036b;
  border-radius: 30px;
  justify-content: space-evenly;
}

.header {
  background: url(/img/logo/bg.png) no-repeat;
  background-size: cover;
  padding-bottom: 3px;

}

.nav-link {
  color: #ffffff;
  font-weight: 700;
  padding: 5px;
  padding-bottom: 20px;
  margin: 15px 0 0 15px;
  justify-content: space-between;
  font-family: "Oswald", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.nav-link:hover {
  transition: all 0.4s ease;
  font-size: 18px;
  color: #f57200 !important;
}

.btn-account {
  color: #ffffff;
  text-decoration: none !important;
  font-size: 14px;
  font-weight: 700;
  padding-top: 7px !important;
}

.btn-account:hover {
  transition: all 0.4s ease;
  font-size: 15px !important;
  color: #ff7700 !important;
}

.logo {
  margin: auto;
}

.active {
  color: #bd5800 !important;
}

.search {
  border-radius: 20px;
  width: 10em;
}

.dropdown-item:hover {
  color: #e15200 !important;
  background-color: white !important;
}
</style>


