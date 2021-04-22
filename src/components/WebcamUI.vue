<template>
  <h2>1. Start your Webcam</h2>
  <div class="videos">
    <span>
      <h3>Local Stream</h3>
      <video v-if="webcamVideo" id="webcamVideo" :srcObject ="webcamVideo" autoplay="autoplay"/>
    </span>
    <span>
      <h3>Remote Stream</h3>
      <video id="remoteVideo" autoplay playsinline></video>
    </span>
  </div>
  <button v-on:click="startWebCam">Start webcam</button>
  <h2>2. Create a new Call</h2>
  <button id="callButton" disabled>Create Call (offer)</button>

  <h2>3. Join a Call</h2>
  <p>Answer the call from a different browser window or device</p>

  <input id="callInput" />
  <button id="answerButton" disabled>Answer</button>

  <h2>4. Hangup</h2>

  <button id="hangupButton" disabled>Hangup</button>
</template>

<script lang="ts">
import { ref, getCurrentInstance, defineComponent } from "vue";
const webcamVideo = document.getElementById('webcamVideo');
export default defineComponent({
  name: "WebcamUI",
  props: {},
  data: () => {
    return {
      localStream: null,
      remoteStream: null,
      pc: null,
      servers: {
        iceServers: [
          {
            urls: [
              "stun:stun1.1.google.com:19302",
              "stun:stun2.1.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      },
    };
  },
  methods: {
    startWebCam: async (
      localStream: Object,
      remoteStream: Object,
      pc: Object,
      servers: Object,
      webcamVideo: Object
    ) => {
      console.log(servers)
      pc = new RTCPeerConnection(servers);
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      remoteStream = new MediaStream();
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track);
        });
      }
      webcamVideo.srcObject = localStream;


    },
  },
});
</script>

<style scoped>
</style>