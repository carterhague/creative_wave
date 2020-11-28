<template>
<div class="photo">
  <p v-if="error">{{error}}</p>
  <div v-if="photoData" class="photoDisplay">
    <div class="image">
      <img :src="this.photoData.path" />
    </div>
    <div class="photoInfo">
      <p class="photoTitle">{{this.photoData.title}}</p>
      <p class="photoName">{{this.photoData.user.firstName}} {{this.photoData.user.lastName}}</p>
    </div>
    <p class="photoDate">{{formatDate(this.photoData.created)}}</p>
    <br>
    <p class="photoDescription">{{this.photoData.description}}</p>
  </div>
  <div class="songControls">
    <audio src="demo.mp3" controls></audio>
  </div>
  <div class="comments" v-if="haveComments">
    <comments :comments="comments"/>
  </div>
  <div class="comments" v-else>
    <br>
    <hr>
    <br>
    <p>No comments yet... Will you be the first?</p>
    <br>
  </div>
  <div class="addComment">
    <hr>
    <br>
    <div v-if="user" class="commentForm">
      <form class="pure-form space-above">
        <fieldset>
          <textarea placeholder="comment" v-model="userComment"></textarea>
        </fieldset>
        <fieldset>
          <button type="submit" class="pure-button pure-button-secondary" @click.prevent="postComment">Post</button>
        </fieldset>
      </form>
    </div>
    <div v-else class="loginMessage">
      <p> Log in to make a comment...</p>
    </div>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
</div>
</template>

<script>
import Comments from '@/components/Comments.vue';
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'Photo',
  components: {
    Comments,
  },
  data() {
    return {
      photoData: '',
      error: '',
      id: this.$route.params.id,
      user: this.$root.user,
      userComment: '',
      comments: []
    }
  },
  created() {
    this.getPhoto();
    this.getComments();
  },
  computed: {
    haveComments: function() {
      return (this.comments.length > 0)
    }
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/single?id=" + this.id);
        this.photoData = response.data[0];
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async postComment() {
      this.error = '';
      if (!this.userComment)
        return;
      try {
        await axios.post('/api/comments', {
          comment: this.userComment,
          photo: this.id,
        });
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.userComment = ''
      this.getComments()
    },
    async getComments() {
      try {
        this.response = await axios.get("/api/comments?id=" + this.id);
        this.comments = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
.photo {
  padding-top: 50px;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  margin: auto;
  width: 75%;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: .8em;
  font-weight: normal;
  margin: auto;
  width: 75%;
}

.photoDescription {
  font-size: 1em;
  margin: auto;
  width: 75%;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: flex;
  width: 75%;
  margin: auto;
}

.image img {
  width: 100%;
}

.loginMessage {
  display: flex;
  justify-content: center;
  font-size: 1.2em;
}

.songControls {
  display: flex;
  margin: auto;
  justify-content: center;
  color: #111;
}

textarea {
  width: 100%;
  color: #111;
}
</style>
