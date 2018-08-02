<template>
  <v-dialog
    max-width="600"
    :persistent="!!persistent"
    transition="slide-y-transition"
  >
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>

      <v-card-text>{{description}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          v-if="!!persistent"
          flat
          @click="$emit('close')"
        >
          Close
        </v-btn>

        <template v-for="(button, i) in buttons">
            <v-btn
            :color="button.color"
            flat
            @click="button.onClick()"
            :key="button.text+'-'+i"
          >
            {{button.text}}
          </v-btn>
        </template>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['title', 'description', 'persistent', 'buttons'],
}
</script>
