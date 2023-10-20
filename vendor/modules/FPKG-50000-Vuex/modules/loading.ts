
const loading = {
  state: {
    isShow: false,
  },
  actions: {
    openLoading({ commit }: any) {
      commit('open');
    },
    closeLoading({ commit }: any) {
      commit('close');
    },
  },
  mutations: {
    open: (state: any) => {
      state.isShow = true;
    },
    close: (state: any) => {
      state.isShow = false;
    },
  },
};
export default loading;
