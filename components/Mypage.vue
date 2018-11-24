<template>
  <div id="mypage">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="user.photoURL" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ user.displayName }}</p>
            <p class="subtitle is-6">@{{ user.uid }}</p>
          </div>
        </div>

        <div class="content">
          <label class="label">Notes</label>
          <div id='notesIndex' v-for="note in notes" :key="note.content">
            {{ note.content }}
          </div>
          <label class="label">Images</label>
          <div class="columns">
            <div id='imagesIndex' v-for="image in images" :key="image.url">
              <div class="column">
                <figure class="image is-128x128">
                  <img :src="image.url">
                </figure>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="card-footer">
        <span class="card-footer-item">
          <a href="#" class="button is-primary">
            <i class="fa fa-thumbs-o-up"></i>
          </a>
        </span>
        <span class="card-footer-item">
          <a href="#" class="button is-danger">
            <i class="fa fa-thumbs-o-down"></i>
          </a>
        </span>
        <span class="card-footer-item">
          <a href="#" class="button is-info">
            <i class="fa fa-retweet"></i>
          </a>
        </span>
      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Notes</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Hello Nuxt.js" v-model="note_content">
          </div>
        </div>
        <div class="field">
          <label class="label">Images</label>
          <div class="control">
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" @change="selectFile">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <a class="button is-primary" @click="save(note_content)">
              Submit
            </a>
          </p>
          <p class="control">
            <a class="button is-light">
              Cancel
            </a>
          </p>
        </div>
      </div>
    </div>
    <a class="button is-danger is-rounded" @click="logout">Logout</a>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 8px;
  text-align: left;
}
</style>

<script>
import firebase from '@/plugins/firebase.config'
export default {
  name: 'mypage',
  props: ['user'],
  data (context) {
    /**
     * It is called every time before loading the component
     */
    const data = {
      note_content: 'Hello Nuxt.js',
      notes:[],
      images:[],
      uploadFile: null,
      infoMsg: null,
    }
    return data
  },
  beforeCreate: function(){
    /**
     * It is called every time before loading the component
     */
  },
  created: async function() {
    /**
     * It is called every time after loading the component
     */
    // Get notes from Realtime Database
    const notes = await firebase.database().ref('notes/' + this.user.uid).once('value')
    if (notes.val()) {
      this.notes = notes.val();
    }

    // Get files from Storage
    const rtImages = await firebase.database().ref('images/' + this.user.uid).once('value')
    if (rtImages.val()) {
      const images = []
      Object.values(rtImages.val()).map(async (image)=>{
        const url = await firebase.storage().ref().child(image.url).getDownloadURL()
        images.push({
          url:url
        })
      })
      this.images = images
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
    save: function(value){
      // Note
      var newNoteKey = firebase.database().ref().child('notes').push().key;
      firebase
        .database()
        .ref('notes/' + this.user.uid　+ '/' + newNoteKey)
        .set({content:value});

      // Image
      if (!this.uploadFile) {
          this.infoMsg = 'select file'
          return;
      }
      var storageRef = firebase.storage().ref().child('images/' + this.uploadFile.name);
      storageRef.put(this.uploadFile).then((snapshot) =>{
          console.log('Uploaded a blob or file!');
          const newImageKey = firebase.database().ref().child('images').push().key;
          firebase
            .database()
            .ref('images/'+ this.user.uid + '/' + newImageKey)
            .set({url: snapshot.ref.location.path});
      });
    },
    selectFile: function (e) {
        e.preventDefault();
        let files = e.target.files;
        this.uploadFile = files[0];
    },
  }
}
</script>