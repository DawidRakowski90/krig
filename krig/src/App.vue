<template>
  <v-app>
    <v-main>
      <Home/>
      <v-dialog fullscreen pernament v-model="showLogo">
        <div style="width: 100%; height: 100%" class="d-flex align-center justify-center">

          <v-img src="./assets/kriglogo.png" max-width="50%"/>
        </div>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/home.vue';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    showLogo: false
  }),

  mounted() {
    // setTimeout(() => {
    //   this.showLogo = false
    // }, 2000)
  }
};
</script>
