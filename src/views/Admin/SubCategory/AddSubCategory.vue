<template>
  <b-container>
    <b-card title="Add Sub Category">
      <b-card-body>
        <b-form @submit.prevent="onSubmit">
          <b-form-group class="mb-2" label="Title:" label-for="title">
            <b-form-input
              id="title"
              v-model="subCat.title"
              type="text"
              placeholder="Title"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mb-2"
            label="Main Category"
            label-for="main-category"
          >
            <b-form-select
              v-model="subCat._mainCategory"
              class="mb-3"
              id="main-category"
            >
              <b-form-select-option :value="null"
                >Please select an option</b-form-select-option
              >
              <b-form-select-option
                v-for="category in mainCategories"
                :value="category._id"
                :key="category._id"
                >{{ category.title }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Description:"
            label-for="input-2"
          >
            <b-form-input
              id="description"
              type="text"
              v-model="subCat.description"
              placeholder="Description"
              required
            ></b-form-input>
          </b-form-group>
          <div class="my-3 d-flex">
            <b-button type="submit" variant="primary">Add</b-button>
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    subCat: {
      title: "",
      description: "",
      _mainCategory: null,
    },
  }),
  computed: {
    mainCategories() {
      return this.$store.state.main_categories;
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      let Category = await this.$store.dispatch("addSubCategory", this.subCat);
      if (Category.error) {
        alert(Category.error);
      } else {
        this.$router.push("/admin/adminSubCategory");
      }
    },
  },
};
</script>
