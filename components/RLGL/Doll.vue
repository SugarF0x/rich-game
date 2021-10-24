<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useStore } from '~/hooks'

export default defineComponent({
  props: {
    isAngry: Boolean,
  },
  setup() {
    const store = useStore()

    const { bullHappy, bullAngry, doll } = store.assets.images
    const { boom, gunshot, dollSong } = store.assets.sounds

    const happyImage = computed(() => ({ backgroundImage: `url(${bullHappy})` }))
    const angryImage = computed(() => ({ backgroundImage: `url(${bullAngry})` }))
    const dollImage = computed(() => ({ backgroundImage: `url(${doll})` }))

    return {
      happyImage,
      angryImage,
      dollImage,
      boom,
      gunshot,
      dollSong,
    }
  },
})
</script>

<template>
  <div class="wrapper" :style="dollImage">
    <div class="bg" :style="dollImage" />
    <div class="bull" :style="isAngry ? angryImage : happyImage" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(4px);
}

.bull {
  position: absolute;
  width: 100px;
  height: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
