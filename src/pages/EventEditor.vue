<template>
  <!-- Add event dialog -->
  <v-dialog
    v-model="addEditEventDialog"
    max-width="700px"
    persistent
  >
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
                :return-value.sync="eventData.eventDate"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="eventData.eventDate"
                  label="Event Date"
                  prepend-icon="event"
                  readonly
                  required
                  :rules="dateRules"
                ></v-text-field>
                <v-date-picker v-model="eventData.eventDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="datePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.datePicker.save(eventData.eventDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-dialog
                ref="timePicker"
                v-model="timePicker"
                :return-value.sync="eventData.eventTime"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="eventData.eventTime"
                  label="Event time"
                  prepend-icon="access_time"
                  readonly
                  required
                  :rules="timeRules"
                ></v-text-field>
                <v-time-picker
                  v-if="timePicker"
                  v-model="eventData.eventTime"
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="timePicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.timePicker.save(eventData.eventTime)">OK</v-btn>
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
            <v-flex xs12>
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
            </v-flex>
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
        <v-btn flat color="primary" @click="addEditEventDialog = false">Cancel</v-btn>
        <v-btn  color="primary" @click="validateAndSubmit()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  
}
</script>

