<template>
  <div>
    <!-- <b-table hover :items="users"> </b-table> -->

    <b-table-simple hover small caption-top responsive>
      <caption>
        List of all users
      </caption>
      <colgroup>
        <col />
        <col />
      </colgroup>
      <colgroup>
        <col />
        <col />
        <col />
      </colgroup>
      <colgroup>
        <col />
        <col />
      </colgroup>
      <b-thead class="text-center" head-variant="dark">
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Email</b-th>
          <b-th>Phone</b-th>
          <b-th>Status</b-th>
          <b-th>Address</b-th>
          <b-th>Actions</b-th>
        </b-tr>
      </b-thead>
      <b-tbody class="text-center">
        <b-tr v-for="user in users" :key="user._id">
          <b-td v-model="user.name">{{ user.name }}</b-td>
          <b-td v-model="user.email"> {{ user.email }} </b-td>
          <b-td v-model="user.phone">{{ user.phone }}</b-td>
          <b-td v-model="user.isAdmin">{{
            user.isAdmin ? "Admin" : "Customer"
          }}</b-td>
          <b-td v-model="user.name">{{ user.address }}</b-td>
          <b-td class="d-flex justify-content-around">
            <b-button variant="warning" @click="(e) => adminToggle(e, user)"
              >{{ user.isAdmin ? "Remove" : "Make" }} Admin</b-button
            >
            <b-button variant="primary">
              <!-- <b-button variant="primary" @click="() => handleRoute(user)"> -->
              <router-link :to="`/admin/editUser/${user._id}`">
                Edit User
              </router-link></b-button
            >
            <b-button variant="danger" @click="(e) => deleteUser(e, user)"
              >Remove User</b-button
            >
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tfoot>
        <b-tr>
          <b-td colspan="7" variant="secondary" class="text-right">
            Total Users: <b>{{ users.length }}</b>
          </b-td>
        </b-tr>
      </b-tfoot>
    </b-table-simple>

    <!-- <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">IsAdmin</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
      <td>{{user.isAdmin}}</td>
    </tr>
  </tbody>
</table> -->
    <!-- <div for="user from users" :key="user.name">
    {{user.name}}
  </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    user: {
      name: "",
      email: "",
      phone: "",
      isAdmin: "",
    },
  }),
  name: "AdminUserList",
  computed: {
    ...mapState(["users"]),
  },
  mounted() {
    console.log(this.users);
  },
  methods: {
    // handleRoute(user) {
    //   // console.log("user got", user);
    //   this.$router.push(`/admin/editUser/${user._id}`);
    // },
    async adminToggle(e, user) {
      e.preventDefault();
      let response = await this.$store.dispatch("editUser", {
        user,
        adminChange: true,
      });
      if (response.error) {
        alert("something went wrong. Please try again");
      } else {
        this.$router.push("/");
      }
    },
    async deleteUser(e, user) {
      e.preventDefault();
      console.log("delete button, user", user);
      let res = await this.$store.dispatch("deleteUser", user);
      if (res.error) {
        alert("something went wrong. Please try again");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
