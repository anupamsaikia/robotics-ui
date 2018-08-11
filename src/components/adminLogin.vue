<template>
  <v-card>
    <v-card-title primary-title class="headline">Admin Login</v-card-title>
    <v-divider></v-divider>
    <v-form ref="adminLoginForm" @submit="login({ phone, password, cb })">
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="phone"
              label="Phone"
              prepend-icon="phone"
              :counter="10"
              autocomplete
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="showPass ? 'visibility_off' : 'visibility'"
              :type="showPass ? 'text' : 'password'"
              prepend-icon="security"
              @click:append="showPass = !showPass"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <span class="px-3 red--text" v-if="message">{{ message }}</span>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" type="submit">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: ()=>({
    phone: null,
    password: null,

    message: '',

    showPass: false,

  }),
  methods: {
    ...mapActions([
      'loading',
      'login',
    ]),

    cb(success=false, msg=''){
      if(success){
        this.message = ''
        this.$emit('close')
      }
      else {
        this.message = "Login Failed : " + msg
      }
    },
  },  
}
</script>

