<template>
  <v-card>
    <v-card-title class="headline">Delete?</v-card-title>

    <v-card-text>Do you want to delete this person?</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        flat
        @click="$emit('close')"
      >
        Close
      </v-btn>
      <v-btn
        color="red--text"
        @click="deletePerson"
      >
        Delete
      </v-btn>    

    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['id'],
  data(){
    return {
      buttons: [
        {
          text: 'Delete',
          color: 'red',
          onClick(){
            alert('Deleting...')
          },
        }
      ],
    }
  },
  methods:{
    deletePerson(){
      this.$emit('close')
      this.loading('start')
      fetch(this.$store.state.url+'/api/person/'+this.id, {
        method: 'DELETE',
        headers: {
          'x-access-token': this.$store.state.authToken,
        },
      })
      .then(response => {
        if(response.ok){
          alert('Deleted')
          this.loading('stop')
        }
      })
      .catch(err => {
        alert('Error')
        this.loading('stop')
      })
    },
    ...mapActions([
      'loading'
    ]),
  }
}
</script>

