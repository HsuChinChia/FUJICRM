import {
  defineComponent,
  getCurrentInstance,
  ref
} from "vue";

import screen from "@/modules/FPKG-20000-Util/prototypes/screen";
import { PrototypesCrud } from "@/modules/FPKG-20000-Util/prototypes/crud";
import { useStore } from "vuex";
import store from '@/modules/FPKG-50000-Vuex/index';
import _backToList from '../library/backToList';

export function utilTools() {
  /** 視窗框度 */
  const screenWidth = ref(screen().screenWidth);
  /** 權限 */
  const { crud, getCrud } = PrototypesCrud();
  const CRUD = crud();
  /** 疑似取得vue本身的方法 例如 proxy.$route */
  const { proxy }: any = getCurrentInstance();
  /** 回到列表頁 */
  const { active: backToList } = _backToList();
  /** vuex */
  const store = useStore();
  return {
    screenWidth,
    store,
    proxy,
    CRUD,
    getCrud,
    backToList
  };

}