import Vue from "vue";
import Vuex from "vuex";
import api from "@/service/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    currentUser: {},
    users: [],
    main_categories: [],
    sub_categories: [],
    cart: [],
    order: [],
  },
  mutations: {
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, user) {
      window.localStorage.currentUser = JSON.stringify(user);
      state.currentUser = user;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_NEWPRODUCT(state, product) {
      state.products.push(product);
    },
    EDIT_PRODUCT(state, product) {
      state.products.forEach((p) => {
        if (p._id == product._id) {
          p = product;
        }
      });
    },
    SET_MAINCATEGORY(state, main_categories) {
      state.main_categories = main_categories;
    },
    SET_NEWMAINCAT(state, main_categories) {
      state.main_categories.push(main_categories);
    },
    SET_SUBCATEGORY(state, sub_categories) {
      state.sub_categories = sub_categories;
    },
    SET_NEWSUBCAT(state, sub_categories) {
      state.sub_categories.push(sub_categories);
    },
    EDIT_USER(state, user) {
      state.users.forEach((u) => {
        if (u._id == user._id) {
          u = user;
        }
      });
    },
    DELETE_USER(state, user) {
      state.users = state.users.filter((u) => u._id === user._id);
    },
    ADDTOCART(state, _id) {
      state.cart.push(_id);
    },
    REMOVEFROMCART(state, _id) {
      state.cart.pop(_id);
    },
    ORDERCONFIRMED(state, order) {
      state.order.push(order);
    },
  },
  actions: {
    async loadCurrentUser({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser);
      commit("SET_CURRENT_USER", user);
    },
    async loadProducts({ commit }) {
      let response = await api().get("/products");
      // console.log(response);
      let products = response.data.result;
      commit("SET_PRODUCTS", products);
    },
    async loadUsers({ commit }) {
      let response = await api().get("/users");
      let users = response.data;
      commit("SET_USERS", users);
    },
    async loginUser({ commit }, loginInfo) {
      try {
        let response = await api().post("/sessions", loginInfo);
        let data = response.data;
        //console.log(data.user);
        commit("SET_CURRENT_USER", data.user);
        return data.user;
      } catch (e) {
        let user = {};
        user.error = "Wrong Email / Password combination. ";
        // { error : "Email / Password combination was incorrect. Please try again."}
        return user;
      }
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async registerUser({ commit }, registerationInfo) {
      try {
        console.log(registerationInfo);
        let response = await api().post("/users", registerationInfo);
        let user = response.data;

        commit("SET_CURRENT_USER", user);

        return user;
      } catch (e) {
        let user = {};
        console.log(e);
        user.error = "There is an error. Please try again.";
        return user;
      }
    },
    async addProduct({ commit }, productInfo) {
      try {
        console.log("Check Values ::", productInfo);
        let response = await api().post("/products", productInfo);
        let product = response.data.result;
        commit("SET_NEWPRODUCT", product);
        console.log(product);
        return product;
      } catch (e) {
        let product = {};
        product.error = "There is an error. Please try again.";
        return product;
      }
    },
    async loadMainCategory({ commit }) {
      let response = await api().get("/main_categories");
      let main_categories = response.data;
      commit("SET_MAINCATEGORY", main_categories);
    },
    async loadSubCategory({ commit }) {
      let response = await api().get("/sub_categories");
      // console.log(response.data);
      let sub_categories = response.data;
      commit("SET_SUBCATEGORY", sub_categories);
    },
    async editProduct({ commit }, product) {
      // let response = await api().put(`/products/${product._id}`, product);
      let response = await api().post("/products/update_product", product);
      let newProduct = response.data;
      commit("EDIT_PRODUCT", newProduct);
      return newProduct;
    },
    async addMainCategory({ commit }, mainCat) {
      try {
        let response = await api().post("/main_categories", mainCat);
        let main_category = response.data;
        console.log(main_category);
        commit("SET_NEWMAINCAT", main_category);
        return main_category;
      } catch (e) {
        let main_categories = {};
        main_categories.error = "There is an error. Please try again.";
        return main_categories;
      }
    },
    async addSubCategory({ commit }, subCat) {
      try {
        let response = await api().post("/sub_categories", subCat);
        let sub_category = response.data;
        console.log(sub_category);
        commit("SET_NEWSUBCAT", sub_category);
        return sub_category;
      } catch (e) {
        let sub_categories = {};
        sub_categories.error = "There is an error. Please try again.";
        return sub_categories;
      }
    },
    async editUser({ commit }, { user, adminChange = false }) {
      let response;
      console.log("editUser (store) =>", user);
      if (adminChange) {
        user.isAdmin = !user.isAdmin;
      }
      response = await api().post("/users/updateUser", user);
      let newUser = response.data;
      console.log("new user ", newUser);
      commit("EDIT_USER", newUser);
      return newUser;
    },
    async deleteUser({ commit }, user) {
      try {
        console.log("deleteUser got user =>", user);
        let response = await api().post("/users/delete_user", {
          _id: user._id,
        });
        if (response.status == 202) {
          commit("DELETE_USER", response.data.user);
        } else {
          console.log("not found?", response);
        }
        console.log(response);
      } catch (error) {
        console.log("error in catch");
        console.log(error);
      }
    },
    addToCart({ commit }, _id) {
      commit("ADDTOCART", _id);
    },
    removeFromCart({ commit }, _id) {
      commit("REMOVEFROMCART", _id);
    },
    async orderConfirm({ commit }, order) {
      try {
        console.log(" confirmed :", order);
        let response = await api().post("/orders", order);
        console.log("Orders Res :", response);
        let orderConfirmed = response.data;

        commit("ORDERCONFIRMED", orderConfirmed);

        return orderConfirmed;
      } catch (e) {
        let user = {};
        console.log(e);
        user.error = "There is an error. Please try again.";
        return user;
      }
    },
  },
  getters: {
    getProduct: (state) => (_id) => {
      return state.products.find((product) => product._id === _id);
    },
    getUser: (state) => (_id) => {
      console.log("_id got", _id);
      console.log("users =>", state.users);
      return state.users.find((user) => user._id === _id);
    },
    // cartProducts(state) {
    //   return state.cart.map((cartItem) => {
    //     const item = state.products.find((item) => cartItem._id === item._id);
    //     return item;
    //   });
    // },
  },
  modules: {},
});
