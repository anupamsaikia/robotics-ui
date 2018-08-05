<template>
  <v-dialog 
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <div class="pa-3 text-xs-center">
        <v-avatar size="150">
          <img src="https://cdn.vuetifyjs.com/images/lists/ali.png" alt="image">
        </v-avatar>
        <h3 class="headline mt-3">Abjb frtybub</h3>
      </div>
      <v-divider></v-divider>
      <v-list two-line>
        <v-list-tile @click="()=>{}">
          <v-list-tile-action>
            <v-icon color="indigo">phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>(650) 555-1234</v-list-tile-title>
            <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>chat</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile @click="()=>{}">
          <v-list-tile-action></v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>(323) 555-6789</v-list-tile-title>
            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>chat</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile @click="()=>{}">
          <v-list-tile-action>
            <v-icon color="indigo">mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
            <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="()=>{}">
          <v-list-tile-action></v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile @click="()=>{}">
          <v-list-tile-action>
            <v-icon color="indigo">location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>1400 Main Street</v-list-tile-title>
            <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>
