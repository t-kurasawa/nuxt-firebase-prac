<template>
  <div id="mypage">
    <span>Hello, {{ user.displayName }}</span>
    <button @click="logout">Logout</button>
    <p><textarea v-model="note_content"></textarea></p>
    <p><button @click="saveContent(note_content)">Save Note</button></p>
    <h2>Your Note</h2>
    <p>{{ note_content }}</p>
    <div id='notesIndex' v-for="note in notes" :key="note.content">
      <p class="noteContent">{{ note.content }}</p>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase.config'
export default {
  name: 'mypage',
  props: ['user'],
  data (context) {
    // It is called every time before loading the component
    return { note_content: 'Hello Nuxt.js', notes:[]}
  },
  created: function() {
    firebase
      .database()
      .ref('notes/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.notes = result.val();
        }
      })
  },  
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
    saveContent: function(value) {
      var newNoteKey = firebase.database().ref().child('notes').push().key;
      firebase
        .database()
        .ref('notes/' + this.user.uid　+ '/' + newNoteKey)
        .set({content:value});
    }    
  }
}
</script>