<template>
  <!-- Pagination -->
  <div class="text-xs-center my-5">
    <v-pagination
      :length="length"
      :value="page"
      @input="clicked"
      total-visible="7"
      circle>
    </v-pagination>
  </div>
</template>

<script>
export default {
  props: ['page', 'length'],
  methods: {
    clicked(page){
      this.$emit('change', page)
    }
  }
}
</script>
