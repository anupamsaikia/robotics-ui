<template>
  <div class="my-3">
<!-- Error -->
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>

    <!-- Add event dialog -->
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <member-editor 
        v-if="$store.state.authToken"
        mode="edit"
        :member_id="$route.params._id"
        @close="$router.push('/members')"
        @error="error = $event"
      ></member-editor>
      <div v-else>
        Please login to view this page.
      </div>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import MemberEditor from '@/components/memberEditor'
export default {
  components : {
    MemberEditor,
  },
  data(){
    return {
      error: null,
    }
  },
}
</script>

