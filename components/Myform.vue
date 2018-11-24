<template>
    <div id="myform">
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
                        <a href="/" class="button is-light">
                            Cancel
                        </a>
                    </p>
                </div>
            </div>
        </div>
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
  name: 'myform',
  data (context) {
    /**
     * It is called every time before loading the component
     */
    const data = {
      note_content: '',
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
  },
  methods: {
    save: function(value){
      // Note
      var newNoteKey = firebase.database().ref().child('notes').push().key;
      firebase
        .database()
        .ref('notes/' + this.$store.state.auth.user.uid　+ '/' + newNoteKey)
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
            .ref('images/'+ this.$store.state.auth.user.uid + '/' + newImageKey)
            .set({url: snapshot.ref.location.path})
            .then(()=>{
              this.$router.push({path: '/'})
            })
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
