<template>
    <div class="nav">
        <div style="background-color:  rgb(83, 83, 137); height: 100vh; width:100%; ">
            <router-link to="/homeadmin">
                    <button class="btn btn-product">OverView</button>
                </router-link>
                <router-link to="/listusers">
                    <button class="btn btn-product">User Management</button>
                </router-link>
            <router-link to="/listproducts">
                <button class="btn btn-product">Product Management</button>
            </router-link>
            <router-link to="/orders">
                <button class="btn btn-product">Orders Management</button>
            </router-link>
        </div>
    </div>
</template>

<style>
.btn-product{
    width: 100%;
    background-color: rgb(131, 131, 199);
    color: rgb(255, 255, 255);
    padding: 30px;
    margin: 5px;
    border-bottom: 2px solid black;
    font-weight: bold;
}
.btn-product:hover{
     background-color: rgb(57, 57, 94);
    
}
</style>