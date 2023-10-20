interface getter {
  getList: object;
  Breadcrumb: object;
  setLogin: object;
  getTransfer: object;
  getSidebar: object;
  loading: object;
  Branch: object;
  userInfo: object;
  toolsBtn: object;
}
const getters = {
  getList: (state: getter) => state.getList,
  getBreadcrumb: (state: getter) => state.Breadcrumb,
  account: (state: getter) => state.setLogin,
  Transfer: (state: getter) => state.getTransfer,
  getSidebar: (state: getter) => state.getSidebar,
  loading: (state: getter) => state.loading,
  branch: (state: getter) => state.Branch,
  userInfo: (state: getter) => state.userInfo,
  toolsBtn: (state: getter) => state.toolsBtn,
};

export default getters;
