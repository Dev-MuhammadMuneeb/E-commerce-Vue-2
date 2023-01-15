<template>
  <div>
    <b-container>
      <!-- <h3>
        Welcome to your Profile <b>{{ currentUser.name }}</b>
      </h3> -->
      <b-card title="Edit If need any changes" class="my-5">
        <b-card-body>
          <b-form @submit.prevent="(e) => onSubmit(e, user)">
            <b-form-group class="mb-2" label="Title:" label-for="Name">
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

            <b-form-group class="mb-2" label="Address:" label-for="Address">
              <b-form-input
                id="Address"
                v-model="user.address"
                type="text"
                placeholder="Enter Address"
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
import { mapState } from "vuex";

export default {
  data: () => ({
    user: {
      _id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  }),
  mounted() {
    this.user = this.currentUser;
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async onSubmit(e, newUser) {
      e.preventDefault();
      console.log("Profile info :", newUser);
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
