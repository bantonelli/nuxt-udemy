<template>
    <div>
        <h1>Enter a user id and click the button!</h1>
        <input type="text" v-model="userID">
        <button @click="loadUser">Click Me!</button>
        <nuxt-child />
    </div>
</template>

<script>
export default {
    data() {
        return {
            userID: ''
        }
    },
    methods: {
        loadUser: function () {
            this.$router.push('/nested/' + this.userID);
        }
    }   
}
</script>

