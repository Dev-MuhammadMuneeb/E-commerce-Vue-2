<template>
  <div>
    <b-table hover :items="main_categories"></b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["main_categories"]),
    },
}
</script>