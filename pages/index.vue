<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nuxt-firebase-prac
      </h1>
      <h2 class="subtitle">
        This is Nuxt.js with Firebase practice.
      </h2>
      <div class="links">
        <Home v-if="!isLogin"></Home>
        <Mypage v-if="isLogin"></Mypage>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase.config'
import AppLogo from '~/components/AppLogo.vue'
import Home from '~/components/Home.vue'
import Mypage from '~/components/Mypage.vue'

export default {
  components: {
    AppLogo,
    Home,
    Mypage    
  },
  asyncData (context) {
    // asyncData is called every time before loading the component
    return { isLogin:false}
  },
  fetch () {
    // The `fetch` method is used to fill the store before rendering the page
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLogin = true;
        this.$store.dispatch('auth/commitUser', user)
      } else {
        this.isLogin = false;
        this.$store.dispatch('auth/commitUser', null)
      };
    });
  },
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
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

