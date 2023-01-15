<template>
  <b-container>
    <b-card title="Sub Category" class="my-5">
      <b-card-body>
        <div>
          <b-tabs content-class="mt-3" justified>
            <b-tab title="List" active>
              <AdminSubCategory />
            </b-tab>
            <b-tab title="Add">
              <AddSubCategory />
            </b-tab>
          </b-tabs>
        </div>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import AddSubCategory from "./AddSubCategory.vue";
import AdminSubCategory from "./AdminSubCategoryList.vue";

export default {
  components: {
    AddSubCategory,
    AdminSubCategory,
  },
};
</script>
