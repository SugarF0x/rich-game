<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from '@nuxtjs/composition-api'
import Doll from './RLGL/Doll.vue'
import Track from './RLGL/Track.vue'
import { useStore } from '~/hooks'

interface PlayerState {
  isAlive: boolean
  isFinished: boolean
}

export default defineComponent({
  components: {
    Doll,
    Track,
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
              if (alivePlayers.length === 1) {
                isFinished.value = true
              }
            }
          } else {
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
      const newPlayers = [...players.value]
      newPlayers[order] = { ...newPlayers[order], isFinished: true }
      players.value = newPlayers
    }

    return {
      isAngry,
      isGreen,
      players,
      handleFinish,
    }
  },
})
</script>

<template>
  <div id="RLGL">
    <Doll :is-angry="isAngry" />
    <Track
      v-for="(player, n) in players"
      :key="n"
      :order="n"
      :is-green="isGreen"
      :is-alive="player.isAlive"
      @finish="handleFinish"
    />
  </div>
</template>

<style lang="scss" scoped></style>
