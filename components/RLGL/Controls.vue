<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { useStore } from '~/hooks'

export default defineComponent({
  props: {
    isGreen: Boolean,
    isFinished: Boolean,
  },
  emits: ['step'], // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { emit }) {
    const store = useStore()

    const paw = computed(() => store.assets.images.RLGL.controls.paw)
    const pawBg = computed(() => ({ backgroundImage: `url(${paw.value})` }))

    const isLeft = ref(true)

    const step = () => {
      emit('step')
      isLeft.value = !isLeft.value
    }

    return {
      pawBg,
      isLeft,
      step,
    }
  },
})
</script>

<template>
  <div class="controls">
    <div class="pawWrapper" :class="(!isGreen || isLeft || isFinished) && 'disabled'">
      <button class="paw" :style="pawBg" :disabled="!isGreen || isLeft || isFinished" @click="step" />
    </div>
    <div class="pawWrapper" :class="(!isGreen || !isLeft || isFinished) && 'disabled'">
      <button class="paw" :style="pawBg" :disabled="!isGreen || !isLeft || isFinished" @click="step" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.pawWrapper {
  border: 5px solid white;
  border-radius: 5px;
  padding: 5px;
  background-color: magenta;
}

.disabled {
  background-color: black;
}

.paw {
  width: 75px;
  height: 75px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  filter: invert(1);
}
</style>
