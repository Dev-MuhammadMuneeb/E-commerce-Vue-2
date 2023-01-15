<template>
  <div class="app">
    <navbar-new />
    <div class="white-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Navbar from "./components/Navbar.vue";
import { mapState } from "vuex";
import NavbarNew from "./components/NavbarNew.vue";

export default {
  components: { NavbarNew },
  name: "app",
  computed: {
    ...mapState(["currentUser", "products"]),
  },
  mounted() {
    this.$store.dispatch("loadProducts");
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("loadMainCategory");
    this.$store.dispatch("loadSubCategory");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700;900&display=swap");
.white-container {
  background: #fff;
  margin: 0px 75px;
}

.multi-color-bg {
  background: linear-gradient(
    to right bottom,
    #b91eda,
    #a02ae0,
    #8234e5,
    #5d3be8,
    #1241eb
  ) !important;
}
.multi-color-font {
  background: linear-gradient(
    to right bottom,
    #b91eda,
    #a02ae0,
    #8234e5,
    #5d3be8,
    #1241eb
  ) !important;
}
.app {
  font-family: "Avenir", "Helvetica", "Arial", "sans-serif";
  // -webkit-font-smoothing antialiased
  // -moz-osx-font-smoothing grayscale
  text-align: center;
  color: #2c3e50 margin-top 60px;
  background: linear-gradient(
    to right bottom,
    #b91eda,
    #a02ae0,
    #8234e5,
    #5d3be8,
    #1241eb
  );
  height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-bottom: 50px;
}

a {
  text-decoration: none !important;
  color: #000000 !important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
