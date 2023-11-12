<template>
    <div class="container-fluid d-flex" style="justify-content: space-between; background-color: rgb(143, 143, 215); height: 80px; border-bottom: solid 5px rgb(35, 0, 91); z-index: 1;">
        <img src="/image/logobook.png" style="width: 80px; height: 80px; margin-left: 50px; padding-bottom: 4px;" alt="">
        <h1 class=" text-white "  style="line-height: 80px; ">Admin Page</h1>
        <i class="fa-solid fa-right-from-bracket" @click="logout" style="font-size: 30px; color: black;   line-height: 80px; "></i>
    </div>
</template>

<script>
export default{
    methods:{
        logout(){
            sessionStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>