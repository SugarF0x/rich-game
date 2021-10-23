<script lang='ts'>
import { defineComponent, onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'
import Doll from './RLGL/Doll.vue'

export default defineComponent({
  components: {
    Doll
  },
  setup() {
    const interval = ref()
    const isAngry = ref(false)

    onMounted(() => {
      interval.value = setInterval(() => {
        isAngry.value = !isAngry.value
      }, 500)
    })
    onUnmounted(() => {
      clearInterval(interval.value)
    })

    return {
      isAngry
    }
  }
})
</script>

<template>
  <Doll :is-angry='isAngry' />
</template>

<style lang='scss' scoped>

</style>
