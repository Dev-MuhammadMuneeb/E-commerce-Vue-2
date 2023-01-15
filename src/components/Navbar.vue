<template>
  <b-navbar toggleable="md" type="dark" variant="Light" class="custom-nav mb-5">
    <b-container>
      <b-navbar-brand class="logo">
        <router-link to="/" class="yellow">
          V<span class="white">T</span>R
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="currentUser.name">
          <b-nav-item>
            <!-- <h6>Welcome! {{ currentUser.name }}</h6> -->
            <router-link to="/admin">
              <b> Welcome, {{ currentUser.name }} </b>
            </router-link>
          </b-nav-item>
          <span class="div_right">
            <b-navbar-nav class="ml-auto">
              <b-nav-item v-b-modal.shopping-cart>
                <b-dropdown variant="primary">
                  <template #button-content>Cart [{{ countCart }}]</template>
                  <b-dropdown-item-button> </b-dropdown-item-button>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group header="Items">
                    <b-dropdown-item-button
                      v-for="item in filter"
                      :key="item._id"
                    >
                      <b-card
                        :title="item.title"
                        tag="article"
                        style="max-width: 15rem"
                      >
                        <b-card-text>
                          <div>Price: {{ item.price }}</div>
                        </b-card-text>

                        <b-button
                          v-on:click="dropItem(item._id)"
                          variant="danger"
                          >drop</b-button
                        >
                      </b-card>
                    </b-dropdown-item-button>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button variant="danger">
                      <div>Total : {{ sumTotal }}</div>
                    </b-dropdown-item-button>
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>

                  <b-dropdown-item-button variant="danger">
                    <router-link to="/checkout" class="btn btn-primary"
                      >Checkout</router-link
                    >
                  </b-dropdown-item-button>
                </b-dropdown>
              </b-nav-item>
            </b-navbar-nav>
            <b-nav-item v-if="currentUser.isAdmin">
              <router-link to="/admin"> Admin </router-link>
            </b-nav-item>
            <b-nav-item v-else>
              <router-link to="/myProfile"> Profile </router-link>
            </b-nav-item>
            <b-nav-item>
              <a @click="logoutUser"> Logout </a>
            </b-nav-item>
          </span>
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <b-nav-item>
            <router-link to="/login">
              <b> Login </b>
            </router-link>
          </b-nav-item>
          <b-nav-item v-if="currentUser.name == null">
            <router-link to="/register">
              <b> Register </b>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
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
.custom-nav {
  font-family: "Titillium Web";
  background: #05595b;
  color: #fff !important;
  .yellow {
    color: #e2d784 !important;
  }
  .white {
    color: #f5f5f5 !important;
  }
  .logo {
    a {
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: 10pt;
    }
  }
  a {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 2pt;
    // margin-right: 20px;
    color: #fff !important;
    transition: 500ms all;
  }
  a:hover {
    color: #05595b !important;

    background: #fff;
  }
}

// .div_right {
//   display: flex;
//   position: relative;
//   right: -900px;
// }
</style>
