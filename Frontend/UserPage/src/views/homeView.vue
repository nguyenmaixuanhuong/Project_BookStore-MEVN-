<template>
  <Header></Header>
  <div class="container ">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100 " src="/image/slider/slider4.png" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/image/slider/slider3.png" alt="Third slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/image/slider/slider2.png" alt="Four slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="book-title text-center ">
          <RouterLink to="/products">
            <h1 class="book-title_heading px-5 text-center">SÁCH NỔI BẬT</h1>
          </RouterLink>
          <p class="mt-4">Trong lịch sử nhân loại, hiếm thấy ai phát biểu quan điểm này về con người. Ngày nay, quan điểm
            này hầu như không
            tồn tại. Tuy nhiên, chính quan điểm này - dù tồn tại ở các cấp độ khác nhau</p>
        </div>
      </div>
    </div>
    <div class=" menu-list d-flex justify-content-between">
      {{ listProducts('') }}
      <div class="menu-item p-4 ml-2" v-for="product in products" v-bind:key="product.idproduct">
        <RouterLink v-bind:to="'/products/' + product._id" style="text-decoration: none;">
          <div class="menu-item-img ">
            <img v-bind:src="'/image/products/' + product.images[0].imageName" alt=""
              style="width: 100%; max-height: 400px; ">
          </div>
          <div class="menu-item-info text-center mt-2">
            <p class="font-weight-bold mb-0 text-uppercase">
              {{ product.nameProduct }}
            </p>
            <div class="product-item-price pb-2" style="color: orangered;">
              <p>{{
                new Intl.NumberFormat()
                  .format(product.price)
                  .replaceAll(",", ".")
              }}
                đ</p>
              <button class="btn btn-danger w-100">Xem Chi Tiết</button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
  <div  class="bg-light mt-4">
    <div class="container">
      <div class="box-category pt-5 ">
        <div class="d-flex justify-content-between">
          <h3 style="border-left: 4px solid orange; padding-left: 10px;">Tiểu Thuyết</h3>
          <RouterLink to="/products">
            <button class="btn btn-dark"> Xem thêm</button>
          </RouterLink>
        </div>
        <listProduct :category="this.tieuthuyet"></listProduct>
      </div>
      <div class="box-category pt-5 ">
        <div class="d-flex justify-content-between">
          <h3 style="border-left: 4px solid orange; padding-left: 10px;">Truyện Ngắn</h3>
          <RouterLink to="/products">
            <button class="btn btn-dark"> Xem thêm</button>
          </RouterLink>
        </div>
        <listProduct :category="this.truyenngan"></listProduct>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<style>
.book-title {
  position: relative;
  margin: 60px 165px;
  border: 3px solid rgb(190, 190, 190);
}

.book-title_heading {
  position: absolute;
  top: -1em;
  left: 5em;
  background-color: white;
  color: rgb(0, 72, 144);
  transition: all 0.5s;
}

.book-title_heading:hover {

  color: orangered;
}

.menu-item {
  width: 45%;
  box-shadow: 2px 2px 10px rgb(183, 207, 226);
}
</style>
<script>
import UserAPI from "../services/userAPI";
import productAPI from "../services/productAPI";
import listProduct from "../components/listProduct.vue";
import Header from "../components/header.vue"
import Footer from "../components/footer.vue";
export default {
  components: {
    listProduct,Header,Footer
  },
  data() {
    return {
      user: [],
      token: sessionStorage.getItem("token"),
      products: [],
      tieuthuyet: "Tiểu Thuyết",
      truyenngan:"Truyện Ngắn"
    }
  },
  methods: {
    async getInfor() {
      await UserAPI.getInfor(sessionStorage.getItem("token")).then((res) => {
        this.user = res.data
      })
        .catch((err) => {
          console.log(err.response.data);
        })
        ;
    },
    listProducts(category) {
      const limit = 3;
      productAPI.listProducts(1, category, limit).then((res) => {
        this.products = res.data.products;
      }).catch((err) => {
        console.log(err);
      })


    },


  },
  created() {
    this.getInfor();
    this.listProducts('');
  }
};
</script>