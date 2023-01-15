<template>
  <div class="shopping-cart">
    <!-- Title -->
    <div class="title">
      <h2>Shopping Bag</h2>
    </div>

    <div class="item" v-for="item in filter" :key="item._id">
      <div class="buttons">
        <span class="delete-btn"></span>
        <span class="like-btn"></span>
      </div>

      <div class="image">
        <img class="w-100 d-block" :src="item.images" alt="Image" />
      </div>

      <div class="description">
        <span>{{ item.title }}</span>
      </div>

      <div class="total-price">Rs. {{ item.price }}</div>

      <div class="description">
        <button class="btn1 btn-danger" v-on:click="dropItem(item._id)">
          Drop
        </button>
      </div>
    </div>

    <div class="total-price">
      <span>
        <b>Total Price: Rs. {{ sumTotal }}</b>
      </span>
    </div>
    <div>
      <button class="button btn btn-success" v-on:click="confirmOrder">
        {{ display ? "Cancel" : "Confirm" }} Order
      </button>
    </div>
    <hr />
    <div v-if="display">
      <h1>Confirm Order</h1>
      <b-card title="Bill" class="shopping-cart">
        <b-card-body>
          <label for="id">ID</label>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="mb-2" label-for="User ID">
              <b-form-input
                id="ID"
                v-model="orderDetail.userId"
                type="text"
                placeholder="ID"
              ></b-form-input>
            </b-form-group>
            <label for="id">Email</label>
            <b-form-group class="mb-2" label-for="email">
              <b-form-input
                id="email"
                v-model="orderDetail.email"
                type="email"
                :placeholder="currentUser.email"
              ></b-form-input>
            </b-form-group>
            <label for="id">Phone</label>
            <b-form-group class="mb-2" label-for="phone">
              <b-form-input
                id="phone"
                v-model="orderDetail.phone"
                type="text"
                :placeholder="currentUser.phone"
              ></b-form-input>
            </b-form-group>
            <label for="id">Address</label>
            <b-form-group class="mb-2" label-for="address">
              <b-form-input
                id="address"
                v-model="orderDetail.address"
                type="text"
                :placeholder="currentUser.address"
              ></b-form-input>
            </b-form-group>
            <label for="id">Total</label>
            <b-form-group class="mb-2" label-for="Total">
              <b-form-input
                id="totalPrice"
                v-model="sumTotal"
                type="text"
                placeholder="0"
              ></b-form-input>
            </b-form-group>
            <label for="id">Prder Price</label>
            <b-form-group class="mb-2" label-for="Total">
              <b-form-input
                id="orderPrice"
                v-model="sumTotal"
                type="text"
                placeholder="0"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label-for="Products">
              <div v-for="item in filter" :key="item._id">
                <p>{{ item.title }}</p>
              </div>
            </b-form-group>

            <div class="my-3 row justify-content-center">
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

<style lang="scss" scopped>
svg {
  transform: scale(0.5);
  margin: auto !important;
}

.shopping-cart {
  width: 750px;
  height: auto;
  margin: 80px auto;
  background: #ffffff;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  display: flex;
  flex-direction: column;
}

.title {
  height: 60px;
  letter-spacing: 2pt;
  font-weight: 900;
  border-bottom: 1px solid #e1e8ee;
  padding: 20px 30px;
  color: #5e6977;
  font-size: 18px;
}

.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
}

.item:nth-child(3) {
  border-top: 1px solid #e1e8ee;
  border-bottom: 1px solid #e1e8ee;
}
.buttons {
  position: relative;
  padding-top: 30px;
  margin-right: 60px;
  height: 30px;
  width: 30px;
}
.delete-btn,
.like-btn {
  display: inline-block;
  cursor: pointer;
}
.delete-btn {
  width: 18px;
  height: 17px;
  background: url(&amp;quot;delete-icn.svg&amp;quot;) no-repeat center;
}

.like-btn {
  position: absolute;
  top: 9px;
  left: 15px;
  //   background: url("twitter-heart.png");
  width: 60px;
  height: 60px;
  // background-size: 2900%;
  // background-repeat: no-repeat;
}
.is-active {
  animation-name: animate;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
}

@keyframes animate {
  0% {
    background-position: left;
  }
  50% {
    background-position: right;
  }
  100% {
    background-position: right;
  }
}
.image {
  margin-right: 50px;
  height: 50px;
  width: 50px;
}

.description {
  padding-top: 10px;
  margin-right: 60px;
  width: 115px;
}

.description span {
  display: block;
  font-size: 14px;
  color: #43484d;
  font-weight: 400;
}

.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939e;
}

button[class*="btn"] {
  width: 100px;
  height: 60px;
  background-color: #5a5c5f;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
}

button:focus,
input:focus {
  outline: 0;
}
.total-price {
  width: auto;
  margin: 27px;
  text-align: center;
  font-size: 18px;
  color: #43484d;
  font-weight: 600;
  align-self: center;
}
</style>
