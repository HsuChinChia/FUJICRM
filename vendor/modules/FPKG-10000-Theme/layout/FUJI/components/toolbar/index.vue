<template>
  <pc v-if="showPc" />
  <mobile v-else />
</template>

<script>
import { defineComponent, computed } from 'vue';
import pc from './toolbar_pc.vue';
import mobile from './toolbar_mobile.vue';
import screen from '@/modules/FPKG-20000-Util/prototypes/screen';

export default defineComponent({
  name: 'toolbar',
  components: { pc, mobile },
  setup() {
    const { screenWidth } = screen();
    const showPc = computed(() => {
      return screenWidth.value > 768;
    });

    return { showPc };
  },
});
</script>
