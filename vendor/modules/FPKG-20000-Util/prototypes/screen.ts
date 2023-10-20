
//useCounter.js
import { ref, computed, toRefs, onMounted, reactive } from "vue";

export default function () {
  const data = reactive({
    screenWidth: 0,
  });


  const init = () => {
    window.addEventListener('resize', getWidth);
    getWidth();
  }

  const getWidth = (): void => {
    data.screenWidth = window.innerWidth || document.documentElement.clientWidth;
  }



  onMounted(async () => {
    init();
  });

  const refData = toRefs(data);
  return {
    ...refData,
  }
}



// const screen = {
//   data() {
//     return {
//       screenWidth: 0,
//     }

//   },
//   mounted() {
//     this.init();
//   },
//   methods: {
//     init() {
//       window.addEventListener('resize', this.getWidth);
//       this.getWidth();
//     },

//     getWidth(): void {
//       this.screenWidth = window.innerWidth || document.documentElement.clientWidth;
//     }
//   }
// }

// export default screen;









// import { defineComponent, getCurrentInstance, reactive, toRefs, onMounted } from "vue";
// import { useStore } from "vuex";
// import { useRoute, useRouter } from "vue-router";

// export default defineComponent({
//   setup(props, context) {
//     const data = reactive({
//       screenWidth: 0,
//     });
//     onMounted(() => {
//       init;
//     });

//     const init = () => {
//       window.addEventListener('resize', getWidth);
//       getWidth();
//     };

//     const getWidth = () => {
//       data.screenWidth = window.innerWidth || document.documentElement.clientWidth;
//     };
//     const refData = toRefs(data);
//     return {
//       ...refData,
//     };
//   }


// });





// export default class ScreenWidth extends Vue {
//   public init() {
//     window.addEventListener('resize', this.getWidth);
//     this.getWidth();
//   }

//   public getWidth(): void {
//     this.screenWidth = window.innerWidth || document.documentElement.clientWidth;
//   }

//   /**
//    * mounted
//    */
//   public mounted() {
//     this.init();
//   }

//   private screenWidth: number = 0

//   get $screen() {
//     return { width: this.screenWidth };
//   }
// }


// export default {
//   computed: {
//     $screenWidth() {
//       return vm.screenWidth
//     },
//     // 大約是直放的手機
//     $xs() {
//       return vm.screenWidth < 576
//     },
//     // 手機模式
//     $sm() {
//       return vm.screenWidth < 768 && vm.screenWidth > 577
//     },
//     // 平板直放
//     $md() {
//       return vm.screenWidth < 992
//     },
//     $lg() {
//       return vm.screenWidth > 991
//     },
//     $xl() {
//       return vm.screenWidth > 1200
//     }
//   },
//   mounted() {
//     vm.init()
//   }
// }
