<template>
<div>
<!-- Error -->
  <my-error v-if="error" :title="error.title" :description="error.description"></my-error>

<!-- Members tabs -->
  <v-layout row class="my-3" v-else>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-tabs
          v-model="tab"
          color="grey lighten-3"
          grow
        >
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab :ripple="false" key="core_members">Core Members</v-tab>
          <v-tab :ripple="false" key="faculty">Faculty</v-tab>
          <v-tab :ripple="false" key="members">Members</v-tab>

        </v-tabs>
        

        <v-tabs-items v-model="tab">
          <v-tab-item key="core_members">
            <members-list mtype="core_member" @error="error = $event"></members-list>
          </v-tab-item>

          <v-tab-item key="faculty">
            <members-list mtype="faculty" @error="error = $event"></members-list>
          </v-tab-item>

          <v-tab-item key="members">
            <members-list mtype="member" @error="error = $event"></members-list>
          </v-tab-item>
        </v-tabs-items>

      </v-card>
    </v-flex>
  </v-layout>

<!-- add event dialog -->
  <v-dialog v-model="addMemberDialog" max-width="600">
    <member-editor @close="addMemberDialog=false" mode='add'></member-editor>
  </v-dialog>

<!-- Floating Add Button -->
  <v-btn
    color="pink"
    dark fixed bottom right fab
    @click="addMemberDialog = true"
    v-if="$store.state.authToken"
  >
    <v-icon>add</v-icon>
  </v-btn>

</div>
</template>

<script>
import membersList from '@/components/membersList'
import MemberEditor from '@/components/memberEditor'


export default {
  data: () => ({
    error: null,
    tab:"true",

    addMemberDialog: false,

    
  }),

  components: { membersList, MemberEditor },
  
}
</script>


