<template>
<div>
<!-- Gap -->
  <div style="height:30px">
  </div>


<!-- Floating Add Button -->
  <v-btn
    color="pink"
    dark
    fixed
    bottom
    right
    fab
    @click.stop="selectEventAction('Add Event')"
  >
    <v-icon @click="loading('toggle')">add</v-icon>
  </v-btn>



</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'loading'
    ])
  },
  mounted(){
    this.loading('start')
  }
}
</script>

