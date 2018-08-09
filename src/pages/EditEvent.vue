<template>
  <div class="my-3">
<!-- Error -->
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>

    <!-- Add event dialog -->
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <event-editor v-if="event_id" mode="edit" :event_id="event_id" @error="error = $event"></event-editor>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import EventEditor from '@/components/eventEditor'
export default {
  components : {
    EventEditor,
  },
  data(){
    return {
      event_id: null,
      error: null,
    }
  },
  created(){
    this.event_id = this.$route.params._id
  }
}
</script>

