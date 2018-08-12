<template>
  <div>
    <v-layout row class="my-3">
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title class="headline">Robotics Club Registration</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form">
            <v-container>
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field
                    v-model="personData.name"
                    label="Name"
                    hint="Enter your full name"
                    :counter="30"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="personData.email"
                    label="Email"
                    hint="Enter your valid email address"
                    :counter="100"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="personData.phone"
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
                    v-model="personData.module"
                    :rules="[rules.required]"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    v-model="personData.branch"
                    :items="(personData.module == 'Diploma')?dipBranchList:degBranchList"
                    label="Branch"
                    :rules="[rules.required]"
                    dense
                  ></v-select>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="personData.rollno"
                    label="Roll no."
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-textarea
                    v-model="personData.remark"
                    label="Previous experiences if any"
                    hint="Describe briefly"
                  ></v-textarea>
                </v-flex>
                

              </v-layout>
            </v-container>
          </v-form>



          <v-divider></v-divider>
          <v-card-actions>
            <v-icon>info</v-icon>
            <span class="caption px-2">Only for CIT students</span>
            <v-spacer></v-spacer>
            <v-btn  color="primary" @click="join">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data:()=>({
    personData: {},

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

  }),
  methods: {
    //loading
    ...mapActions([
      'loading'
    ]),

    join(){
      if (!this.$refs.form.validate()) {
        return
      }

      this.loading('start')
      fetch(this.$store.state.url + '/api/join', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.personData),
      })
      .then(response => {
        if(response.ok){
          alert('Submitted')
        }
        else {
          return Promise.reject(response);
        }
        this.loading('stop')
      })
      .catch(error => {
        console.error(`Fetch Error =\n`, error)
        this.loading('stop')
      })


      alert('Joini...')
    }
  },
}
</script>


