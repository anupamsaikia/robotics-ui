<template>
  <!-- Add event dialog -->
  <v-layout row v-if="eventData">
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-form
          ref="form"
        >
          <v-container>
            <v-layout wrap>
              <v-flex xs12 md6>
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
              <v-flex xs12 md6>
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
                  :return-value.sync="eventDateString"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="eventDateString"
                    label="Event Date"
                    prepend-icon="event"
                    readonly
                    required
                    :rules="dateRules"
                  ></v-text-field>
                  <v-date-picker v-model="eventDateString" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePicker = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.datePicker.save(eventDateString)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-dialog
                  ref="timePicker"
                  v-model="timePicker"
                  :return-value.sync="eventTimeString"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="eventTimeString"
                    label="Event time"
                    prepend-icon="access_time"
                    readonly
                    required
                    :rules="timeRules"
                  ></v-text-field>
                  <v-time-picker
                    v-if="timePicker"
                    v-model="eventTimeString"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="timePicker = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.timePicker.save(eventTimeString)">OK</v-btn>
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
          <v-btn flat color="primary" @click="()=>{}">Cancel</v-btn>
          <v-btn  color="primary" @click="test()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as dateTime from '@/helpers/datetime'
import { mapActions } from 'vuex'

export default {

  created () {
    this.getData()
  },

  data: () => ({

    eventData: null,
    
    datePicker: false,
    timePicker: false,

    eventDateString: null,
    eventTimeString: null,


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
      this.eventData = null
      this.loading('start')
      fetch(this.$store.state.url + '/api/event/' + this.$route.params._id , {
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

    test(){
      console.log(dateTime.getDateObjectFromDateTime(this.eventDateString, this.eventTimeString).toISOString())
    },


    //To add/edit an event
    addOrEditData(){
      //clean the data for submit
      this.eventData.time = dateTime.getDateObjectFromDateTime(this.eventDateString, this.eventTimeString).toISOString()
      if(this.eventData.tags && typeof this.eventData.tags == 'string'){
        this.eventData.tags = this.eventData.tags.split(',');
        this.eventData.tags = this.eventData.tags.map(s => s.trim());
      }

      console.log(JSON.stringify(this.eventData))

      if(this.currentOperation == 'add'){
        fetch(this.url, {
          method: 'POST',  
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(this.eventData),
        })
        .then(response => {
          if(response.ok){
            //response.json();
            console.log(response.statusText);
          }
          else {
            return Promise.reject(response);
          }
        })
        .catch(error => console.error(`Fetch Error =\n`, error));
      }
      else if(this.currentOperation == 'edit'){
        fetch(this.url + '/' + this.currentEventId, {
          method: 'PUT',          
          body: JSON.stringify(this.eventData),
        })
        .then(response => {
          if(response.ok){
            //response.json();
            console.log(response.statusText);
          }
          else {
            return Promise.reject(response);
          }
        })
        .catch(error => console.error(`Fetch Error =\n`, error));
      }
      else{
        console.log('error')
      }
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

