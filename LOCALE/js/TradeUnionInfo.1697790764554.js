(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TradeUnionInfo"],{"15bb":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),a=n("3fd4");const o=Object(c["hb"])("data-v-7bc2d32d");Object(c["H"])("data-v-7bc2d32d");const i={class:"content"},s={class:"signaling-p2p-container"},r=Object(c["n"])("div",{class:"video-container"},[Object(c["n"])("div",{class:"main-video"},[Object(c["n"])("video",{id:"remote-video",class:"remote-video",autoplay:"",playsinline:""}),Object(c["n"])("div",{class:"video-title"},"對方")]),Object(c["n"])("div",{class:"video-list"},[Object(c["n"])("div",{class:"video-box"},[Object(c["n"])("video",{id:"local",autoplay:"",playsinline:""}),Object(c["n"])("div",{class:"video-title"},"我")])])],-1),d={class:"operation"},l=Object(c["m"])(" 房间号： "),u=Object(c["m"])("加入"),b=Object(c["m"])("离开");Object(c["F"])();var v=Object(c["o"])({expose:[],setup(e){const t=new RTCPeerConnection({iceServers:[{urls:"stun:stun.voipbuster.com "}]}),n=Math.random().toString(36).substring(2),v=Object(c["J"])("");let p,m,O,f="";function j(){v.value?(p=new WebSocket("https://signaling.fedtop.com"),p.on("connect",()=>{w()}),p.on("disconnect",e=>{"io server disconnect"===e&&p.connect(),a["a"].warning("您已断开连接")}),p.on("error",e=>{a["a"].error(e)}),p.on("welcome",e=>{a["a"].success(e.userId===n?"🦄成功加入房间":`🦄${e.userId}加入房间`)}),p.on("leave",e=>{a["a"].warning(e.userId===n?"🦄成功离开房间":`🦄${e.userId}离开房间`)}),p.on("message",e=>{}),p.on("createOffer",e=>{f?p.emit("offer",{userId:n,roomId:v.value,sdp:f}):g()}),p.on("offer",e=>{I(e.sdp)}),p.on("answer",e=>{k(e.sdp)})):a["a"].error("请输入房间号")}function w(){p.emit("join",{userId:n,roomId:v.value})}const y=async()=>{const e=document.getElementById("local"),n=document.getElementById("remote-video");m=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1}),O=new MediaStream,e.srcObject=m,n.srcObject=O,m.getTracks().forEach(e=>{t.addTrack(e,m)}),t.ontrack=e=>{e.streams[0].getTracks().forEach(e=>{O.addTrack(e)})}};async function g(){t.onicecandidate=async e=>{e.candidate&&(f=JSON.stringify(t.localDescription),f&&p.emit("offer",{userId:n,roomId:v.value,sdp:f}))};const e=await t.createOffer();await t.setLocalDescription(e)}async function I(e){const c=JSON.parse(e);t.onicecandidate=async e=>{e.candidate&&p.emit("answer",{userId:n,roomId:v.value,sdp:JSON.stringify(t.localDescription)})},await t.setRemoteDescription(c);const a=await t.createAnswer();await t.setLocalDescription(a)}async function k(e){const n=JSON.parse(e);t.currentRemoteDescription||t.setRemoteDescription(n)}const h=Object(c["J"])(!0);function D(){h.value=!h.value,m.getVideoTracks().forEach(e=>{e.enabled=h.value})}function J(){t.close(),p.emit("leave",{userId:n,roomId:v.value}),p.disconnect()}return Object(c["B"])(async()=>{await y()}),(e,t)=>{const n=Object(c["N"])("el-input"),a=Object(c["N"])("el-button");return Object(c["E"])(),Object(c["j"])("div",i,[Object(c["n"])("div",s,[r,Object(c["n"])("div",d,[l,Object(c["n"])(n,{modelValue:v.value,"onUpdate:modelValue":t[1]||(t[1]=e=>v.value=e),style:{width:"150px","margin-right":"20px"},placeholder:"要加入的房间号",clearable:"",onKeyup:Object(c["fb"])(j,["enter"])},null,8,["modelValue","onKeyup"]),Object(c["n"])(a,{type:"primary",onClick:j},{default:o(()=>[u]),_:1}),Object(c["n"])(a,{type:h.value?"warning":"primary",onClick:D},{default:o(()=>[Object(c["m"])(Object(c["R"])(h.value?"关闭":"打开")+"视频",1)]),_:1},8,["type"]),Object(c["n"])(a,{type:"danger",onClick:J},{default:o(()=>[b]),_:1})])])])}}}),p=(n("92d4"),n("aaeb"),n("6b0d")),m=n.n(p);const O=m()(v,[["__scopeId","data-v-7bc2d32d"]]);t["default"]=O},"64e8":function(e,t,n){},"92d4":function(e,t,n){"use strict";n("64e8")},"9b2a":function(e,t,n){},aaeb:function(e,t,n){"use strict";n("9b2a")}}]);
//# sourceMappingURL=TradeUnionInfo.1697790764554.js.map