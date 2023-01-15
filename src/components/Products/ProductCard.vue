<template>
  <div
    class="multi-color-bg product-card cursor-pointer"
    @click="$router.push(`/products/${product._id}`)"
  >
    <div class="frame">
      <img
        :src="require('@/assets/img/' + product.images)"
        :alt="product.title"
        class="w-100 d-block"
      />
      <div class="title">
        <h2>{{ product.title }}</h2>
      </div>
    </div>
    <div class="content">
      <p>{{ product.description }}</p>
    </div>
    <div class="price">
      <h4>
        <b>Price : {{ product.price }} </b>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  mounted() {
    console.log("images ==>", this.product.images);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Fjalla+One|Montserrat:300,400,700,800|Open+Sans:300");
.product-card {
  font-family: "Titillium Web";
  min-height: 600px;
  max-height: 600px;
  .title {
    color: #fff;
    padding: 10px;
    min-height: 75px;
    max-height: 75px;
  }
  .content {
    color: #fff;
    padding: 10px;
    min-height: 120px;
    max-height: 120px;
  }
  .price {
    color: #fff;
    min-height: 12px;
    max-height: 12px;
    margin-bottom: 5px;
  }
  .frame {
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: 500ms all ease-in-out;
  }
  .frame:hover {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: #fff;
  }

  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    min-height: 350px;
    max-height: 350px;
  }
  h2 {
    color: #fff !important;
    font-weight: 900;
    font-size: 25px;
  }
}

.product-card:hover {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  h2 {
    // color: linear-gradient(
    //   to right bottom,
    //   #b91eda,
    //   #a02ae0,
    //   #8234e5,
    //   #5d3be8,
    //   #1241eb
    // ) !important;
    color: #3a3de9 !important;
  }
}
</style>
