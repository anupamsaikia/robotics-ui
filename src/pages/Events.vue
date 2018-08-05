<template>
<div>
<!-- Error -->
<my-error v-if="error" :title="error.title" :description="error.description"></my-error>

<!-- Events list -->
  
  <v-layout row class="my-3">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-tabs
          v-model="tab"
          color="grey lighten-3"
          grow
        >
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab :ripple="false" key="upcoming">
            Upcoming events
          </v-tab>
          <v-tab :ripple="false" key="past">
            Past events
          </v-tab>
        </v-tabs>
        

        <v-tabs-items v-model="tab">
          <v-tab-item key="upcoming">
            <events-list tense="future" @error="error = $event"></events-list>
          </v-tab-item>

          <v-tab-item key="past">
            <events-list tense="past" @error="error = $event"></events-list>
          </v-tab-item>
        </v-tabs-items>

      </v-card>
    </v-flex>
  </v-layout>

<!-- Gap -->
  <div style="height:30px">
  </div>


<!-- Floating Add Button -->
  <v-btn
    color="pink"
    dark fixed bottom right fab
  >
    <v-icon>add</v-icon>
  </v-btn>


</div>
</template>

<script>
import EventsList from '@/components/EventsList'

export default {
  data(){
    return {
      error: null,
      tab: "true",
    }
  },
  components: { EventsList },
}
</script>




