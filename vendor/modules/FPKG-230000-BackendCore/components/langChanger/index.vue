<template>
  <button v-for="l in langs" :key="l" @click="changeLang(l.lang)" type="button">
    {{ l }}
  </button>
  <button @click="changeLang({})" type="button">不可用的語言</button>
  <p>{{ currentLang }}</p>
  <p>{{ $i18n.global.t("Util.noData") }}</p>
  <router-view />
</template>

<script lang='ts'>
import LANG from "@/modules/FPKG-20000-Util/API/langChanger/index";

/**
 * 語言切換
 */
export default {
  setup() {
    const { langs, changeLang, currentLang, INIT_LANG } = LANG({
      avaiableLangs: ["zh_TW", "zh_CN"],
    });
    INIT_LANG();
    return {
      changeLang,
      langs,
      currentLang,
    };
  },
};
</script>
