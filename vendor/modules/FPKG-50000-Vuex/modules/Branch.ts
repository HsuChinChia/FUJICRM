
const Branch = {
  state: {
    data: {},
    listStyle: 'RWD',
  },
  actions: {
    getBranch({ commit }: any, data: any) {
      commit('SET_state', data);
    },
  },
  mutations: {
    SET_state: (state: any, data: any) => {
      state.data = data;
      state.listStyle = data.branch_setting ? data.branch_setting.p17_ebs_phone_list_style : 'RWD';
    },
  },
};

export default Branch;
