<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useStore } from '~/hooks'
import { Player } from '~/store/settings'

export default defineComponent({
  setup() {
    const store = useStore()

    const player = computed(() => store.settings.player)

    const rich = computed(() => store.assets.images.players.rich)
    const puma = computed(() => store.assets.images.players.puma)

    const richBg = computed(() => ({ backgroundImage: `url(${rich.value})` }))
    const pumaBg = computed(() => ({ backgroundImage: `url(${puma.value})` }))

    const select = (value: Player) => {
      store.settings.SET_PLAYER(value)
    }

    const proceed = () => {
      store.settings.SET_SCREEN('RLGL')
    }

    return {
      richBg,
      pumaBg,
      player,
      select,
      proceed,
    }
  },
})
</script>

<template>
  <div>
    <h1>Choose your fighter</h1>
    <div class="container">
      <div class="characterWrapper" :class="player === 'puma' && 'selected'">
        <div class="character" :style="pumaBg" @click="select('puma')" />
      </div>
      <div class="characterWrapper" :class="player === 'rich' && 'selected'">
        <div class="character" :style="richBg" @click="select('rich')" />
      </div>
    </div>
    <button class="confirm" @click="proceed">Confirm</button>
  </div>
</template>

<style lang="scss" scoped>
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
  border: 5px solid black;
  border-radius: 5px;
  padding: 5px;
}

.selected {
  background-color: magenta;
}

.character {
  width: 35vw;
  height: 35vw;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
