<template>
  <div>
    <b-table hover :items="sub_categories"></b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["sub_categories"]),
    },
}
</script>