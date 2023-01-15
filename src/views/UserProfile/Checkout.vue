<template>
  <div class="home space">
    <b-container class="m-4">
      <h1>Cart</h1>
    </b-container>
    <div class="row container">
      <div class="col-md-3" v-for="item in filter" :key="item._id">
        <div>
          <b-card
            :title="item.title"
            :img-src="item.images"
            img-alt="Image"
            class="card-img-top"
          >
            <b-card-text>
              <div><b> Price : </b> {{ item.price }}</div>

              <div><hr /></div>
              <div class="row justify-content-end">
                <button class="btn" v-on:click="dropItem(item._id)">
                  Drop
                </button>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <h4>Total: {{ sumTotal }}</h4>
    </div>
    <div class="my-3 justify-content-end">
      <button class="btn" v-on:click="confirmOrder">
        {{ display ? "Cancel" : "Confirm" }} Order
      </button>
    </div>
    <hr />
    <div>
      <h1>Confirm Order</h1>
      <b-card title="Bill" class="my-5">
        <b-card-body>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="mb-2" label="User ID:" label-for="User ID">
              <b-form-input
                id="ID"
                v-model="orderDetail.userId"
                type="text"
                placeholder="ID"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="email:" label-for="email">
              <b-form-input
                id="email"
                v-model="orderDetail.email"
                type="email"
                :placeholder="currentUser.email"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="phone:" label-for="phone">
              <b-form-input
                id="phone"
                v-model="orderDetail.phone"
                type="text"
                :placeholder="currentUser.phone"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="Address:" label-for="address">
              <b-form-input
                id="address"
                v-model="orderDetail.address"
                type="text"
                :placeholder="currentUser.address"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="Total Price:" label-for="Total">
              <b-form-input
                id="totalPrice"
                v-model="sumTotal"
                type="text"
                placeholder="0"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="Order Price:" label-for="Total">
              <b-form-input
                id="orderPrice"
                v-model="sumTotal"
                type="text"
                placeholder="0"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="Products:" label-for="Products">
              <div v-for="item in filter" :key="item._id">
                <p>{{ item.title }}</p>
              </div>
            </b-form-group>

            <div class="my-3 row justify-content-end">
              <b-button type="submit" class="btn btn-success">Buy</b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      display: false,
      orderDetail: {},
    };
  },

  computed: {
    ...mapState(["currentUser", "products", "cart"]),
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
  mounted() {
    // this.orderDetail.userId = this.currentUser._id;
    // this.orderDetail.address

    this.orderDetail = {
      ...this.orderDetail,
      address: this.currentUser.address,
      userId: this.currentUser._id,
      totalPrice: this.sumTotal,
      orderPrice: this.sumTotal,
      products: this.cart,
    };
  },
  methods: {
    dropItem(_id) {
      this.$store.dispatch("removeFromCart", _id);
    },
    confirmOrder() {
      console.log(this.currentUser);
      if (!this.display) {
        this.display = true;
      } else {
        this.display = false;
      }
    },
    async onSubmit() {
      // e.preventDefault();
      console.log(this.orderDetail);
      let order = await this.$store.dispatch("orderConfirm", this.orderDetail);
      if (order.error) {
        alert("something went wrong. Please try again");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.body {
  margin: 7%;
}
</style>
