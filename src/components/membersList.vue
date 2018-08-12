<template>
<div>
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
            <router-link :to="'/members/' + member._id" class="my-link">
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
              v-show="$store.state.authToken"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile @click="()=>{}" :to="'/members/' + member._id + '/edit'">
                <v-list-tile-title>Edit Member</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="deleteNow(member._id)">
                <v-list-tile-title>Delete Member</v-list-tile-title>
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

  <div v-if="message" class="my-5">
    <p class="title py-5 px-2 grey--text text--darken-2" style="text-align:center">{{ message }}</p>
  </div>
  
<!-- Delete dialog -->
  <v-dialog v-model="deleteDialog" max-width="600" transition="slide-y-transition">
    <delete-member :id="deleteMemberId" @close="deleteDialog=false"></delete-member>
  </v-dialog>

</div>
</template>


<script>
import { mapActions } from 'vuex'
import DeleteMember from '@/components/deleteMember'


export default {
  components: { DeleteMember },

  data(){
    return {
      members: null,

      //to show msg in case of no member present
      message: null,

      deleteDialog: false,
      deleteMemberId: null,


    }
  },

  mounted(){
    this.getData()
  },

  props:['mtype'],
  
  methods:{
    deleteNow(id){
      this.deleteMemberId = id
      this.deleteDialog = true
    },

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

