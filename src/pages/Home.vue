<template>
<div>
  <v-jumbotron class="anupam">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to Robotics Club</h3>

          <span class="subheading"></span>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">Check out our newest features!</div>

          <v-btn
            class="mx-0"
            color="primary"
            large
          >
            See more
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .anupam{
    background-color:white;
    background-image: url('../assets/bg.png');
    background-size: contain;
    background-position-x: right;
    background-position-y: top;
  }
</style>
