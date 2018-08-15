<template>

      <v-card>
        <v-form
          ref="form"
        >
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="personData.name"
                  label="Name"
                  hint="Enter full name"
                  :counter="30"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="personData.contact_info.email"
                  label="Email"
                  hint="Enter a valid email address"
                  :counter="100"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="personData.contact_info.phone"
                  label="Phone"
                  hint="Enter 10 digit mobile number"
                  :counter="10"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  :items="moduleList"
                  label="Module"
                  v-model="personData.details.module"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="personData.details.branch"
                  :items="(personData.details.module == 'Diploma')?dipBranchList:degBranchList"
                  label="Branch"
                  :rules="[rules.required]"
                  dense
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="personData.details.rollno"
                  label="Roll no."
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  :items="roleList"
                  label="Role"
                  v-model="personData.role"
                  :rules="[rules.required]"
                  dense
                ></v-select>
              </v-flex>



            </v-layout>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="$emit('close')">Cancel</v-btn>
          <v-btn  color="primary" @click="validateAndSubmit()">Save</v-btn>
        </v-card-actions>
      </v-card>

</template>

<script>
import { mapActions } from 'vuex'

export default {

  created () {
    if(this.mode == 'edit')
      this.getData()
  },
  props: ['mode', 'member_id'],

  data:()=>({
    personData: {
      details: {},
      contact_info: {},
    },

    rules:{
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    },

    moduleList: ['Degree', 'Diploma'],
    degBranchList: ['CSE', 'ECE', 'IE', 'IT', 'FET', 'CE', 'MCD'],
    dipBranchList: ['CO', 'CT', 'ET', 'CI', 'FPT', 'AMT'],
    roleList: ['Member', 'Chief Convenor', 'Asst. Convenor','Technical Support', 'Photography', 'Designing', 'Profile Management', 'Club Management', 'Co-ordinator', 'Faculty'],

  }),


  methods:{
    //loading
    ...mapActions([
      'loading'
    ]),

    //To get event data from server
    getData(){
      this.loading('start')
      fetch(this.$store.state.url + '/api/person/' + this.member_id , {
        method: 'GET'
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response);
      })
      .then((response) => {
        this.loading('stop')
        this.personData = response;
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


      fetch(this.$store.state.url + '/api/person/' + (this.mode == 'edit'? this.member_id: ''), {
        method: this.mode == 'edit'? 'PUT': 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": this.$store.state.authToken,
        },
        body: JSON.stringify(this.personData),
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

