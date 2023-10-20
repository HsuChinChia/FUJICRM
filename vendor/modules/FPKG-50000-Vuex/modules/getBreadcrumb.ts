
interface breadcrumb {
  href: string;
  label: string;
}
const getBreadcrumb = {
  state: {
    breadcrumb: {},
  },
  actions: {
    setBread({ commit }: any, data: breadcrumb) {
      commit('SET_Bread', data);
    },
  },
  mutations: {
    SET_Bread: (state: any, data: breadcrumb) => {
      state.breadcrumb = data;
    },
  },
};
export default getBreadcrumb;
