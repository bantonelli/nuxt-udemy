<template>
  <section class="container">
    <h1>Hello!</h1>
    <div>
      <a href="/users/1" class="">Link to user 1</a>
    </div>
    <div>
      <router-link to="/users/r1" class="">Router-link to user 1</router-link>
    </div>
    <div>
      <nuxt-link to="/users/n1" class="">Nuxt-link to user 1</nuxt-link>
    </div>
    <div>
      <button @click="loadProducts">Go To Products</button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  methods: {
    loadProducts () {
      this.$router.push('/products');
    }
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: block;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
