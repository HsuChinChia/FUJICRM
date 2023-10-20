<template>
  <span
    :class="showClass(data.color || data.type)"
    :style="showStyle(data.color)"
  >
    <icon
      :icon="data.icon"
      :title="getLabel(data.label)"
      style="cursor: help"
    ></icon>
    <template v-if="text">{{ getLabel(data.label) }}</template>
  </span>
</template>
<script>
export default {
  name: 'b-status-option',
  methods: {
    getLabel(str) {
      if (this.$i18n.global.te(str)) {
        return this.$i18n.global.t(str);
      }
      return str;
    },
    showClass(color) {
      const IS_HEX = /[0-9A-Fa-f]{6}/.test(color);
      if (IS_HEX) {
        return '';
      }
      const { type } = this;
      const bg = color;
      switch (type) {
        case 'badge':
          return `badge badge-${bg}`;
        case 'border':
          return `border border-${bg} text-${bg} rounded px-1 py-1 bg-white`;
        default:
          return `text-${bg}`;
      }
    },
    showStyle(HEX) {
      const IS_HEX = /[0-9A-Fa-f]{6}/.test(HEX);
      if (!IS_HEX) {
        return {};
      }

      const { type } = this;
      switch (type) {
        case 'badge':
          return {
            background: HEX,
            'border-radius': '3px',
            color: '#FFFFFF',
            padding: '3px 6px',
          };
        case 'border':
          return {
            background: '#FFFFFF',
            border: `1px solid ${HEX}`,
            color: HEX,
            'border-radius': '3px',
            padding: '3px 6px',
          };
        default:
          return `color: ${HEX}`;
      }
    },
  },
  computed: {
    data() {
      const result = this.options.filter((x) => x[this.id] === this.value);
      // 不直接匯出label，因為若options找不到(undefined時)會出錯，因此多一層過濾
      if (result.length && typeof result[0] === 'object') {
        return result[0];
      }
      return { label: 'Util.noData' };
    },
  },
  props: {
    /** 外觀樣式，有預設 border badge */
    type: {
      type: String,
      default: '',
    },
    text: {
      type: Boolean,
      default: true,
    },
    /** 項目群 */
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    /** 輸入的值 */
    value: {
      default: '',
    },
    /** 指定的id名稱 */
    id: {
      type: String,
      default: 'value',
    },
  },
};
</script>
