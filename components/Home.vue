<template>
    <a class="button is-info" @click="googleLogin">
      Login with Google
    </a>
</template>

<script>
import firebase from '@/plugins/firebase.config'
export default {
  name: 'home',
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
}
</script>