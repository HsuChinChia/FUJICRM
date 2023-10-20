<script setup lang="ts">
import { ElMessage } from "element-plus";
import {
  defineComponent,
  reactive,
  toRefs,
  nextTick,
  ref,
  onMounted,
} from "vue";

// import VConsole from 'vconsole'
// const vConsole = new VConsole()
const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.voipbuster.com ",
    },
  ],
});
const userId = Math.random().toString(36).substring(2);
// const roomId = ref('3333')
const roomId = ref("");
let socket: WebSocket;
let localStream: MediaStream;
let remoteStream: MediaStream;
let offerSdp = "";
// socket
const url = "wss://webrtc.mirfak.tw?_t=";
let ws;
const domain = "https://webrtc.mirfak.tw";
function initConnect() {
  if (!roomId.value) {
    ElMessage.error("请输入房间号");
    return;
  }
  // socket = io('https://47.95.239.198:3000')
  socket = new WebSocket("https://signaling.fedtop.com");
  // socket = io("https://signaling.fedtop.com");
  // socket = io('https://192.168.1.126:12345')
  // 连接成功时触发
  socket.on("connect", () => {
    handleConnect();
  });
  // 断开连接时触发
  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // 断线是由服务器发起的，重新连接。
      socket.connect();
    }
    ElMessage.warning("您已断开连接");
  });
  // 服务端发送报错信息
  socket.on("error", (data) => {
    ElMessage.error(data);
  });
  // 当有用户加入房间时触发
  socket.on("welcome", (data) => {
    ElMessage.success(
      data.userId === userId ? "🦄成功加入房间" : `🦄${data.userId}加入房间`
    );
  });
  // 当有用户离开房间时触发
  socket.on("leave", (data) => {
    ElMessage.warning(
      data.userId === userId ? "🦄成功离开房间" : `🦄${data.userId}离开房间`
    );
  });
  // 当有用户发送消息时触发
  socket.on("message", (data) => {});
  // 创建offer,发送给远端
  socket.on("createOffer", (data) => {
    // 发送 offer
    if (offerSdp) {
      socket.emit("offer", {
        userId,
        roomId: roomId.value,
        sdp: offerSdp,
      });
      return;
    }
    createOffer();
  });
  // 收到offer,创建answer
  socket.on("offer", (data) => {
    createAnswer(data.sdp);
  });
  // 收到answer,设置远端sdp
  socket.on("answer", (data) => {
    addAnswer(data.sdp);
  });
}
// 连接成功
function handleConnect() {
  socket.emit("join", { userId, roomId: roomId.value });
}
const init = async () => {
  const localVideo = document.getElementById("local") as HTMLVideoElement;
  const remoteVideo = document.getElementById(
    "remote-video"
  ) as HTMLVideoElement;
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  remoteStream = new MediaStream();
  localVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };
};
// 创建 offer
async function createOffer() {
  // 当一个新的offer ICE候选人被创建时触发事件
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      offerSdp = JSON.stringify(peerConnection.localDescription);
      // 发送 offer
      if (offerSdp) {
        socket.emit("offer", {
          userId,
          roomId: roomId.value,
          sdp: offerSdp,
        });
      }
    }
  };
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
}
// 创建 answer
async function createAnswer(val: string) {
  const offer = JSON.parse(val);
  peerConnection.onicecandidate = async (event) => {
    // 当一个新的 answer ICE candidate 被创建时
    if (event.candidate) {
      socket.emit("answer", {
        userId,
        roomId: roomId.value,
        sdp: JSON.stringify(peerConnection.localDescription),
      });
    }
  };
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
}
// 添加 answer
async function addAnswer(answerSdp: string) {
  const answer = JSON.parse(answerSdp);
  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer);
  }
}
// 打关摄像头
const cameraOpen = ref(true);
function handleCamera() {
  cameraOpen.value = !cameraOpen.value;
  localStream.getVideoTracks().forEach((track) => {
    track.enabled = cameraOpen.value;
  });
}
// // 开关麦克风
// const isAudioOpen = ref(true)
// function handleMic() {
//   localStream.getAudioTracks().forEach((track) => {
//     track.stop()
//   })
//   isAudioOpen.value = !isAudioOpen.value
// }
// 离开房间
function handleLeave() {
  // 关闭对等连接
  peerConnection.close();
  // 发送离开的消息
  socket.emit("leave", { userId, roomId: roomId.value });
  // 关闭socket连接
  socket.disconnect();
}
onMounted(async () => {
  await init();
});
</script>
<template>
  <div class="content">
    <div class="signaling-p2p-container">
      <div class="video-container">
        <div class="main-video">
          <video
            id="remote-video"
            class="remote-video"
            autoplay
            playsinline
          ></video>
          <div class="video-title">對方</div>
        </div>
        <div class="video-list">
          <div class="video-box">
            <video id="local" autoplay playsinline></video>
            <div class="video-title">我</div>
          </div>
        </div>
      </div>
      <div class="operation">
        房间号：
        <el-input
          v-model="roomId"
          style="width: 150px; margin-right: 20px"
          placeholder="要加入的房间号"
          clearable
          @keyup.enter="initConnect"
        ></el-input>
        <el-button type="primary" @click="initConnect">加入</el-button>
        <el-button
          :type="cameraOpen ? 'warning' : 'primary'"
          @click="handleCamera"
          >{{ cameraOpen ? "关闭" : "打开" }}视频</el-button
        >
        <el-button type="danger" @click="handleLeave">离开</el-button>
        <!-- <el-button :type="cameraOpen ? 'warning' : 'primary'" @click="handleMic">
        {{ cameraOpen ? '关闭' : '打开' }}麦克风
      </el-button> -->
        <!--   <el-button type="primary" @click="createAnswer(offerSdp)">
        创建answer
      </el-button>
      <el-button type="primary" @click="addAnswer">添加answer</el-button> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  overflow: auto;
  height: calc(100vh);
  width: 100%;
  position: relative;
  background: #e8f1ff;
  .signaling-p2p-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    .video-container {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 100%;
      video {
        margin: 0 auto;
        // border: 4px solid #048ff2;
        background-color: #363739;
        widows: 100%;
        height: 100%;
      }
      .main-video {
        flex: 1;
        height: 100%;
        border-radius: 30px;
        background-color: #3f4044;
        position: relative;
      }
      .video-title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #000000b3;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
        padding: 5px;
        border-left: 4px;
        border-right: 4px;
        border-bottom: 4px;
        border-style: solid;
        border-width: 2px;
        border-color: #048ff2;
      }
      .video-list {
        width: 300px;
        padding: 20px;
        height: 100%;
        background-color: #405982;
        .video-box {
          position: relative;
        }
        video {
          width: 100%;
          height: 200px;
        }
      }
    }
    .operation {
      width: 100%;
      height: 100px;
      text-align: center;
      background-color: #405982;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<style>
body {
  margin: 0;
}
</style>