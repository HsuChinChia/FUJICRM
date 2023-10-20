type auto_component = Record<string, __WebpackModuleApi.RequireContext>;

/**
 * 自動註冊 API_INFO
 * @param requireComponents 需要引入的部分 ex: require.context('./', false, /\.vue/);
 * @returns 一串 components 設定，可用 components:{ ...AUTO_COMPONENTS } 使其註冊
 */
const GET_COMPONENTS = (requireComponents: __WebpackModuleApi.RequireContext) => {
  const AUTO_COMPONENT = requireComponents
    .keys()
    .reduce((setting: auto_component, fileName: string) => {
      // 組件
      const reqCom = requireComponents(fileName);
      // 擷取組件名稱
      const reqComName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
      // 组件掛載
      setting[reqComName] = reqCom.default || reqCom;
      return setting;
    }, {});
  return AUTO_COMPONENT;
}

export default GET_COMPONENTS;
