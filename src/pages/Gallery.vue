<template>
  <v-layout row class="my-3 mx-3">
    <v-flex xs12 sm12>
      <vue-picture-swipe :items="items"></vue-picture-swipe>
    </v-flex>
  </v-layout>
</template>


<script>
import VuePictureSwipe from 'vue-picture-swipe'
export default {
  components: { VuePictureSwipe },
  
  data: ()=>({
    items: [{
      src: 'http://via.placeholder.com/600x400',
      thumbnail: 'http://via.placeholder.com/250x200',
      w: 600,
      h: 400
    },
    {
      src: 'http://via.placeholder.com/1200x900',
      thumbnail: 'http://via.placeholder.com/300x200',
      w: 1200,
      h: 900
    }]

  })
}
</script>
