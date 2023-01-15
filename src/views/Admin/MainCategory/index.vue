<template>
  <b-container>
    <b-card title="Main Category" class="my-5">
      <b-card-body>
        <div>
          <b-tabs content-class="mt-3" justified>
            <b-tab title="List" active>
              <AdminMainCategoryList />
            </b-tab>
            <b-tab title="Add">
              <AddMainCategory />
            </b-tab>
          </b-tabs>
        </div>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import AddMainCategory from "./AddMainCategory.vue";
import AdminMainCategoryList from "./AdminMainCategoryList.vue";
export default {
  components: {
    AddMainCategory,
    AdminMainCategoryList,
  },
};
</script>
