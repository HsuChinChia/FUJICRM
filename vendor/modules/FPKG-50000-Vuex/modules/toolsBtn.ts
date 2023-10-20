
const userInfo = {
  state: {
    btn: {},
    btn2: {},
    btn_creatName: '',
    show_btn_create: true,
    show_btn_info: true,
    show_btn_modify: true,
    show_btn_save: true,
  },
  actions: {
    creat_tools_btn({ commit }: any, data: any) {
      commit('SET_btn', data);
    },
    creat_tools_btn2({ commit }: any, data: any) {
      commit('SET_btn2', data);
    },
    tools_btn_creatName({ commit }: any, data: any) {
      commit('creatName', data);
    },
    show_btn_create({ commit }: any, data: any) {
      commit('btn_create', data);
    },
    show_btn_info({ commit }: any, data: any) {
      commit('btn_info', data);
    },
    show_btn_modify({ commit }: any, data: any) {
      commit('btn_modify', data);
    },
    show_btn_save({ commit }: any, data: any) {
      commit('btn_save', data);
    },
  },
  mutations: {
    SET_btn: (state: any, data: any) => {
      state.btn = data;
    },
    SET_btn2: (state: any, data: any) => {
      state.btn2 = data;
    },
    creatName: (state: any, data: any) => {
      state.btn_creatName = data;
    },
    btn_create: (state: any, data: any) => {
      state.show_btn_create = data;
    },
    btn_info: (state: any, data: any) => {
      state.show_btn_info = data;
    }, btn_modify: (state: any, data: any) => {
      state.show_btn_modify = data;
    }, btn_save: (state: any, data: any) => {
      state.show_btn_save = data;
    },
  },
};

export default userInfo;
