<template>
    <button @click="googleLogin">Login with Google</button>
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