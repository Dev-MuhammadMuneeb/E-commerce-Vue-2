<template>
  <div>
    <b-container>
      <b-card title="Product Edit Form" class="my-5">
        <b-card-body>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="mb-2" label="Title:" label-for="Name">
              <b-form-input
                id="title"
                v-model="product.title"
                type="text"
                placeholder="Enter Product title"
                required
              ></b-form-input>
            </b-form-group>
            <!-- <small class="text-danger">{{ titleError }}</small> -->
            <b-form-group class="mb-2" label="Description:" label-for="email">
              <b-form-input
                id="email"
                v-model="product.description"
                type="text"
                placeholder="Enter description"
                required
              ></b-form-input>
            </b-form-group>
            <!-- <small class="text-danger">{{ descriptionError }}</small> -->
            <b-form-group class="mb-2" label="Price:" label-for="Price">
              <b-form-input
                id="price"
                v-model="product.price"
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
                v-model="product.previous_price"
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
                v-model="product.quantity"
                placeholder="Enter quantity"
                required
              ></b-form-input>
            </b-form-group>
            <!-- <small class="text-danger">{{ quantityError }}</small> -->

            <div class="my-3">
              <b-button type="submit" variant="primary">Update</b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  created() {
    // alert(this.$route.params._id)
  },
  data: () => ({
    product: {
      title: "",
      description: "",
      price: "",
      previous_price: "",
      quantity: "",
    },
  }),
  computed: {
    // ...mapState(["products"]),
    // product() {
    //   console.log(`getting product ${this.$route.params._id}`)
    //   return this.$store.getters.getProduct(this.$route.params._id);
    // },
  },
  mounted() {
    this.product = this.$store.getters.getProduct(this.$route.params._id);
    console.log(this.product);
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      let product = await this.$store.dispatch("editProduct", this.product);
      if (product.error) {
        alert("something went wrong. Please try again");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
