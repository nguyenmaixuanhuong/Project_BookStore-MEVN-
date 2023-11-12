<script>
import ProductAPI from "../services/productAPI";
export default {
    data() {
        return {
            productName: "",
            author: "",
            nxb: "",
            numberPage: "",
            price: "",
            desc: "",
            yearPublish: "",
            file: null,
            newImage: '',
            image: "",
            category: "",
        }
    },
    props: ["id"],
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
        async getProduct(id) {
            await ProductAPI.getProduct(id).then((product) => {
                console.log(product);
                this.productName = product.data.nameProduct,
                    this.author = product.data.author,
                    this.nxb = product.data.nxb,
                    this.numberPage = product.data.numberPage,
                    this.price = product.data.price,
                    this.quantity = product.data.quantity
                this.yearPublish = product.data.yearPublish,
                    this.image = product.data.images[0].imageName
                this.category = product.data.category
                this.newImage = ''
                console.log(this.category);
            })
        },
        async updateproduct() {
            try {
                const formData = new FormData()
                formData.append('file', this.file);
                formData.append('price', this.price)
                formData.append('author', this.author)
                formData.append('nameProduct', this.productName)
                formData.append('nxb', this.nxb)
                formData.append('category', this.category)
                formData.append('quantity', this.quantity)
                formData.append('yearPublish', this.yearPublish)
                formData.append('numberPage', this.numberPage)
                await ProductAPI.updateProduct(this.id, formData)
                    .then(res => {
                        alert("Cập nhật sản phẩm thành công")
                        this.$emit('list')
                        this.hideFormUpdate();
                    })
                    .catch(err => {
                        console.log(err);
                    })

            } catch (err) {
                console.log(err);
            }
        },
        hideFormUpdate(){
            $("#"+this.id).modal('hide');
        }

    },
    created() {
        this.getProduct(this.id);
    }
}
</script>

<template>
    <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#'+this.id">
        <i class="fa-solid fa-pen"></i>
    </button>

    <div class="modal fade " :id="this.id" tabindex="-1" role="dialog" :aria-labelledby="this.id"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class=" p-5 form-update" style="line-height: 30px;">
                    <RouterLink to="/listproducts" @click="hideFormUpdate"  class="float-right text-danger h4"><i class="fa-solid fa-xmark"></i>
                    </RouterLink>
                    <h4 class="text-center font-weight-bold" style="color: rgb(35, 0, 91);" id="exampleModalLabel">Cập
                        Nhật Sản Phẩm</h4>
                    <div style="width: 100%; margin: auto;">
                        <form method="post" @submit.prevent="updateproduct()" enctype="multipart/form-data"
                            id="formaddproduct" class="text-left px-5">
                            <div class="form-group mt-1">
                                <label for="nameProduct">Tên Sách</label>
                                <input type="text" class="form-control form-input" id="nameProduct"
                                    placeholder="Nhập tên sách" required v-model="productName">
                            </div>
                            <div class="form-group col-md-4 p-0">
                                <label for="category">Thể loại</label>
                                <select id="category" name="category" class="form-control" v-model="category">
                                    <option value="Tiểu Thuyết">Tiểu Thuyết</option>
                                    <option value="Dân Gian">Dân Gian</option>
                                    <option value="Truyện Ngắn">Truyện Ngắn</option>
                                    <option value="Tình cảm">Tình cảm</option>
                                </select>
                            </div>
                            <div class="form-group mt-1">
                                <label for="author">Tác Giả</label>
                                <input type="text" class="form-control form-input" id="author"
                                    placeholder="Nhập tên tác giả" required v-model="author">
                            </div>
                            <div class="form-group mt-1">
                                <label for="nxb">Nhà Xuất Bản</label>
                                <input type="text" class="form-control form-input" id="nxb" placeholder="Nhập nhà xuất bản"
                                    required v-model="nxb">
                            </div>
                            <div class="form-group mt-1">
                                <label for="pageNumber">Số trang</label>
                                <input type="text" class="form-control form-input" id="pageNumber"
                                    placeholder="Nhập số trang" required v-model="numberPage">
                            </div>
                            <div class="form-group mt-1">
                                <label for="pageNumber">Năm phát hành</label>
                                <input type="text" class="form-control form-input" id="yearPublish"
                                    placeholder="Nhập năm phát hành" required v-model="yearPublish">
                            </div>
                            <div class="form-group mt-1">
                                <label for="price">Giá</label>
                                <input type="text" class="form-control form-input" id="price" placeholder="Nhập giá sách"
                                    required v-model="price">
                            </div>
                            <div class="form-group mt-1">
                                <label for="quantity">Số lượng còn trong kho</label>
                                <input type="text" class="form-control form-input" id="quantity"
                                    placeholder="Nhập số lượng còn trong kho" required v-model="quantity">
                            </div>
                            <div class="form-group mt-3 mb-0">
                                <label class="d-block" for="exampleFormControlFile1">Ảnh Sản Phẩm</label>
                                <div class="custom-file" style="width: 100%;">
                                    <label class="custom-file-label" for="customFile">Chọn ảnh</label>
                                    <input type="file" class="custom-file-input" id="customFile" ref="fileInput"
                                        @change="handleFile" accept="*" name="file">
                                </div>
                                <div class="input-group  rounded-pill shadow-sm d-block mt-3">
                                    <div>
                                        <img v-if="this.newImage == ''" v-bind:src="'/image/products/' + this.image" alt=""
                                            style="width: 200px;">
                                        <img v-else :src="newImage" alt="" width="200" height="200" />
                                    </div>
                                </div>
                            </div>
                            <span class="text-success">
                            </span>
                            <div class="form-check pl-0 ">
                                <button type="submit" class="btn form-input mt-2 font-weight-bold text-white w-100"
                                    style="background-color: #e39f29;">CẬP NHẬT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.form-update {
    background-color: white;
    border-radius: 10px;
}</style>