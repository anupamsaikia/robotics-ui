<template>
<div>

<!-- Events list -->
  <div v-if="events" class="my-3">
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-list three-line subheader>
            <template v-for="(event, index) in events">
              <v-subheader :key="event.header" v-if="event.header">{{event.header}}</v-subheader>
              <v-list-tile
                :key="event._id"
                v-else
                avatar
                @click="navigate(event._id)"
              >
              <v-list-tile-avatar color="blue" size="48">
                <span class="white--text caption">20 Jul</span>
                <!-- <v-icon v-if="event.color && event.icon" :class="event.color">{{event.icon}}</v-icon>
                <v-icon v-else class="blue white--text">event</v-icon> -->
              </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ event.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ event.place }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ toNiceDateString(event.time) + " " + toNiceTimeString(event.time) }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action @click.stop>
                  <v-list-tile-action-text>{{ getInterval(event.time) }}</v-list-tile-action-text>
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
                        v-for="(item, i) in eventActions"
                        :key="i"
                        @click="selectEventAction(item.title, event._id)"
                      >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-action>

              </v-list-tile>
              <v-divider
                v-if="index + 1 < events.length && !event.header"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>






<!-- Gap -->
  <div style="height:30px">
  </div>


<!-- Floating Add Button -->
  <v-btn
    color="pink"
    dark
    fixed
    bottom
    right
    fab
    @click.stop="selectEventAction('Add Event')"
  >
    <v-icon>add</v-icon>
  </v-btn>



</div>
</template>

<script>
export default {
  
}
</script>

