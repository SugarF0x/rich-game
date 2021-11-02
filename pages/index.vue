<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Home from '~/components/Home/index.vue'

export default defineComponent({
  components: {
    Home,
  },
  setup() {},
})
</script>

<template>
  <div class="wrapper">
    <Home />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
</style>
