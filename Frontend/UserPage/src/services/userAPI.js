import API from "./API";
export default{
    register(phone,username,address,password){
        return API().post("/bookstore/users/register",{phoneNumber:phone,name:username,address:address,password:password})
    },
    login(phone,password){
        return API().post("/bookstore/users/login",{phoneNumber:phone,password:password})
    },
    logout(token){
        return API().get("/bookstore/users/logout",{params:{token:token}})
    },
    getInfor(token){
        return API().get("/bookstore/users/getinfor",{params:{token:token}})
    },
    
}