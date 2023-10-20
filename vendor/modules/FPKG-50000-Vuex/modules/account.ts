/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/** 登入的狀態 */
import $router from '@/modules/FPKG-230000-BackendCore/vueRouter';

const login = window.localStorage.getItem('loging') === 'true';

type state = {
  login: boolean
}

const state: state = {
  login,
};

const account = {
  state,
  mutations: {
    setLogin: (st: state, loginState: boolean) => {
      st.login = loginState;
      if (loginState === true) {
        return window.localStorage.setItem('loging', 'true');
      }

      window.localStorage.clear();
      return $router.push({ name: 'login' });
    },
  },
  actions: {
    setLogin({ commit }: any, loginState: boolean) {
      commit('setLogin', loginState);
    },
  },
};
export default account;
