<script>
import userAPI from '../services/userAPI';
import Header from "../components/header.vue"
import Navbar from "../components/navbar.vue"
export default {
    name: "ListUsers",
    components: {
        Header,
        Navbar
    },
    data() {
        return {
            users: [],
            page: 1,
            totalpages: 0,
        }
    },
    methods: {
        async ListUsers() {
            await userAPI.listUsers(this.page).then((res) => {
                this.users = res.data.users;
                this.page = res.data.currentPage;
                this.totalpages = res.data.totalPages;
            })
        },
        async pageActive(page) {
            document.getElementById(this.page).classList.remove("active");
            this.page = page;
            this.ListUsers();
            const active = document.getElementById(page)
            active.classList.add("active");
        },
    },
    created() {
        this.ListUsers();
    }
}
</script>

<template>
    <Header></Header>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 p-0">
                <Navbar></Navbar>
            </div>
            <div class="col-md-10 p-3" style="background-color: rgb(249, 251, 255);">
                <div>
                    <h2 class="text-center my-3">DANH SÁCH KHÁCH HÀNG</h2>
                </div>
                <table class="table table-light" style="border: solid 2px rgba(223, 223, 223, 0.799);">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên Khách Hàng</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user, index in users" :key="user._id">
                            <th scope="row">{{ index + 1 }}</th>
                            <th scope="col">{{ user.name }}</th>
                            <th scope="col">{{ user.phoneNumber }}</th>
                            <th scope="col">{{ user.address }}</th>

                        </tr>
                    </tbody>
                </table>
                <div class="text-center" style="margin-left: 500px;">
                    <ul class="pagination">
                        <a class="page-link" v-if="this.page > 1" @click="pageActive(this.page - 1)"><i
                                class="fa-solid fa-angle-left"></i></a>
                        <li v-if="totalpages > 1" v-for="index in totalpages" class="page-item ">
                            <a class="page-link font-weight-bold" :id="index" @click="pageActive(index)">{{ index }}</a>
                        </li>
                        <a class="page-link" v-if="this.page < totalpages" @click="pageActive(parseInt(this.page) + 1)"><i
                                class="fa-solid fa-angle-right"></i></a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.page-link{
    padding:10px 15px;
}
.active{
    background-color: rgb(139, 143, 142);
}
</style>