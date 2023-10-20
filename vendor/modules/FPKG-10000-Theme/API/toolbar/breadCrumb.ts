import { watch, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

type bread = { label: string; href: string; icon: string };

export default () => {
  const $route = useRoute();
  const $router = useRouter();
  const $store = useStore();
  const breadcrumb = ref([] as bread[]);
  const $i18n = useI18n();

  /** 判斷是否為 i18n 並輸出文字 */
  const breadSubstring = (label: string) => {
    const VUE_APP_NAME = process.env.VUE_APP_NAME;
    // const PATH = `Permission.${label}`;
    // 判斷該env有沒有節點語系
    if ($i18n.te(`${VUE_APP_NAME}.${label}`)) {
      return $i18n.t(`${VUE_APP_NAME}.${label}`);
    }
    else if ($i18n.te(`Permission.${label}`)) {
      return $i18n.t(`Permission.${label}`)
    }
    return label;
  };

  /**
   * 將麵包屑用遞迴方式實做出來
   */
  const actions = (
    data: Array<object>,
    urlList: Array<object>,
    pid?: number,
  ) => {
    if (pid !== null) {
      const node: any = urlList.find((item: any) => item.p4_node_id === pid);
      data.push({
        label: node.p4_node_code,
        href: node.p4_node_route,
        icon: node.icon,
      });
      actions(data, urlList, node.p4_node_pid);
    }
  };

  const breadcrumbList = () => {
    const tempData: Array<bread> = [];
    const urlList = JSON.parse(localStorage.getItem('Node') || '[]');
    const routeUrl = $route.meta.url;
    const node = urlList.filter(
      (item: any) => item.p4_node_route === routeUrl,
    )[0];
    if (node) {
      tempData.push({
        label: node.p4_node_code,
        href: node.p4_node_route,
        icon: node.icon,
      });
      actions(tempData, urlList, node.p4_node_pid);
      tempData.reverse();
    }
    return tempData;
  };

  /** 額外增加的麵包屑 */
  const addBread = (newValue: any, oldValue: any) => {
    /** 原始設定 */
    breadcrumb.value = breadcrumbList();

    if (newValue instanceof Array) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        breadcrumb.value = breadcrumb.value.concat(newValue);
      }
    } else if (typeof newValue === 'object' && newValue.label) {
      breadcrumb.value.push(newValue);
    }
  };

  const breadcrumbData = computed(() => $store.state.getBreadcrumb.breadcrumb);

  watch(breadcrumbData, addBread, { immediate: true });

  $router.afterEach((to, from) => {
    /** 當 router 出現變動時，清除自設的麵包屑 */
    if (to.path !== from.path) {
      $store.dispatch('setBread', {});
    }
  });

  return {
    breadcrumb,
    breadSubstring,
  };
};
