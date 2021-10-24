<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import RLGL from '~/components/RLGL.vue'
import { useStore } from '~/hooks'

export default defineComponent({
  components: {
    RLGL,
  },
  setup() {
    const store = useStore()
    const total = computed(() => store.assets.total)
    const loaded = computed(() => store.assets.loaded)

    const isStarted = ref(false)

    onMounted(() => {
      if (loaded.value === 0) {
        store.assets.getAssets()
      }
    })

    return {
      total,
      loaded,
      isStarted,
    }
  },
})
</script>

<template>
  <div class="wrapper">
    <div v-if="loaded !== total">
      <h1>Loading assets</h1>
      <h2>{{ loaded }} / {{ total }}</h2>
    </div>
    <div v-else-if="!isStarted">
      <h1>All assets loaded</h1>
      <h2>Press &lt;START&gt; to begin</h2>
      <button class="start" @click="isStarted = true">START</button>
    </div>
    <div v-else class="game">
      <RLGL />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.start {
  margin-top: 100px;
  font-size: 300%;
}
</style>
