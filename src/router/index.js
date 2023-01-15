import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegisteration from "../views/UserRegisteration.vue";
import admin from "../views/Admin/index.vue";
import adminUserList from "../views/Admin/User/AdminUserList.vue";
import adminEditProduct from "../views/Admin/Product/AdminEditProduct.vue";
import adminAddProduct from "../views/Admin/Product/AdminAddProduct.vue";
import addMainCategory from "../views/Admin/MainCategory/AddMainCategory.vue";
import adminMainCategory from "../views/Admin/MainCategory/index.vue";
import addSubCategory from "../views/Admin/SubCategory/AddSubCategory.vue";
import adminSubCategory from "../views/Admin/SubCategory/index.vue";
import adminEditUser from "../views/Admin/User/AdminEditUser.vue";
import userProfile from "../views/UserProfile/UserProfile.vue";
// import userCheckout from "../views/UserProfile/Checkout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "user-login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "user-registeration",
    component: UserRegisteration,
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: () => import("../views/Products/ProductDetails.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/UserProfile/CheckoutNew.vue"),
  },
  {
    path: "/admin",
    name: "admin-user",
    component: admin,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/addMainCategory",
    name: "addMainCategory",
    component: addMainCategory,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/adminMainCategory",
    name: "adminMainCategory",
    component: adminMainCategory,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/addSubCategory",
    name: "addSubCategory",
    component: addSubCategory,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/adminSubCategory",
    name: "adminSubCategory",
    component: adminSubCategory,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/editProduct/:_id",
    name: "adminEditProduct",
    params: true,
    component: adminEditProduct,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/addProduct",
    name: "adminAddProduct",
    component: adminAddProduct,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/userList",
    name: "adminUserList",
    component: adminUserList,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/editUser/:_id",
    name: "adminEditUser",
    params: true,
    component: adminEditUser,
    // beforeEnter(to, from, next) {
    //   let currentUser = JSON.parse(window.localStorage.currentUser);
    //   next();
    //   // if (currentUser && currentUser.isAdmin) {
    //   //   next();
    //   // } else {
    //   //   next("/");
    //   // }
    // },
  },
  {
    path: "/myProfile",
    name: "userProfile",
    component: userProfile,
  },
  // {
  //   path: "/checkout",
  //   name: "checkout",
  //   component: userCheckout,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
