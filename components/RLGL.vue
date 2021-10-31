<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from '@nuxtjs/composition-api'
import Doll from './RLGL/Doll.vue'
import { useStore } from '~/hooks'

export default defineComponent({
  components: {
    Doll,
  },
  setup() {
    const store = useStore()
    const sounds = computed(() => store.assets.sounds)

    const isAngry = ref(false)
    const isFinished = ref(false)

    const dollSong = computed(() => new Audio(sounds.value.dollSong))
    const gunshot = computed(() => new Audio(sounds.value.gunshot))
    const boom = computed(() => new Audio(sounds.value.boom))

    const start = () => {
      dollSong.value.onended = () => {
        isAngry.value = true
        boom.value.play()
        setTimeout(() => {
          isAngry.value = false
          if (!isFinished.value) dollSong.value.play()
        }, 3000)
      }

      dollSong.value.play()
    }

    onMounted(() => {
      setTimeout(() => {
        start()
      }, 2500)
    })

    onUnmounted(() => {
      dollSong.value.pause()
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
