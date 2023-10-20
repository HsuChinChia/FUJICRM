
const getSidebar = {
  state: {
    width: 230,
    initwidth: 230,
    PCsidebar: false,
    sidebar: false,
    toolbar: false,
  },
  actions: {
    setWidth({ commit }: any, data: any) {
      commit('SET_width', data);
    },
    setInitWidth({ commit }: any, data: any) {
      commit('SET_initwidth', data);
    },
    setPCsidebar({ commit }: any, data: any) {
      console.log('data', data);
      commit('SET_PCsidebar', data);
    },
    setsidebar({ commit }: any, data: any) {
      commit('SET_sidebar', data);
    },
    settoolbar({ commit }: any, data: any) {
      commit('SET_toolbar', data);
    },
  },
  mutations: {
    SET_width: (state: any, data: any) => {
      state.width = data === 0 ? state.initwidth : data;
    },
    SET_initwidth: (state: any, data: any) => {
      state.initwidth = data;
    },
    SET_PCsidebar: (state: any, data: any) => {
      state.PCsidebar = data;
    },
    SET_sidebar: (state: any, data: any) => {
      state.sidebar = data;
    },
    SET_toolbar: (state: any, data: any) => {
      state.toolbar = data;
    },
  },
};
export default getSidebar;
