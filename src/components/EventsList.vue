<template>
<div>
  <div v-if="events">
    <v-list three-line subheader>
      <template v-for="(event, index) in events">
        <v-list-tile
          :key="event._id"
          avatar
          @click="()=>{}"
        >
          <v-list-tile-avatar color="blue" size="48">
            <span class="white--text caption">25 Aug</span>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <router-link :to="'/events/'+event._id" class="my-link">
              <v-list-tile-title class="body-2 grey--text text--darken-3">{{ event.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="body-1">{{ event.place }}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="body-1">{{ dateTime.toNiceDateString(event.Date) + " " + dateTime.toNiceTimeString(event.Date) }}</v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ dateTime.getInterval(event.Date) }}</v-list-tile-action-text>
            <v-menu
              left
              nudge-left="40"
            >
              <v-btn
                slot="activator"
                icon
                ripple
                v-show="$store.state.authToken"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>

              <v-list>
                <v-list-tile :to="'/events/'+event._id+'/edit'">
                  <v-list-tile-title>Edit Event</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="deleteNow(event._id)">
                  <v-list-tile-title>Delete Event</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider
          v-if="index + 1 < events.length && !event.header"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </div>

<!-- Delete dialog -->
  <v-dialog v-model="deleteDialog" max-width="600" transition="slide-y-transition">
    <delete-event :id="deleteEventId" @close="deleteDialog=false"></delete-event>
  </v-dialog>

<!-- Pagination -->
  <div v-if="events" class="text-xs-center my-5">
    <v-pagination 
    :length="length"
    v-model="page"
    circle
    total-visible="7"
    ></v-pagination>
  </div>

  <div v-if="message" class="my-5">
    <p class="title py-5 px-2 grey--text text--darken-2" style="text-align:center">{{ message }}</p>
  </div>

</div>
</template>

<script>
import * as dateTime from '@/helpers/datetime'
import { mapActions } from 'vuex'
import DeleteEvent from '@/components/deleteEvent'

export default {
  props: ['tense'],
  components: { DeleteEvent },
  data(){
    return {
      //to store all the events
      events: null,
      total: null,
      //to show msg in case of no event present
      message: null,
      //url page order
      page: 1,
      length: 4,
      order: '-',
      deleteDialog: false,
      deleteEventId: null,
    }
  },

  computed:{
    dateTime(){
      return dateTime
    }
  },
  methods: {
    deleteNow(id){
      this.deleteEventId = id
      this.deleteDialog = true
    },
    getData(){
      this.events = null
      this.loading('start')
      fetch(this.$store.state.url + '/api/event' + '?page=' + this.page + '&order=' + this.order + '&tense=' + this.tense, {
        method: 'GET'
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((response) => {
        if(response.events.length < 1){
          this.message = "No Events found"
        }
        else{
          response.events.forEach(event => {
            event.Date = new Date(event.time)
          })
          this.events = response.events
          this.total = response.total
        }
        this.loading('stop')
      })
      .catch((error) => {
        console.log(error)
        this.loading('stop')
        this.events = null
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
    ...mapActions([
      'loading'
    ]),
  },


  mounted(){
    this.order = this.tense == 'past'? '-': '';
    this.getData()
  }
}

</script>

