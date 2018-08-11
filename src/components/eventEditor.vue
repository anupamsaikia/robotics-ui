<template>

      <v-card>
        <v-form
          ref="form"
        >
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="eventData.title"
                  label="Title"
                  hint="Enter a short title of the event"
                  prepend-icon="title"
                  required
                  :rules="titleRules"
                  :counter="100"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="eventData.place"
                  label="Place"
                  hint="Enter the place of the event"
                  prepend-icon="place"
                  required
                  :rules="placeRules"
                  :counter="100"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-dialog
                  ref="datePicker"
                  v-model="datePicker"
                  :return-value.sync="eventData.eventDateString"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="eventData.eventDateString"
                    label="Event Date"
                    prepend-icon="event"
                    readonly
                    required
                    :rules="dateRules"
                  ></v-text-field>
                  <v-date-picker v-model="eventData.eventDateString" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePicker = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.datePicker.save(eventData.eventDateString)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-dialog
                  ref="timePicker"
                  v-model="timePicker"
                  :return-value.sync="eventData.eventTimeString"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="eventData.eventTimeString"
                    label="Event time"
                    prepend-icon="access_time"
                    readonly
                    required
                    :rules="timeRules"
                  ></v-text-field>
                  <v-time-picker
                    v-if="timePicker"
                    v-model="eventData.eventTimeString"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="timePicker = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.timePicker.save(eventData.eventTimeString)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="eventData.description"
                  label="Event description"
                  hint="Optional, Describe the event"
                  prepend-icon="description"
                ></v-textarea>
              </v-flex>

              <!-- TODO make component for Coordinator -->
              <!-- <v-flex xs12>
                <v-select
                  v-model="eventData.coordinators"
                  :items="coordinatorList"
                  small-chips
                  label="Select Coordinators"
                  item-text="name"
                  item-value="name"
                  multiple
                  hint="Click arrow icon to hide the list"
                  prepend-icon="person"
                >
                  <template
                    slot="selection"
                    slot-scope="data"
                  >
                    <v-chip
                      :selected="data.selected"
                      close
                      class="chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                    >
                      <v-avatar>
                        <img :src="data.item.avatar">
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template
                    slot="item"
                    slot-scope="data"
                  >
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar>
                        <img :src="data.item.avatar">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-text="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-text="data.item.group"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
              </v-flex> -->

              <v-flex xs12>
                <v-text-field
                  v-model="eventData.tags"
                  label="Tags"
                  placeholder="robotics, artificial intelligence"
                  hint="Optional, Separate tags by comma"
                  prepend-icon="local_offer"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="$emit('close')">Cancel</v-btn>
          <v-btn  color="primary" @click="addOrEditData">Save</v-btn>
        </v-card-actions>
      </v-card>

</template>

<script>
import * as dateTime from '../helpers/datetime'
import { mapActions } from 'vuex'

export default {

  created () {
    if(this.mode == 'edit')
      this.getData()
  },
  props: ['mode', 'event_id'],

  data: () => ({

    eventData: {},
    
    datePicker: false,
    timePicker: false,

    //for input validation
    titleRules :[
      v => !!v || 'Title is required',
      v => (v && v.length <= 100) || 'Title must be less than 100 characters'
    ],
    placeRules :[
      v => !!v || 'Place is required',
      v => (v && v.length <= 100) || 'Place must be less than 100 characters'
    ],
    dateRules :[
      v => !!v || 'Date is required'
    ],
    timeRules :[
      v => !!v || 'Time is required'
    ],
    
  }),

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
      this.loading('start')
      fetch(this.$store.state.url + '/api/event/' + this.event_id , {
        method: 'GET'
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response);
      })
      .then((response) => {
        response.Date = new Date(response.time)
        response.eventDateString = dateTime.getDateFromDateObject(response.Date)
        response.eventTimeString = dateTime.getTimeFromDateObject(response.Date)
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

    //To add/edit an event
    addOrEditData(){
      this.loading('start')
      //clean the data for submit
      this.eventData.time = dateTime.getDateObjectFromDateTime(this.eventData.eventDateString, this.eventData.eventTimeString).toISOString()
      console.log(this.eventData.time)
      /* if(this.eventData.tags && typeof this.eventData.tags == 'string'){
        this.eventData.tags = this.eventData.tags.split(',');
        this.eventData.tags = this.eventData.tags.map(s => s.trim());

      } */


      fetch(this.$store.state.url + '/api/event/' + (this.mode == 'edit'? this.event_id: ''), {
        method: this.mode == 'edit'? 'PUT': 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": this.$store.state.authToken,
        },
        body: JSON.stringify(this.eventData),
      })
      .then(response => {
        if(response.ok){
          alert('Added')
        }
        else {
          return Promise.reject(response);
        }
        this.loading('stop')
      })
      .catch(error => {
        console.error(`Fetch Error =\n`, error)
        this.loading('stop')
      });

    },


    //to validate the input data and submit
    validateAndSubmit(){
      if (this.$refs.form.validate()) {
        this.addOrEditData()
      }
    },



  }



}
</script>

