<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import { PixelSpinner } from 'epic-spinners' // @ts-ignore
import RadialProgressBar from 'vue-radial-progress'
import { useStore } from '~/hooks'
import { emptySoundData } from '~/consts'

export default defineComponent({
  components: {
    RadialProgressBar,
    PixelSpinner,
  },
  emits: ['start'],
  setup() {
    const store = useStore()

    const entries = computed(() => store.assets.entries)
    const loaded = computed(() => store.assets.loaded)

    onMounted(() => {
      if (typeof entries.value === 'undefined') {
        store.assets.getAssetsMap()
      }
    })

    const proceed = () => {
      store.assets.SET_SOUND_SRC(emptySoundData)
      store.settings.SET_SCREEN('character')
    }

    return {
      entries,
      loaded,
      proceed,
    }
  },
})
</script>

<template>
  <div>
    <div v-if="loaded !== entries" class="loader">
      <h1>Loading assets</h1>
      <RadialProgressBar
        :total-steps="entries"
        :completed-steps="loaded"
        start-color="black"
        stop-color="#ff1d5e"
        :animate-speed="50"
      >
        <PixelSpinner :animation-duration="2000" :size="70" color="#ff1d5e" />
      </RadialProgressBar>
    </div>
    <div v-else>
      <h1>All assets loaded</h1>
      <h2>Press &lt;START&gt; to begin</h2>
      <button class="start" @click="proceed">START</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start {
  margin-top: 100px;
  font-size: 300%;
}

.loader {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
