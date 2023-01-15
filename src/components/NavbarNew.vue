<template>
  <ul>
    <li>
      <router-link to="/" data-title="home"> Home </router-link>

      <!-- <a href="#" data-title="home">Home</a> -->
    </li>
    <!-- <li><a href="#" data-title="Portfolio">Portfolio</a></li> -->
    <li>
      <router-link to="/checkout" data-title="Cart">
        Cart({{ countCart }})
      </router-link>
      <!-- <a href="#"></a> -->
    </li>
    <li>
      <a
        data-title="user"
        :href="`http://127.0.0.1:5500/src/VirtualTryRoom/?&user=${currentUser.name}`"
        >VT-Room</a
      >
    </li>
    <li>
      <div v-if="currentUser.name">
        <div v-if="currentUser.isAdmin">
          <router-link to="/admin" data-title="user">
            {{ currentUser.name }}
          </router-link>
        </div>
        <div v-else>
          <router-link to="/myProfile" data-title="user">
            {{ currentUser.name }}
          </router-link>
        </div>
      </div>
      <div v-else>
        <router-link to="/login" data-title="user"> Login </router-link>
      </div>
    </li>
    <li>
      <div v-if="currentUser.name">
        <a @click="logoutUser" data-title="about"> Logout </a>
      </div>
      <div v-else>
        <router-link to="/register" data-title="about"> Register </router-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("loadCurrentUser");
  },
  computed: {
    ...mapState(["currentUser", "products", "cart"]),
    countCart() {
      return this.cart.length;
    },
    filter() {
      return this.cart.map((cartItem) =>
        this.products.find((item) => {
          return cartItem === item._id;
        })
      );
    },
    // filter() {
    //   return this.$store.getters.cartProducts;
    // },
    sumTotal() {
      return this.filter
        .map((item) => item.price)
        .reduce((prev, curr) => prev + curr, 0);
    },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser").then(() => this.$router.push("/"));
    },
    dropItem(_id) {
      this.$store.dispatch("removeFromCart", _id);
    },
  },
};
</script>

<style lang="scss" scoped>
$menu-background: #343e48;
$blue: #4795c3;
$grey: #686f77;
$yellow: #ecc64b;
$green: #0b9ea6;
$red: #f26667;

@import url(https://fonts.googleapis.com/css?family=Lato:100,400);

html {
  height: 100%;
  perspective: 1000px;
  transform-style: preserver-3d;
  font-family: lato, sans-serif;
}
body {
  background-color: lighten($blue, 30%);
  background: radial-gradient(
    closest-corner,
    lighten($blue, 30%) 60%,
    rgba(lighten($blue, 30%), 0.26)
  );
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}

ul {
  display: block;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  min-width: 535px;
  background-color: $menu-background;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB9JREFUeNpiZmBg6AZiDiBWZ4YyQMCOCcYA4kMAAQYAHyYCCUdxidgAAAAASUVORK5CYII=");
  }

  box-shadow: 0 3px 8px rgba(black, 0.5);
}

li {
  margin: 0 auto;
  display: inline-block;
  list-style: none;
  padding: 0;
}

a {
  display: block;
  padding: 25px;
  text-transform: uppercase;
  position: relative;
  z-index: 2;
  text-shadow: 1px 0px rgba(black, 0.4);
  color: $grey;
  letter-spacing: 0.2em;
  text-decoration: none;
  color: #fff !important;
  transition: color 200ms;
  transform-style: preserve-3d;
  &:hover {
    color: $menu-background;
  }
  &:after {
    content: attr(data-title);
    position: absolute;
    display: block;
    text-shadow: none;
    top: 29%;
    left: 18px;
    padding: 5px 7px;
    color: transparent;
    background: $blue;
    li:nth-child(2) & {
      background: $yellow;
    }
    li:nth-child(3) & {
      background: $green;
    }
    li:nth-child(4) & {
      background: $red;
    }
    transform-origin: 50% 0%;
    backface-visibility: hidden;
    transform: translate3d(0px, 105%, 0px) rotateX(-112deg);
    transform-style: preserve-3d;
    transition: all 200ms ease;
    z-index: -1;
  }
  &:hover:after {
    transform: rotateX(0deg) translateZ(0px);
  }
}
</style>
