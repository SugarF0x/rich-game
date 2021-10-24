<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'
import Doll from './RLGL/Doll.vue'

export default defineComponent({
  components: {
    Doll,
  },
  setup() {
    const isAngry = ref(false)
    const isFinished = ref(false)

    const song = ref(new Audio('/sounds/doll_song.mp3'))
    const gunshot = ref(new Audio('/sounds/gunshot.mp3'))
    const boom = ref(new Audio('/sounds/boom.mp3'))

    const start = () => {
      song.value.onended = () => {
        isAngry.value = true
        boom.value.play()
        setTimeout(() => {
          isAngry.value = false
          if (!isFinished.value) song.value.play()
        }, 3000)
      }

      song.value.play()
    }

    onMounted(() => {
      setTimeout(() => {
        start()
      }, 2500)
    })

    onUnmounted(() => {
      song.value.pause()
      gunshot.value.pause()
      boom.value.pause()
    })

    return {
      isAngry,
    }
  },
})
</script>

<template>
  <Doll :is-angry="isAngry" />
</template>

<style lang="scss" scoped></style>
