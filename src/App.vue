<template>
  <div>
    <Navbar v-if="$store.state.isAuthenticated" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'


export default {
  data() {
    return {
      v: false
    }
  },
  components: { Navbar },
  mounted() {
    this.v = this.$store.state.login;
    console.log("ddd", this.$store.state.login); // Should work now

  }

}
</script>