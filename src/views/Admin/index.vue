<template>
  <div>
    <b-container class="m-5">
      <h2>Welcome, {{ currentUser.name }}</h2>
      <div>
        <b-tabs content-class="mt-3" justified>
          <b-tab title="Users" active>
            <AdminUserList />
          </b-tab>
          <b-tab title="Add Product">
            <AdminAddProduct />
          </b-tab>
          <b-tab title="Main Category">
            <AdminMainCategory />
          </b-tab>
          <b-tab title="Sub Category">
            <AdminSubCategory />
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AdminAddProduct from "./Product/AdminAddProduct.vue";
import AdminUserList from "./User/AdminUserList.vue";
import AdminMainCategory from "./MainCategory/index.vue";
import AdminSubCategory from "./SubCategory/index.vue";

export default {
  components: {
    AdminAddProduct,
    AdminUserList,
    AdminMainCategory,
    AdminSubCategory,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
