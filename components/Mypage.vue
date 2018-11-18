<template>
  <div id="mypage">
    <span>Hello, {{ user.displayName }}</span>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase.config'
export default {
  name: 'mypage',
  props: ['user'],
  methods: {
    logout: function() {
      firebase.auth().signOut();
    }
  }
}
</script>