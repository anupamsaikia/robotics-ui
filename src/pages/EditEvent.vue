<template>
  <div>
<!-- Error -->
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>

  <event-editor v-if="event_id" :event_id="event_id" @error="error = $event"></event-editor>

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

