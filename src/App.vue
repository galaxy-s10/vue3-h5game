<template>
  <div>
    <div class="shackbox">
      <div class="shack"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  components: {},
  setup() {},
});
</script>

<style lang="scss" scoped>
.shackbox {
  width: 55px;
  height: 37px;
  /* animation: move 20s linear infinite; */
}
.shack {
  width: 55px;
  height: 37px;
  background-image: url('@/assets/img/fish1.png');
  // background-size: auto;
  background-repeat: no-repeat;
  animation: shift 1s steps(4) infinite;
  /*steps()指的是帧间隔时间每一帧动画间隔的时间*/
}
/*鱼移动动画*/
@keyframes move {
  from {
    margin-left: -60px;
  }
  to {
    margin-left: 1000px;
  }
}

/*鱼尾摆动动画*/
@keyframes shift {
  from {
    background-position: left 0;
  }
  to {
    background-position: left calc(37 * -4px); /* 37*4 */
    /* 37*8 */
    /* background-position: left -296px;  */
  }
}
</style>
