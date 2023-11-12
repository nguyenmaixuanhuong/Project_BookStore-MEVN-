<template>
  <Header></Header>
  <div class="bg-light">
    <div class="container">
      <div class="row">
        <h1 class="pt-4 font-weight-bold mb-4" style="color: rgb(0, 19, 101); border-bottom: 2px solid;">Về Chúng Tôi</h1>
        <div class="d-flex">
          <div class="mr-4">
            <p style="line-height: 1.8; text-align: justify; ">Chào mừng bạn đến với The BookStore, nơi sách là niềm đam
              mê
              của chúng tôi. Được thành lập với tầm nhìn tạo ra
              một không gian ấm áp và hấp dẫn cho những người đam mê sách, chúng tôi tự hào mang lại những cuốn sách đầy
              giá trị .Chúng
              tôi tin rằng quyển sách hay luôn đi đôi với bầu không khí thoải mái. Môi trường ấm cúng và thân thiện của
              chúng
              tôi được thiết kế để giúp bạn cảm thấy như đang ở nhà, cho dù bạn ghé qua để đón nhanh hay muốn thư giãn và
              nghỉ ngơi cùng bạn bè.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <img src="/image/logo/spacestore.jpg" alt="Tramcoffee"
              style="width: 100%; border-radius: 20px; margin-right: 10px;">
          </div>
          <div class="col-md-6">
            <p style="text-align: justify;line-height: 1.8"> Tại The BookStore, Chúng tôi lấy nguồn sách từ các nhà xuất
              bản và tác giả đáng
              tin cậy, những người có cùng cam kết với chúng tôi về chất lượng và tính bền vững. Mỗi cuốn sách đều được
              rang một cách chuyên nghiệp để mang lại
              giá trị và chất lượng của chúng tôi thực sự đặc biệt. Nhưng niềm đam mê của chúng tôi
              còn vượt xa cả sách. Chúng tôi tin vào việc nuôi dưỡng một cộng đồng hỗ trợ, đó là lý do tại sao chúng tôi
              cung cấp cho các nhân viên tài năng của mình thời gian làm việc linh hoạt, cho phép họ theo đuổi niềm
              đam mê sách trong khi vẫn duy trì sự cân bằng lành mạnh giữa công việc và cuộc sống. Hãy tham gia cùng chúng
              tôi tại The BookStore và thưởng thức những quyển sách hay. Khám phá những kiến thức mới, kết nối với những
              người yêu
              thích sách và trải nghiệm sự kết hợp hoàn hảo giữa chất lượng, dịch vụ và sự thoải mái."</p>
          </div>
        </div>
      </div>
      <div id="accordion" class=" mb-5">
        <h1 class="text-center" style="font-weight: 700; ">FAQ</h1>
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link " data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                aria-controls="collapseOne">
                Các quyển sách được The BookStore lấy từ đâu?
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              Tại Bookstore đã chọn lựa ra những quyển sách tâm đắc nhất từ các tác giả nổi tiếng để mang đến cho đọc giả
              những trải nghiệm và kiến thức tuyệt vời nhất.
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="false" aria-controls="collapseTwo">
                The BookStore có bao nhiêu chi nhánh?
              </button>
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
              The BookStore hiện tại có 2 chi nhánh chính:
              <li>Chi nhánh 1: Hẻm 553, Hưng Lợi, Ninh Kiều, Cần Thơ</li>
              <li>Chi Nhánh 2: KDC Hồng Phát, Trần Hoàng Na, Cần Thơ</li>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"
                aria-expanded="false" aria-controls="collapseThree">
                The BookStore có hoạt động vào những ngày lễ, Tết không?
              </button>
            </h5>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
              Tất cả các ngày lễ, Tết, The BookStore luôn mở cửa sẵn sàng đón tiếp tất cả khách hàng vào các khung giờ mở
              cửa của The BookStore
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
import { RouterLink } from 'vue-router';
import Header from "../components/header.vue"
import Footer from "../components/footer.vue";
export default {
  components: {
    Header, Footer
  }

}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .text-about {
    position: absolute;
    bottom: 40%;
    left: 15%;
    font-size: 70px;
    font-weight: 700;
    color: rgb(0, 96, 88);
    text-decoration: none !important;
    ;
    box-shadow: 10px 10px 10px rgb(39, 39, 39);
    text-shadow: 2px 2px rgb(241, 239, 238);
    padding: 10px;
  }

  .btn-link {
    text-decoration: none !important;
    color: black;
    font-weight: bolder;
  }
}</style>
  