<template>
  <div>
    <div class="">
      <div class="card">
        <div class="card__title">
          <div class="icon">
            <a href="#"><i class="fa fa-arrow-left"></i></a>
          </div>
          <h3>Shirts</h3>
        </div>
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <h1>{{ product.title }}</h1>
              <!-- <p class="sub">Office Chair</p> -->
              <div>
                <p class="price">Rs. {{ product.price }}</p>
              </div>
            </div>
            <div class="image">
              <img
                :src="require('@/assets/img/' + product.images)"
                alt="product image"
              />
            </div>
          </div>
          <div class="half">
            <div class="description">
              <p>
                {{ product.description }}
              </p>
            </div>
            <span class="stock"><i class="fa fa-pen"></i> In stock</span>
            <!-- <div class="reviews">
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star-o"></i></li>
              </ul>
              <span>(64 reviews)</span>
            </div> -->
          </div>
        </div>
        <div class="card__footer">
          <div class="recommend">
            <!-- <p>Recommended by</p>
            <h3>Andrew Palmer</h3> -->
          </div>
          <div class="action">
            <button
              v-if="currentUser.isAdmin"
              type="button"
              v-on:click="EditProduct(product._id)"
            >
              Edit Product
            </button>
            <button type="button" v-on:click="AddToCart(product._id)">
              Add to cart
            </button>
            <button>
              <!-- <a
                data-title="user"
                :href="`http://127.0.0.1:5500/src/VirtualTryRoom/?&user=${currentUser.name}`"
                >VT-Room</a
              > -->
              <a
                data-title="user"
                :href="`http://127.0.0.1:5500/src/VirtualTryRoom/?&product=${product.title}`"
                >VT-Room</a
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser"]),
    product() {
      return this.$store.getters.getProduct(this.$route.params.id);
    },
  },
  methods: {
    AddToCart(_id) {
      console.log(_id);
      this.$store.dispatch("addToCart", _id);
      this.$router.push("/");
    },
    EditProduct(_id) {
      const path = "/admin/editProduct/" + _id.toString();
      console.log("path = ", path);
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scopped>
@import url("https://fonts.googleapis.com/css?family=Fjalla+One|Montserrat:300,400,700,800|Open+Sans:300");

body {
  background-image: linear-gradient(
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
}

main {
  max-width: 720px;
  margin: 5% auto;
}

.card {
  box-shadow: 0 6px 6px rgba(#000, 0.3);
  transition: 200ms;
  background: #fff;

  .card__title {
    display: flex;
    align-items: center;
    padding: 30px 40px;

    h3 {
      flex: 0 1 200px;
      text-align: right;
      margin: 0;
      color: #252525;
      font-family: sans-serif;
      font-weight: 600;
      font-size: 20px;
      text-transform: uppercase;
    }

    .icon {
      flex: 1 0 10px;
      background: #115dd8;
      color: #fff;
      padding: 10px 10px;
      transition: 200ms;

      > a {
        color: #fff;
      }

      &:hover {
        background: #252525;
      }
    }
  }

  .card__body {
    padding: 0 40px;
    display: flex;
    flex-flow: row no-wrap;
    margin-bottom: 25px;

    > .half {
      box-sizing: border-box;
      padding: 0 15px;
      flex: 1 0 50%;
    }

    .featured_text {
      h1 {
        margin: 0;
        padding: 0;
        font-weight: 800;
        font-family: "Montserrat", sans-serif;
        font-size: 64px;
        line-height: 50px;
        color: #181e28;
      }

      p {
        margin: 0;
        padding: 0;

        &.sub {
          font-family: "Montserrat", sans-serif;
          font-size: 26px;
          text-transform: uppercase;
          color: #686e77;
          font-weight: 300;
          margin-bottom: 5px;
        }

        &.price {
          font-family: "Fjalla One", sans-serif;
          color: #252525;
          font-size: 26px;
        }
      }
    }

    .image {
      padding-top: 15px;
      width: 100%;

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }

    .description {
      margin-bottom: 25px;
      margin-top: 50px;

      p {
        margin: 0;
        font-family: "Open Sans", sans-serif;
        font-size: 25px !important;
        font-weight: 500;
        text-align: left;
        // line-height: 27px;
        // font-size: 16px;s
        color: rgb(56, 56, 56);
      }
    }

    span.stock {
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      color: #a1cc16;
    }

    .reviews {
      //   .stars {
      //     display: inline-block;
      //     list-style: none;
      //     padding: 0;

      //     > li {
      //       display: inline-block;

      //       .fa {
      //         color: #f7c01b;
      //       }
      //     }
      // }

      > span {
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        margin-left: 5px;
        color: #555;
      }
    }
  }

  .card__footer {
    padding: 30px 40px;
    display: flex;
    flex-flow: row no-wrap;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 40px;
      width: calc(100% - 40px);
      height: 3px;
      background: #115dd8;
      background: linear-gradient(
        to right,
        #115dd8 0%,
        #115dd8 20%,
        #ddd 20%,
        #ddd 100%
      );
    }

    .recommend {
      flex: 1 0 10px;

      p {
        margin: 0;
        font-family: "Montserrat", sans-serif;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 14px;
        color: #555;
      }

      h3 {
        margin: 0;
        font-size: 20px;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        color: #115dd8;
      }
    }

    .action {
      button {
        cursor: pointer;
        border: 1px solid #115dd8;
        padding: 14px 30px;
        border-radius: 200px;
        color: #fff;
        background: #115dd8;
        font-family: "Open Sans", sans-serif;
        font-size: 16px;
        transition: 200ms;

        &:hover {
          background: #fff;
          color: #115dd8;
        }
      }
    }
  }
}
</style>
