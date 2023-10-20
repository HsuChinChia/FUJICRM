import { defineComponent, reactive, getCurrentInstance } from 'vue';
import { PrototypesCrud } from '@/modules/FPKG-20000-Util/prototypes/crud';

export function libratCrud() {
  const { proxy }: any = getCurrentInstance();
  let { crud } = PrototypesCrud();
  const getToolbarCrud = (feature: toolbar): number => {
    switch (feature) {
      case 'create':
        return 8;
      case 'save':
      case 'saveAndGo':
      case 'keepCreate':
      case 'modify':
      case 'allPass':
      case 'allFail':
      case 'allOpen':
      case 'allClose':
      case 'setMember':
        return 2;
      case 'delete':
        return 1;
      case 'info':
      case 'role':
      case 'search':
      case 'advSearch':
      case 'pager':
      case 'export':
      case 'yesterday':
      case 'today':
      case 'BeforeWeek':
      case 'Week':
      case 'BeforeMoon':
      case 'Moon':
      case 'customTime':
        return 4;
      default:
        return 0;
    }
  };

  const getRouterPermission = (
    toolbars: toolbar[],
    feature: toolbar,
  ): boolean => {
    if (Array.isArray(toolbars)) {
      return toolbars.indexOf(feature) !== -1;
    }
    return false;
  };

  /**
   * getCrud 與router和本地端的crud做計算
   */
  const getCrud = (feature: toolbar): boolean => {
    const routerToolbars: toolbar[] = proxy.$route.meta.toolbar;
    const toolbarCrud: number = getToolbarCrud(feature);
    const routerPermission: boolean = getRouterPermission(
      routerToolbars,
      feature,
    ); // 儲存在開發端router上的權限
    const localePermission: boolean = (crud() & toolbarCrud) !== 0; // 儲存在使用者端的menu權限
    return routerPermission && localePermission; // 兩者共同計算
  };

  return {
    getCrud,
    getRouterPermission,
    getToolbarCrud,
  };
}
