<template>
  <div class="login-container my-5">
    <div class="mt-5">
      <h2 class="text-center">Register</h2>
    </div>
    <div class="m-5 row">
      <div class="col-md-5 ml-5">
        <div class="login-form">
          <b-card-body>
            <b-form @submit.prevent="onSubmit">
              <b-form-group class="mb-2" label-for="Name">
                <b-form-input
                  id="name"
                  v-model="registrationInfo.name"
                  type="text"
                  placeholder="Enter Name"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ nameError }}</small>
              <b-form-group class="mb-2" label-for="email">
                <b-form-input
                  id="email"
                  v-model="registrationInfo.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ emailError }}</small>
              <b-form-group class="mb-2" label-for="password">
                <b-form-input
                  id="password"
                  v-model="registrationInfo.password"
                  type="password"
                  placeholder="Enter Password"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ passwordError }}</small>
              <b-form-group class="mb-2" label-for="phone">
                <b-form-input
                  id="phone"
                  v-model="registrationInfo.phone"
                  type="text"
                  placeholder="Enter phone"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ phoneError }}</small>
              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="address"
                  type="text"
                  v-model="registrationInfo.address"
                  placeholder="Enter Address"
                  required
                ></b-form-input>
              </b-form-group>
              <small class="text-danger">{{ addressError }}</small>

              <div class="my-3 d-flex justify-content-between">
                <b-button type="submit" variant="primary">Register</b-button>
                <!-- <b-button variant="danger"
                  ><router-link to="/login">Login</router-link></b-button
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
    registrationInfo: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    emailError: "",
    passwordError: "",
    nameError: "",
    addressError: "",
    phoneError: "",
  }),
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      // let user = api().post("/users", this.registrationInfo)
      let user = await this.$store.dispatch(
        "registerUser",
        this.registrationInfo
      );
      if (user.error) {
        alert("something went wrong. Please try again");
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
  margin-top: 50px;
}
</style>
