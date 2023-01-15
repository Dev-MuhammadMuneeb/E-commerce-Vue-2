<template>
  <div class="home space">
    <div class="row my-5 pt-5 hero">
      <div class="col-md-6">
        <div class="hero-text">
          <h2>Welcome to <span>VTR</span></h2>
          <p>
            VTR is a fusion of fashion and make online shopping in Pakistan
            convenient for its customer services cash on delivery. Enrich online
            shopping experience by navigating through large variety of
            high-quality fashion products covering a number of categories. Our
            fashion merchandise features all the local top class brands
            displaying their unique designs. We provide an excellent online
            shopping atmosphere for all ages and genders with complete customer
            satisfaction. We feel pride in being the only website that offers
            every kind of eastern and western wear.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <img
          :src="require('@/assets/home/hero.png')"
          alt="hero"
          class="w-100 d-block m-auto"
        />
      </div>
    </div>

    <b-container class="m-5">
      <h2>Our Products</h2>
      <router-link
        class="button btn1"
        v-if="currentUser.isAdmin"
        to="/admin/addProduct"
      >
        Add New Product
      </router-link>
    </b-container>
    <div class="row">
      <div class="col-md-4 mb-5" v-for="product in products" :key="product._id">
        <product-card :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCard from "../components/Products/ProductCard.vue";

export default {
  components: { ProductCard },

  mounted() {
    this.$store.dispatch("loadProducts");
    this.$store.dispatch("loadCurrentUser");
  },
  computed: {
    ...mapState(["products", "currentUser"]),
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 10px 0px;
}
h2 {
  font-family: "Titillium Web";
  color: #05595b;
  font-weight: 600 !important;
  font-size: 2rem;
  text-align: left !important;
}
.hero {
  .hero-text {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    height: 100% !important;
    h2 {
      span {
        letter-spacing: 2pt;
        font-weight: 900;
        padding: 0px 5px;
        cursor: pointer !important;
      }
      span:hover {
        color: #fff;
        background: #05595b;
      }
    }
  }
}
.button {
  background-color: #05595b;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.btn1 {
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}
.space {
  margin: 0px 200px;
}
</style>
