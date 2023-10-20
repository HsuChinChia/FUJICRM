import { reactive, defineComponent, toRefs } from "vue";
import { options } from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import router from "@/modules/FPKG-230000-BackendCore/vueRouter";


export default function () {

  const data = reactive({
    websock: {} as any,
    reconnectData: {} as any,
    lockReconnect: false,
    timeout: 25000,
    timeoutObj: {} as any,
    serverTimeoutObj: {} as any,
    parameter: {},
    path: '' as any,
    t: 0,
  });




  const initWebSocket = () => {
    if (router.currentRoute.value.path !== "/login") {
      // 舉例的URL  ://notfi.hackfbg.net
      const wsURL = options.baseURL.substring(4);
      const authorisation = localStorage.getItem('x-authorisation');
      const wsuri = `ws${wsURL}?_t=${authorisation}`;
      data.websock = new WebSocket(wsuri);
      data.websock.onopen = websocketonopen;          //連結
      data.websock.onmessage = websocketonmessage;    //廣波
      data.websock.onerror = websocketonerror;        //段開
      data.websock.onclose = websocketclose;          //關閉
    }

  };

  const websocketonopen = () => {
    heatBeat();
  }

  const websocketonmessage = (e: any) => {
    heatBeat();
    // 42 回傳的資料
    if (e.data.indexOf('42') > -1) {
      const first = e.data.indexOf('[');
      const JSONdata = e.data.slice(first);
      const redata = JSON.parse(JSONdata);
      // 路徑
      const path = redata[0];
      data.path = redata[0];
      data.t = new Date().getTime();
      // 參數資料
      const params = redata[1];
      data.parameter = redata[1];

      try {
        let modules;
        modules = require(`@/modules/${path}.ts`);
        modules.default.socket(params);
      } catch (e) {
      }
    }
  }

  const websocketonerror = () => {
    reconnect();
  }

  const websocketsend = (seandData: any) => {
    data.websock.send(seandData);
  }

  const websocketclose = () => {
    reconnect();
  }

  const reconnect = () => {
    if (data.lockReconnect) {
      return
    }
    data.lockReconnect = true;
    data.reconnectData && clearTimeout(data.reconnectData);
    data.reconnectData = setTimeout(() => {
      initWebSocket();
      data.lockReconnect = false;
    }, 3000)
  }



  const heatBeat = () => {
    // 不在登入頁時執行websocketsend
    if (router.currentRoute.value.path !== "/login") {
      data.timeoutObj && clearTimeout(data.timeoutObj);
      data.serverTimeoutObj && clearTimeout(data.serverTimeoutObj);
      data.timeoutObj = setTimeout(() => {
        websocketsend('["heartbeat","ping"]')
        data.serverTimeoutObj = setTimeout(() => {
          data.websock.close();       //沒有收到資料後 段開重連
        }, 3000);
      }, data.timeout);
    } else {
      data.websock.close();
    }
  }
  const refData = toRefs(data);

  return {
    ...refData,
    initWebSocket,
    heatBeat,
  }
}













// import { Component, Vue, Watch } from 'vue-property-decorator';
// import { options } from '@/modules/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通


// @Component
// export default class Socket extends Vue {

//   private websock: any;
//   private reconnectData: any;
//   private lockReconnect = false    //避免重複連接，因為onerror之後會立即觸發onclose
//   private timeout = 50000;   //50s一次心跳
//   private timeoutObj: any;
//   private serverTimeoutObj: any;

//   initWebSocket() {
//     // 舉例的URL  ://notfi.hackfbg.net
//     const wsURL = options.baseURL.substring(4);
//     const authorisation = localStorage.getItem('x-authorisation');
//     const wsuri = `ws${wsURL}?_t=${authorisation}`;
//     this.websock = new WebSocket(wsuri);
//     this.websock.onopen = this.websocketonopen;          //連結
//     this.websock.onmessage = this.websocketonmessage;    //廣波
//     this.websock.onerror = this.websocketonerror;        //段開
//     this.websock.onclose = this.websocketclose;          //關閉
//   };

//   websocketonopen() {
//     this.heatBeat();
//   }

//   public websocketonmessage(e: any) {
//     this.heatBeat();
//     // 42 回傳的資料
//     if (e.data.indexOf('42') > -1) {
//       const first = e.data.indexOf('[');
//       const data = e.data.slice(first);
//       const redata = JSON.parse(data);
//       // 路徑
//       const path = redata[0];
//       // 參數資料
//       const params = redata[1];
//       try {
//         let modules;
//         modules = require(`@/modules/${path}.ts`);
//         modules.default.socket(params);
//       } catch (e) {
//       }
//     }
//   }

//   websocketonerror() {
//     this.reconnect();
//   }

//   websocketsend(data: any) {
//     this.websock.send(data);
//   }

//   websocketclose() {
//     this.reconnect();
//   }

//   reconnect() {
//     if (this.lockReconnect) {
//       return
//     }
//     this.lockReconnect = true;
//     this.reconnectData && clearTimeout(this.reconnectData);
//     this.reconnectData = setTimeout(() => {
//       this.initWebSocket();
//       this.lockReconnect = false;
//     }, 3000)
//   }

//   heatBeat() {
//     this.timeoutObj && clearTimeout(this.timeoutObj);
//     this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
//     this.timeoutObj = setTimeout(() => {
//       this.websocketsend('["heartbeat","ping"]')
//       this.serverTimeoutObj = setTimeout(() => {
//         this.websock.close();       //沒有收到資料後 段開重連
//       }, 3000);
//     }, this.timeout)
//   }

//   /**
//    * mounted
//    */
//   public created() {
//     this.initWebSocket();
//   }

//   destroyed() {
//     this.lockReconnect = true;
//     this.websock.close()
//     clearTimeout(this.reconnectData);
//     clearTimeout(this.timeoutObj);
//     clearTimeout(this.serverTimeoutObj);
//   }

// }