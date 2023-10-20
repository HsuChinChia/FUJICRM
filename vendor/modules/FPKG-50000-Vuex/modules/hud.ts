
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通

const getTransfer = {
  state: {
    transfer: {
    },
    transferLang: {
    },
    ring: false,
    status: false,
  },
  actions: {

    // 抬頭的資料
    sendHud({ commit }: any, data: any) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      userInfo[data.name] = Number(data.count);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      commit('SET_sendHud', data);

    },
    // 初始化鈴聲
    InitRing({ commit }: any) {
      commit('SET_Ring');
    },
    // 初始化狀態
    InitHudStatus({ commit }: any) {
      commit('SET_HudStatus');
    },
  },
  mutations: {
    SET_sendHud: (state: any, data: any) => {
      state.transfer[data.path] = data.count;
      state.transferLang[data.path] = data.lang;
      state.ring = data.ring;
      state.status = true;
    },

    SET_Ring: (state: any) => {
      state.ring = false
    },
    SET_HudStatus: (state: any) => {
      state.status = false
    },








    // SET_Purchase: (state: any, data: any) => {
    //   state.transfer['inventory/order-audit-purchase/lists'] = data.count;
    // },
    // SET_Sales: (state: any, data: any) => {
    //   state.transfer['inventory/order-audit-sales/lists'] = data.count;
    // },
    // SET_Transfer: (state: any, data: any) => {
    //   state.transfer['inventory/order-audit-transfer/lists'] = data.count;
    // },

    // SET_Warehouse: (state: any, data: any) => {
    //   state.transfer['inventory/warehouse/lists'] = data.count;
    // },

    // SET_ReviewSportsLotteryHistory: (state: any, data: any) => {
    //   state.transfer['fedPoint/review-sportsLotteryHistory/lists'] = data.count;
    // },

  },
};
export default getTransfer;
