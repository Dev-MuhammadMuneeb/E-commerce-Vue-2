<template>
  <div>
    <b-container>
      <b-card title="Add New Product" class="my-5">
        <b-card-body>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="mb-2" label="Title:" label-for="Name">
              <b-form-input
                id="title"
                v-model="productInfo.title"
                type="text"
                placeholder="Enter Product title"
                required
              ></b-form-input>
            </b-form-group>
            <!-- <small class="text-danger">{{ titleError }}</small> -->
            <b-form-group class="mb-2" label="Description:" label-for="email">
              <b-form-input
                id="email"
                v-model="productInfo.description"
                type="text"
                placeholder="Enter description"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-2" label="Product URL:" label-for="email">
              <b-form-input
                id="email"
                v-model="productInfo.images"
                type="text"
                placeholder="Enter Product URL"
              ></b-form-input>
              <!-- required -->
            </b-form-group>
            <!-- <small class="text-danger">{{ productURLError }}</small> -->
            <b-form-group class="mb-2" label="Price:" label-for="Price">
              <b-form-input
                id="price"
                v-model="productInfo.price"
                type="text"
                placeholder="Enter price"
                required
              ></b-form-input>
            </b-form-group>
            <!-- <small class="text-danger">{{ priceError }}</small> -->
            <b-form-group
              class="mb-2"
              label="previous_price:"
              label-for="previous_price"
            >
              <b-form-input
                id="phone"
                v-model="productInfo.previous_price"
                type="text"
                placeholder="Enter previous_price"
                required
              ></b-form-input>
            </b-form-group>

            <!-- <small class="text-danger">{{ previous_priceError }}</small> -->
            <b-form-group
              id="input-group-2"
              label="Quantity:"
              label-for="input-2"
            >
              <b-form-input
                id="quantity"
                type="text"
                v-model="productInfo.quantity"
                placeholder="Enter quantity"
                required
              ></b-form-input>
            </b-form-group>
            <!-- <small class="text-danger">{{ quantityError }}</small> -->

            <b-form-select
              v-model="productInfo._mainCategory"
              class="mb-3"
              @change="onMainCategorySelect"
            >
              <b-form-select-option :value="null"
                >Please select an option</b-form-select-option
              >
              <b-form-select-option
                v-for="mainCategory in mainCategories"
                :key="mainCategory._id"
                :value="mainCategory._id"
                >{{ mainCategory.title }}</b-form-select-option
              >
            </b-form-select>

            <b-form-select
              v-if="subCategories.length > 0"
              v-model="productInfo._subCategory"
              class="mb-3"
            >
              <b-form-select-option :value="null"
                >Please select an option</b-form-select-option
              >
              <b-form-select-option
                v-for="sub in subCategories"
                :key="sub._id"
                :value="sub._id"
                >{{ sub.title }}</b-form-select-option
              >
            </b-form-select>
            <div class="my-3">
              <b-button type="submit" variant="primary">Add Product</b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    productInfo: {
      title: "",
      _mainCategory: null,
      _subCategory: null,
      description: "",
      images: "",
      price: "",
      previous_price: "",
      quantity: "",
    },
    subCategories: [],
  }),
  computed: {
    mainCategories() {
      return this.$store.state.main_categories;
    },
    allSubCategoires() {
      return this.$store.state.sub_categories;
    },
  },

  methods: {
    onMainCategorySelect() {
      console.log(this.allSubCategoires);
      this.subCategories = this.allSubCategoires.filter(
        (cat) => cat._mainCategory._id === this.productInfo._mainCategory
      );
      console.log("subcats ==", this.subCategories);
    },
    async onSubmit(e) {
      e.preventDefault();
      console.log(this.productInfo);
      let product = await this.$store.dispatch("addProduct", this.productInfo);
      if (product.error) {
        alert("Not Added. Please try again");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
