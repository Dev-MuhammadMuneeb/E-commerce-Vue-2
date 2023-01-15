<template>
  <div>
    <b-container>
      <b-card title="User Edit Form" class="my-5">
        <b-card-body>
          <b-form @submit.prevent="(e) => onSubmit(e, user)">
            <b-form-group class="mb-2" label="Id:" label-for="_id">
              <b-form-input
                id="_id"
                v-model="user._id"
                type="text"
                placeholder="_id"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-2" label="Name:" label-for="Name">
              <b-form-input
                id="title"
                v-model="user.name"
                type="text"
                placeholder="Enter Name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="email:" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="phone:" label-for="phone">
              <b-form-input
                id="phone"
                v-model="user.phone"
                type="text"
                placeholder="Enter phone"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-2" label="isAdmin:" label-for="isAdmin">
              <b-form-input
                id="isAdmin"
                v-model="user.isAdmin"
                type="text"
                placeholder="Enter isAdmin"
                required
              ></b-form-input>
            </b-form-group>

            <div class="my-3">
              <b-button type="submit" variant="primary">Update</b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  data: () => ({
    // user: {
    //   _id: "",
    //   name: "",
    //   email: "",
    //   phone: "",
    //   isAdmin: "",
    // },
  }),
  computed: {
    user() {
      return this.$store.getters.getUser(this.$route.params._id);
    },
  },
  mounted() {
    // console.log(this.$route.params);
    // this.user = this.$store.getters.getUser(this.$route.params._id);
    // console.log(this.user);
  },
  methods: {
    async onSubmit(e, newUser) {
      e.preventDefault();
      console.log("on Submit Data", newUser);
      let user = await this.$store.dispatch("editUser", { user: newUser });
      if (user.error) {
        alert("something went wrong. Please try again");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
