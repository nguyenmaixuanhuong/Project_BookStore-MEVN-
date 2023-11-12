import API from "./API";
export default{
    login(phone,password){
        return API().post("/bookstore/users/loginad",{phoneNumber:phone,password:password})
    },
    logout(token){
        return API().get("/bookstore/users/logout",{params:{token:token}})
    },
    listUsers(page){
        return API().get("/bookstore/users/listusers",{params:{page:page}})
    }

}