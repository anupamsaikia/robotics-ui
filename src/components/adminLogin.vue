<template>
  <v-card>
    <v-card-title primary-title class="headline">Admin Login</v-card-title>
    <v-divider></v-divider>
    <v-form ref="adminLoginForm">
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="phone"
              label="Phone"
              prepend-icon="phone"
              type="number"
              required
              :counter="10"
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
        </v-layout>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="()=>{}">Cancel</v-btn>
      <v-btn  color="primary" @click="()=>{}">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: ()=>({
    phone: null,
    password: null,

    showPass: false,

  })
  
}
</script>

