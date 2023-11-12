<script>
import ProductAPI from "../services/productAPI"
export default {
    data() {
        return {
            file: null,
            newImage: '',

        }
    },
    methods: {
        async handleFile(event) {
            this.file = this.$refs.fileInput.files[0]
            const file = event.target.files[0]
            const Read = new FileReader()
            Read.onload = async () => {
                this.newImage = await Read.result
            }
            Read.readAsDataURL(file)
        },
        async addProduct() {
            try {
                const form = document.getElementById("formaddproduct")
                const formData = new FormData(form)

                ProductAPI.addProduct(formData).then((res) => {
                    form.reset();
                    alert('Thêm sản phẩm thành công');

                });
                this.file = null

            } catch (err) {
                console.log(err);
            }
        }

    },
    created() {

    }
}
</script>

<template>
    <button type="button" class="btn font-weight-bold" style="background-color: rgb(0, 0, 165); color: white;" data-toggle="modal" data-target=".bd-example-modal-lg">
        + Thêm sản phẩm
    </button>

    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" style="color: black;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('list')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="p-0 pb-5">
                        <h4 class="modal-title font-weight-bold text-center" style="color: rgb(35, 0, 91);;" id="exampleModalLabel">THÊM
                            SẢN PHẨM MỚI</h4>
                        <div style="width: 100%; margin: auto;">
                            <form method="post" @submit.prevent="addProduct()" enctype="multipart/form-data"
                                id="formaddproduct" class="text-left px-5">
                                <div class="form-group mt-1">
                                    <label for="nameProduct">Tên Sách</label>
                                    <input name="nameProduct" type="text" class="form-control form-input" id="nameProduct"
                                        placeholder="Nhập tên sách" required v-model="productName">
                                </div>
                                <div class="form-group col-md-4 p-0">
                                    <label for="category">Thể loại</label>
                                    <select id="category" name="category" class="form-control">
                                        <option selected>Chọn thể loại</option>
                                        <option value="Tiểu Thuyết">Tiểu Thuyết</option>
                                        <option value="Dân Gian">Dân Gian</option>
                                        <option value="Truyện Ngắn">Truyện Ngắn</option>
                                        <option value="Tình cảm">Tình cảm</option>
                                    </select>
                                </div>
                                <div class="form-group mt-1">
                                    <label for="author">Tác Giả</label>
                                    <input name="author" type="text" class="form-control form-input" id="author"
                                        placeholder="Nhập tên tác giả" required v-model="author">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="nxb">Nhà Xuất Bản</label>
                                    <input name="nxb" type="text" class="form-control form-input" id="nxb"
                                        placeholder="Nhập nhà xuất bản" required v-model="nxb">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="pageNumber">Số trang</label>
                                    <input name="numberPage" type="text" class="form-control form-input" id="pageNumber"
                                        placeholder="Nhập số trang" required v-model="numberPage">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="pageNumber">Năm phát hành</label>
                                    <input name="yearPublish" type="text" class="form-control form-input" id="yearPublish"
                                        placeholder="Nhập năm phát hành" required v-model="yearPublish">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="price">Giá</label>
                                    <input name="price" type="text" class="form-control form-input" id="price"
                                        placeholder="Nhập giá sách" required v-model="price">
                                </div>
                                <div class="form-group mt-1">
                                    <label for="quantity">Số lượng còn trong kho</label>
                                    <input name="quantity" type="text" class="form-control form-input" id="quantity"
                                        placeholder="Nhập số lượng còn trong kho" required v-model="quantity">
                                </div>
                                <div class="form-group mt-3 mb-0">
                                    <label class="d-block" for="exampleFormControlFile1">Ảnh Sản Phẩm</label>
                                    <div class="custom-file" style="width: 30%;">
                                        <label class="custom-file-label" for="customFile">Chọn ảnh</label>
                                        <input type="file" class="custom-file-input" id="customFile" ref="fileInput"
                                            @change="handleFile" accept="*" name="file">
                                    </div>
                                    <div class="input-group  rounded-pill shadow-sm d-block mt-3">
                                        <div>
                                            <img v-if="this.file != null" :src="newImage" alt="" width="200" height="200" />
                                        </div>
                                    </div>
                                </div>
                                <span class="text-success">
                                </span>
                                <div class="form-check pl-0 ">
                                    <button type="submit" class="btn form-input mt-2 font-weight-bold text-white w-100"
                                        style="background-color: #e39f29;">THÊM MỚI</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>