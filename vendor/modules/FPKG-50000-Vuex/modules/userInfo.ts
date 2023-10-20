
const userInfo = {
  state: {
    data: {},
  },
  actions: {
    userInfo({ commit }: any, data: any) {
      commit('SET_userInfo', data);
    },
  },
  mutations: {
    SET_userInfo: (state: any, data: any) => {
      state.data = data;
    },
  },
};

export default userInfo;
