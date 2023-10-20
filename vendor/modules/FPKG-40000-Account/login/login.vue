<template>
  <div>
    <component :is="'FUJI'" />
  </div>
</template>

<script  lang='ts'>
import { defineComponent, ref } from "vue";
import FUJI from "./THEME/FUJI/index.vue";
export default defineComponent({
  components: { FUJI },
  name: "App",
  setup() {
    const THEMECODE = "DEFAULT";
    // if (process.env.VUE_APP_LOGINTHEME) {
    //   THEMECODE = process.env.VUE_APP_LOGINTHEME;
    // }
    return {
      THEMECODE,
    };
  },
});
</script>


