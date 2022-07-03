import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      counter: 1,
      isGlobalLoading: true, // 全局loading
      jsonData: {}, // 服务器下发的json配置
      plan_id: null, // 埋点用
      isTest:
        window.location.href.indexOf('test') !== -1 ||
        process.env.NODE_ENV === 'development', // 是否是测试或者本地开发模式
      isLegalUser: true, // 是否是合法用户（对应地区），是的话true，不是就false
    };
  },
  actions: {
    setCounter(res) {
      this.counter = res;
    },
    setJsonData(res) {
      this.jsonData = res;
    },
    setPlanId(res) {
      this.plan_id = res;
    },
    setIsLegalUser(res) {
      this.isLegalUser = res;
    },
    setIsLoadingConfig(res) {
      this.isGlobalLoading = res;
    },
  },
});
