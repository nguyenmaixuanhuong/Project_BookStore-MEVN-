<script>
export default{
  methods:{
    auth(){
      if(sessionStorage.getItem("id") == null){
        this.$router.push("/")
      }
    }
  },
  created(){
    this.auth();
  }
}

</script>

<template>
  <router-view></router-view>
</template>
