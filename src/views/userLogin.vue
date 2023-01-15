<template>
  <div class="login-container my-5">
    <div class="mt-5">
      <h2 class="text-center">Login</h2>
    </div>
    <div class="m-5 row">
      <div class="col-md-5 ml-5">
        <div class="login-form">
          <b-card-body class="w-100">
            <b-form @submit.prevent="onSubmit">
              <b-form-group class="mb-2" label-for="email">
                <b-form-input
                  id="email"
                  v-model="loginInfo.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ emailError }}</small>
              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="passowrd"
                  type="password"
                  v-model="loginInfo.password"
                  placeholder="Please enter your password"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ passwordError }}</small>

              <div class="my-3 d-flex justify-content-between">
                <b-button type="submit" variant="primary">Login</b-button>
                <!-- <b-button variant="danger"
                  ><router-link to="/register">Register</router-link></b-button
                > -->
              </div>
            </b-form>
          </b-card-body>
        </div>
      </div>
      <div class="col-md-7">
        <img
          :src="require('@/assets/auth/auth-img.png')"
          alt="auth-img.png"
          class="w-100 d-block"
          srcset=""
        />
      </div>
    </div>
  </div>
</template>

<script>
// import api from '@/service/api.js'

export default {
  components: {},
  data: () => ({
    loginInfo: {
      email: "",
      password: "",
    },
    emailError: "",
    passwordError: "",
  }),
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      // let user = api().post("/session", loginInfo);
      let user = await this.$store.dispatch("loginUser", this.loginInfo);
      if (user.error) {
        alert(user.error);
      } else {
        this.$router.push("/");
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
h2 {
  font-weight: 900 !important;
  letter-spacing: 5pt;
}
.login-container {
  min-height: 100vh !important;
}
.login-form {
  margin-top: 150px;
}
</style>
