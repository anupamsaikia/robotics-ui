<template>
  <div class="my-3">
<!-- Error -->
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>

    <!-- Add event dialog -->
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <event-editor v-if="$store.state.authToken" mode="edit" :event_id="$route.params._id" @close="$router.push('/events')" @error="error = $event"></event-editor>
      <div v-else>
        Please login to view this page.
      </div>
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
      error: null,
    }
  },
}
</script>

