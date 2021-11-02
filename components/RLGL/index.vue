<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from '@nuxtjs/composition-api'
import Doll from './Doll.vue'
import Track from './Track.vue'
import Controls from './Controls.vue'
import { useStore } from '~/hooks'

interface PlayerState {
  isAlive: boolean
  isFinished: boolean
}

export default defineComponent({
  components: {
    Doll,
    Track,
    Controls,
  },
  setup() {
    const store = useStore()
    const sounds = computed(() => store.assets.sounds)

    const isAngry = ref(false)
    const isFinished = ref(false)
    const isGreen = ref(false)

    const players = ref<PlayerState[]>([
      { isAlive: true, isFinished: false },
      { isAlive: true, isFinished: false },
      { isAlive: true, isFinished: false },
      { isAlive: true, isFinished: false },
      { isAlive: true, isFinished: false },
    ])
    const isPlayerFinished = ref(false)

    const dollSong = computed(() => new Audio(sounds.value.dollSong))
    const gunshot = computed(() => new Audio(sounds.value.gunshot))
    const boom = computed(() => new Audio(sounds.value.boom))

    const start = () => {
      isGreen.value = true
      dollSong.value.onended = () => {
        isAngry.value = true
        isGreen.value = false
        boom.value.play()

        setTimeout(() => {
          const alivePlayers = players.value.reduce((acc, val, i) => {
            if (!val.isAlive || val.isFinished) return acc
            return [...acc, i]
          }, [] as number[])
          if (alivePlayers.length > 0) {
            if (Math.random() > 0.33) {
              const newPlayers = [...players.value]
              newPlayers[alivePlayers[Math.floor(Math.random() * alivePlayers.length)]].isAlive = false
              players.value = newPlayers
              gunshot.value.play()
              if (alivePlayers.length === 1 && isPlayerFinished.value) {
                isFinished.value = true
              }
            }
          } else if (isPlayerFinished.value) {
            isFinished.value = true
          }
        }, 1000)

        setTimeout(() => {
          isAngry.value = false
          if (!isFinished.value) {
            dollSong.value.play()
            isGreen.value = true
          }
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

    const handleFinish = (order: number) => {
      if (order === -1) {
        isPlayerFinished.value = true
        return
      }

      const newPlayers = [...players.value]
      newPlayers[order] = { ...newPlayers[order], isFinished: true }
      players.value = newPlayers
    }

    const step = ref(0)
    const handleStep = () => {
      step.value++
    }

    return {
      isAngry,
      isGreen,
      isPlayerFinished,
      players,
      handleFinish,
      step,
      handleStep,
    }
  },
})
</script>

<template>
  <div class="RLGL">
    <Doll class="doll" :is-angry="isAngry" />
    <Track class="track" is-player is-alive :is-green="isGreen" :player-step="step" @finish="handleFinish" />
    <Track
      v-for="(player, n) in players"
      :key="n"
      class="track"
      :order="n"
      :is-green="isGreen"
      :is-alive="player.isAlive"
      @finish="handleFinish"
    />
    <Controls class="controls" :is-green="isGreen" :is-finished="isPlayerFinished" @step="handleStep" />
  </div>
</template>

<style lang="scss" scoped>
.RLGL {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.track {
  flex: 1;
}
</style>
