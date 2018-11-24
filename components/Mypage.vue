<template>
  <div id="mypage">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="this.$store.state.auth.user.photoURL" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ this.$store.state.auth.user.displayName }}</p>
            <p class="subtitle is-6">@{{ this.$store.state.auth.user.uid }}</p>
          </div>
        </div>

        <div class="content">
          <label class="label">Notes</label>
          <div class="tags">
            <div id='notesIndex' v-for="note in notes" :key="note.content">
              <span class="tag">
                {{ note.content }}
              </span>            
            </div>
          </div>
          <label class="label">Images</label>
          <div id='imagesIndex' v-for="image in images" :key="image.url">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96">
                  <img :src="image.url">
                </figure>
              </div>
              <div class="media-content">
                <p class="subtitle is-6">{{image.url}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <span class="card-footer-item">
          <a href="/regist" class="button is-primary">
            Regist
          </a>
        </span>
        <span class="card-footer-item">
          <a class="button is-danger" @click="logout">
            Logout
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 8px;
  text-align: left;
}
.tag {
  margin-right: 4px;
}
.media {
  margin-bottom: 4px;
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
      notes:[],
      images:[]
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
    const notes = await firebase.database().ref('notes/' + this.$store.state.auth.user.uid).once('value')
    if (notes.val()) {
      this.notes = notes.val();
    }

    // Get files from Storage
    const rtImages = await firebase.database().ref('images/' + this.$store.state.auth.user.uid).once('value')
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
      firebase.auth().signOut().then(()=>{
        this.$store.dispatch('auth/commitUser', null)
      });
    },
  }
}
</script>