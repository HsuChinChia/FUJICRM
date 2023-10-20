// eslint-disable-next-line import/no-cycle
import router from '@/modules/FPKG-230000-BackendCore/vueRouter';

type column = {
  column: any,
  order: 'ascending' | 'descending',
  prop: string,
}

// 前往設定好的query
const goRouter = (setting: any): void => {
  const query = JSON.parse(JSON.stringify(router.currentRoute.value.query));
  router.push({ query: { ...query, ...setting } });
};

interface data {
  search: object;
  paginator: object;
}
const getList = {
  state: {
    search: {},
    paginator: {},
  },
  actions: {
    getList({ commit }: any, data: data) {
      commit('SET_list', data);
      const search = JSON.stringify(data.search);
      const paginator = JSON.stringify(data.paginator);
      sessionStorage.setItem('search_State', search);
      sessionStorage.setItem('paginator_State', paginator);
    },
    initPaginator({ commit }: any, data: data) {
      commit('SET_list', data);
    },
  },
  mutations: {
    SET_list: (state: any, data: data) => {
      state.search = data.search ? data.search : state.search;
      state.paginator = data.paginator ? data.paginator : state.paginator;
    },
    // 排序
    sortChange: (state: any, column: column) => {
      // 設定排列對象，預設為created時以空資料取得的sort/sort_type
      let sort = column.prop;

      // 設定排列方式
      switch (column.order) {
        case 'ascending':
          state.paginator.sort_type = 'ASC';
          break;
        case 'descending':
          state.paginator.sort_type = 'DESC';
          break;
        default:
          state.paginator.sort_type = state.sort_type;
          sort = '';
          break;
      }
      const setting = {
        sort,
        sort_type: state.paginator.sort_type,
      };

      goRouter(setting);
    },
  },
};

export default getList;
