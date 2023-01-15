<template>
    <b-container>
        <b-card title="Add Main Category">
            <b-card-body>
                <b-form @submit.prevent="onSubmit">
                <b-form-group class="mb-2" label="Title:" label-for="title">
                    <b-form-input
                    id="title"
                    v-model="mainCat.title"
                    type="text"
                    placeholder="Title"
                    required
                    ></b-form-input>
                </b-form-group>
                
                <b-form-group
                    id="input-group-2"
                    label="Description:"
                    label-for="input-2"
                >
                    <b-form-input
                    id="description"
                    type="text"
                    v-model="mainCat.description"
                    placeholder="Description"
                    required
                    ></b-form-input>
                </b-form-group>
                <div class="my-3 d-flex">
                    <b-button type="submit" variant="primary">Add</b-button>
                </div>
                </b-form>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
export default {
    data: () => ({
        mainCat: {
            title: "",
            description: "",
        },
    }),
    methods: {
        async onSubmit(e) {
        e.preventDefault();
        let Category = await this.$store.dispatch("addMainCategory", this.mainCat);
        if (Category.error) {
                alert(Category.error)
        } else {
                this.$router.push("/admin/adminMainCategory");
        }
    },
  },
}
</script>