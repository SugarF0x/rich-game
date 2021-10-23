<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isAngry: Boolean
  },
  setup() {

  }
})
</script>

<template>
  <div class='wrapper'>
    <div class='bg' />
    <div class='bull' :class="isAngry ? 'angry' : 'happy'" />
  </div>
</template>

<style lang='scss' scoped>
.wrapper {
  position: relative;
  display: flex;
  height: 100px;
  background: url("/images/doll.jpg") center no-repeat;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("/images/doll.jpg") center no-repeat;
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

.happy {
  background-image: url("/images/bull_happy.png");
}

.angry {
  background-image: url("/images/bull_angry.png");
}
</style>
