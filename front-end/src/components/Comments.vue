<template>
<div>
  <section class="comments">
    <br>
    <hr>
    <br>
    <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
      <div class="commentInfo">
        <p class="commentPoster">{{comment.user.firstName}} {{comment.user.lastName}} @{{comment.user.username}}</p>
        <p class="commentDate">{{formatDate(comment.created)}}</p>
      </div>
      <div class="commentContent">
        <p>{{comment.comment}}</p>
      </div>
      <br>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Comments',
  props: {
    comments: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.commentInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.commentInfo p {
  margin: 0px;
}

.commentDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}
</style>
