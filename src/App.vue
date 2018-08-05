<template>
  <v-app id="inspire">
    <my-loader v-show="loading" style="z-index:100"></my-loader>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>

          <v-list-tile v-else :key="item.text" :to="'/'+item.target">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="white"
      app
      fixed
      :dense="$vuetify.breakpoint.mdAndDown"
    >
      <v-toolbar-title style="width: 300px" class="">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import Loader from '@/components/loader'

  export default {
    components: {
      'my-loader': Loader,
    },
    computed:{
      loading(){
        return this.$store.state.loading
      }
    },
    data: () => ({
      title: 'Robotics Club',
      drawer: null,
      items: [
        { icon: 'home', text: 'Home', target: '' },
        { icon: 'person_add', text: 'Join Club', target: 'join' },
        { icon: 'event', text: 'Events', target: 'events' },
        { icon: 'android', text: 'Projects', target: 'projects' },
        { icon: 'group', text: 'Members', target: 'members' },
        { icon: 'book', text: 'Tutorials', target: 'tutorials' },
        { icon: 'photo_library', text: 'Photo Gallery', target: 'gallery' },
        /* { icon: 'chat_bubble', text: 'Send feedback', target: '' },
        { icon: 'help', text: 'Help', target: '' }, */
      ]
    }),
    methods: {
      
    },
    name: 'App'
  }
</script>

<style>
a{
  text-decoration: none;
  color: inherit;
  font:inherit;
}

.my-link{
  width:100%; 
}

</style>

