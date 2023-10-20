<!-- icon產生器
目前支援兩種規範的icon，分別為:
1. fontAwesome 5版，使用fas far fab 開頭的class，可再加上其他的class名稱做細部修正 例: fas fa-user
2. material.io，不符fa-*的class即可
material與fa-2x的問題，目前執行沒有其他異常
-->
<template>
  <i v-if="icon" :class="checkIcon(icon)" class="fa-fw" aria-hidden="true">
    {{ iconText }}
  </i>
</template>

<script>
export default {
  name: "icon",
  props: ["icon"],
  methods: {
    // icon關鍵字偵測，針對class
    checkIcon(icon) {
      // icon有值時才觸發
      if (icon) {
        // 宣告字串
        const string = icon.toLowerCase();
        // 開始尋找
        const fa = string.indexOf("fa-");
        // 只要其中一值符合fontAwesome規範，則以fa方式印出icon
        // 反之class轉為material
        if (fa > -1) {
          return icon;
        }
        return `material-icons ${icon}`;
      }
      return "";
    },
  },
  computed: {
    // icon關鍵字偵測，針對後方雙括弧
    iconText() {
      const { icon } = this;
      if (icon) {
        // 再次宣告字串
        const string = icon.toLowerCase();
        // 開始尋找
        const fa = string.indexOf("fa-");
        // 只有在其值不符fontawesome時才列印material.io規範的icon
        if (fa === -1) {
          return icon;
        }
      }
      return "";
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* NOTE:將googleIcon修正和fontAwesome相容 */

.material-icons {
  font-size: 1.1em;
  text-align: center;
  vertical-align: sub;
}

.material-icons.fa-xs {
  font-size: 0.825em;
}

.material-icons.fa-sm {
  font-size: 0.9625em;
}

.material-icons.fa-lg {
  font-size: 1.463em;
}

.material-icons.fa-2x {
  font-size: 2.2em;
}

.material-icons.fa-3x {
  font-size: 3.3em;
}

.material-icons.fa-5x {
  font-size: 5.5em;
}

.material-icons.fa-7x {
  font-size: 7.7em;
}

.material-icons.fa-10x {
  font-size: 11em;
}
</style>
