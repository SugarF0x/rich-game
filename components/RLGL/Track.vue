<script lang="ts">
import { computed, defineComponent, onMounted, toRefs, ref, watch } from '@nuxtjs/composition-api'
import { useStore } from '~/hooks'

export default defineComponent({
  props: {
    isPlayer: Boolean,
    isAlive: Boolean,
    isGreen: Boolean,
    order: {
      type: Number,
      required: true,
    },
  },
  emits: ['finish'],
  setup(props, { emit }) {
    const { isPlayer, isAlive, isGreen, order } = toRefs(props)
    const store = useStore()

    const playerImage = ref('')
    const steps = ref(0)
    const tilt = ref(0)
    const isFinished = ref(false)

    const step = () => {
      const newValue = Math.floor(Math.random() * 3) + steps.value
      if (newValue > 80) {
        steps.value = 80
        tilt.value = 0
        emit('finish', order.value)
        isFinished.value = true
      } else {
        steps.value = newValue
        if (tilt.value === -1) tilt.value = 1
        else tilt.value = -1
        setTimeout(() => {
          if (isGreen.value) step()
        }, 250)
      }
    }

    watch(isGreen, () => {
      if (isGreen.value && isAlive.value && !isFinished.value) step()
    })

    onMounted(() => {
      if (!isPlayer.value) {
        const images = store.assets.images.players.common
        playerImage.value = images[Math.floor(Math.random() * images.length)]
      } else {
        playerImage.value = store.assets.images.players.puma
      }
    })

    const { bg } = store.assets.images.RLGL.track

    const trackStyle = computed(() => ({
      backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${bg})`,
    }))

    const playerStyle = computed(() => ({
      backgroundImage: `url(${playerImage.value})`,
      filter: isAlive.value ? null : `grayscale(0.75)`,
      transform: (() => {
        let transform
        if (!isAlive.value) {
          transform = 'scale(1, -1)'
        } else if (isFinished.value) {
          transform = 'scale(-1, 1)'
        } else {
          transform = `rotate(${10 * tilt.value}deg)`
        }
        return `translate(-50%, -50%) ${transform}`
      })(),
      left: `${10 + steps.value}%`,
    }))

    return {
      trackStyle,
      playerStyle,
      steps,
    }
  },
})
</script>

<template>
  <div class="track" :style="trackStyle">
    <div class="player" :style="playerStyle" />
  </div>
</template>

<style lang="scss" scoped>
.track {
  position: relative;
  width: 100%;
  height: 72px;
  border-color: white;
  border-style: solid;
  border-width: 1px 2px;
  box-sizing: border-box;
  overflow: hidden;
}

.player {
  position: absolute;
  width: 80px;
  height: 60px;
  background-size: contain;
  top: 50%;
}
</style>
