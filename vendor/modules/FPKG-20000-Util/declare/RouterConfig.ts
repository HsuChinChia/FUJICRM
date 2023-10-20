import { RouterOptions as orginRouteConfig } from 'vue-router';

/** 工具列設定 */
type toolbars =
  'create'
  | 'info'
  | 'modify'
  | 'delete'
  | 'search'
  | 'advSearch'
  | 'pager'
  | 'export'
  | 'save'
  | 'saveAndGo'
  | 'keepCreate'
  | 'role'
  | 'allPass'
  | 'allFail'
  | 'allOpen'
  | 'allClose'
  | 'yesterday'
  | 'today'
  | 'BeforeWeek'
  | 'Week'
  | 'BeforeMoon'
  | 'Moon'
  | 'customTime'
  | 'setMember'
  | 'previousPage';

/** router的基本設置,從原有的routerConfig進行擴充 */
type children = RouteConfig;

declare global {
  type toolbar = toolbars;
  interface RouteConfig extends orginRouteConfig {
    meta?: {
      /** 是否使用工具列 */
      toolbar?: toolbar[];
      /** 綁定的權限路徑 */
      url?: string;
      /** 顯示的標題 */
      title?: string;
      /** 是否滾動至頂，或指定selector */
      scroll?: boolean | string;
    };
    children?: RouteConfig[];
  }
}
