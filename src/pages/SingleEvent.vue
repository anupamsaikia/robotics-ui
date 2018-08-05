<template>
  <!-- Event -->
  <div v-if="eventData" class="my-3">
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title primary-title class="headline">{{ eventData.title }}</v-card-title>
          <v-card-text  class="subheading">{{ eventData.description }}</v-card-text>

          <v-divider></v-divider>

          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">place</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Place</v-list-tile-title>
                <v-list-tile-sub-title>{{ eventData.place }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Date</v-list-tile-title>
                <v-list-tile-sub-title>{{ dateTime.toNiceDateString(eventData.Date) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">schedule</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Time</v-list-tile-title>
                <v-list-tile-sub-title>{{ dateTime.toNiceTimeString(eventData.Date) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          
        </v-card>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import * as dateTime from '@/helpers/datetime'
import { mapActions } from 'vuex'

export default {
  data: () => ({
    eventData: null,
  }),

  created () {
    this.getData()
  },

  computed:{
    dateTime(){
      return dateTime
    }
  },

  methods:{
    //loading
    ...mapActions([
      'loading'
    ]),

    //To get event data from server
    getData(){
      
      this.eventData = null
      this.loading('start')
      fetch(this.$store.state.url + this.$route.params._id , {
        method: 'GET'
      })
      .then((response) => {
        if (response.ok) {
          return response.json();;
        }
        return Promise.reject(response);
      })
      .then((response) => {
        response.Date = new Date(response.time)
        this.loading('stop')
        this.eventData = response;
      })
      .catch((error) => {
        this.loading('stop')
        var errDetails
        if(error.statusText){
          errDetails = {
            title : 'Something went wrong at the server !!',
            description: error.status + ' ' + error.statusText
          }
        } else {
          console.log(error)
          errDetails = {
            title : 'Network Error occured !!',
            description : 'Check your network connection and try again...'
          }
        }
        this.$emit('error', errDetails)
      })

    },

    //to format date and time display
    toNiceDateString : dateTime.toNiceDateString,
    toNiceTimeString : dateTime.toNiceTimeString,
    getInterval : dateTime.getInterval,



  }

}
</script>


<style scoped>
.event-link{
  width:100%; 
}
</style>
