<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import Loading from './Loading.vue'
import Character from './Character.vue'
import Game from '~/components/Game.vue'
import { useStore } from '~/hooks'

export default defineComponent({
  components: {
    Game,
    Character,
    Loading,
  },
  setup() {
    const store = useStore()

    const screen = computed(() => store.settings.screen)

    return {
      screen,
    }
  },
})
</script>

<template>
  <div class="home">
    <Loading v-if="screen === 'loading'" />
    <Character v-else-if="screen === 'character'" />
    <Game v-else />
  </div>
</template>

<style lang="scss" scoped></style>
