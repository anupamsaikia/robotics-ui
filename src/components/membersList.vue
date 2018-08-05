<template>
  <v-list two-line>
    <template v-for="(member, index) in members">
      <v-list-tile
        :key="member._id"
        avatar
        @click="() => {}"
      >
        <v-list-tile-avatar>
          <img :src="member.avatar">
        </v-list-tile-avatar>
        
          <v-list-tile-content>
            <router-link :to="'/member/' + member._id" class="my-link">
              <v-list-tile-title class="body-2 grey--text text--darken-3" v-text="member.name"></v-list-tile-title>
              <v-list-tile-sub-title class="body-1" v-text="member.role"></v-list-tile-sub-title>
              </router-link>
          </v-list-tile-content>
        
        <v-list-tile-action>
          <v-menu
            left
            nudge-left="40"
          >
            <v-btn
              slot="activator"
              icon
              ripple
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile
                v-for="(item, i) in memberActions"
                :key="i"
                @click="selectMemberAction(item.title, event._id)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider
        v-if="index + 1 < members.length"
        :inset="true"
        :key="index"
      ></v-divider>
    </template>
  </v-list>


</template>


<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      members: null,
      memberActions: [
        { title: 'Edit Member'},
        { title: 'Delete Member'},
      ],


    }
  },

  mounted(){
    this.getData()
  },

  props:['mtype'],
  
  methods:{
    ...mapActions([
      'loading'
    ]),

    getData(){
      this.members = null
      this.loading('start')
      fetch(this.$store.state.url + '/api/person?type=' + this.mtype, {
        method: 'GET'
      })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((response) => {
        this.loading('stop')
        if(response.length < 1)
          this.message = "No Members found"
        else
          this.members = response
      })
      .catch((error) => {
        console.log(error)
        this.loading('stop')
        this.members = null
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
  },




}
</script>

