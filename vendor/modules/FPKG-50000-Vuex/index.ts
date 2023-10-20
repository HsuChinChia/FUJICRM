import { createStore } from 'vuex'
import getList from './modules/getList';
import getBreadcrumb from './modules/getBreadcrumb';
import account from './modules/account';
import getTransfer from './modules/hud';
import getSidebar from './modules/sidebar';
import loading from './modules/loading';
import Branch from './modules/Branch';
import userInfo from './modules/userInfo';
import toolsBtn from './modules/toolsBtn';
import getter from './getters';

export default createStore({
  mutations: {
  },
  actions: {
  },
  getters: getter,
  modules: {
    getList,
    getBreadcrumb,
    account,
    getTransfer,
    getSidebar,
    loading,
    Branch,
    userInfo,
    toolsBtn
  }
})
