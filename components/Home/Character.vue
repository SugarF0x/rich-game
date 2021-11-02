<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { useStore } from '~/hooks'
import { Player } from '~/store/settings'

export default defineComponent({
  setup() {
    const store = useStore()

    const music = computed(() => new Audio(store.assets.sounds.pinkSoldiers))

    onMounted(() => {
      music.value.play()
    })

    onUnmounted(() => {
      music.value.pause()
    })

    const player = computed(() => store.settings.player)

    const rich = computed(() => store.assets.images.players.rich)
    const puma = computed(() => store.assets.images.players.puma)
    const logo = computed(() => store.assets.images.ui.logo)

    const richBg = computed(() => ({ backgroundImage: `url(${rich.value})` }))
    const pumaBg = computed(() => ({ backgroundImage: `url(${puma.value})` }))
    const logoBg = computed(() => ({ backgroundImage: `url(${logo.value})` }))

    const select = (value: Player) => {
      store.settings.SET_PLAYER(value)
    }

    const proceed = () => {
      store.settings.SET_SCREEN('RLGL')
    }

    return {
      richBg,
      pumaBg,
      logoBg,
      player,
      select,
      proceed,
    }
  },
})
</script>

<template>
  <div class="wrapper">
    <div class="logoWrapper">
      <div class="image logo" :style="logoBg" />
    </div>
    <h1>Choose your fighter</h1>
    <div class="container">
      <div class="characterWrapper" :class="player === 'puma' && 'selected'">
        <div class="image character" :style="pumaBg" @click="select('puma')" />
      </div>
      <div class="characterWrapper" :class="player === 'rich' && 'selected'">
        <div class="image character" :style="richBg" @click="select('rich')" />
      </div>
    </div>
    <button class="confirm" @click="proceed">Confirm</button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}

.container {
  margin-top: 80px;
  display: flex;
  justify-content: space-around;
}

.confirm {
  margin-top: 100px;
  font-size: 300%;
}

.characterWrapper {
  border: 5px solid white;
  border-radius: 5px;
  padding: 5px;
}

.selected {
  background-color: magenta;
}

.character {
  width: 125px;
  height: 125px;
  box-sizing: border-box;
}

.image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.logo {
  height: 80px;
}

.logoWrapper {
  padding: 10px 20px;
  background-color: white;
}
</style>
