(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Theme0"],{"1fae":function(e,c,t){"use strict";t("4039")},4039:function(e,c,t){},"42d3":function(e,c,t){"use strict";t.r(c);var n=t("7a23");const a={class:"d-flex justify-content-center align-items-center",style:{cursor:"pointer"}},o={class:"d-none d-md-block"},s=Object(n["m"])(" 登入者: "),b={class:""};function l(e,c,t,l,r,d){const i=Object(n["N"])("el-image"),u=Object(n["N"])("icon"),j=Object(n["N"])("el-dropdown-item"),O=Object(n["N"])("el-dropdown-menu"),f=Object(n["N"])("el-dropdown");return Object(n["E"])(),Object(n["j"])(f,{trigger:"click"},{dropdown:Object(n["db"])(()=>[Object(n["n"])(O,null,{default:Object(n["db"])(()=>[Object(n["n"])(j,null,{default:Object(n["db"])(()=>[Object(n["n"])(u,{icon:"fas fa-user",class:"mr-0"}),Object(n["m"])(" "+Object(n["R"])(e.userAccount()),1)]),_:1}),Object(n["n"])(j,{divided:"",onClick:e.changePass},{default:Object(n["db"])(()=>[Object(n["n"])(u,{icon:"fas fa-key",class:"mr-0"}),Object(n["m"])(" "+Object(n["R"])(e.$i18n.global.t("Theme.changePass")),1)]),_:1},8,["onClick"]),Object(n["n"])(j,{onClick:e.clearCache},{default:Object(n["db"])(()=>[Object(n["n"])(u,{icon:"fas fa-redo-alt",class:"mr-0"}),Object(n["m"])(" "+Object(n["R"])(e.$i18n.global.t("Theme.clearCache")),1)]),_:1},8,["onClick"]),Object(n["n"])(j,{onClick:c[1]||(c[1]=c=>e.logout())},{default:Object(n["db"])(()=>[Object(n["n"])(u,{icon:"fas fa-sign-out-alt",class:"mr-0"}),Object(n["m"])(" "+Object(n["R"])(e.$i18n.global.t("Account.logout")),1)]),_:1})]),_:1})]),default:Object(n["db"])(()=>[Object(n["n"])("div",a,[Object(n["n"])(i,{style:{width:"25px"},class:"mr-2",src:"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"}),Object(n["n"])("div",o,[s,Object(n["n"])("span",b,Object(n["R"])(e.userAccount()),1)]),Object(n["n"])(u,{icon:"fas fa-caret-down "})])]),_:1})}t("14d9");var r=t("6605"),d=Object(n["o"])({name:"HeaderFunction",components:{},setup(e,c){const t=Object(n["p"])(),a=(Object(r["e"])(),Object(r["f"])()),o=()=>{window.location.reload(!0)},s=()=>{const e=JSON.parse(localStorage.getItem("userInfo")||"{}");return e.p3_account.p3_ant_account},b=()=>{a.push("/changePassword")},l=async()=>{await t.appContext.config.globalProperties.$http.put("account/auth/logout");a.push("/login")};return{clearCache:o,userAccount:s,changePass:b,logout:l}}}),i=(t("1fae"),t("6b0d")),u=t.n(i);const j=u()(d,[["render",l]]);c["default"]=j}}]);
//# sourceMappingURL=Theme0.1697790764554.js.map