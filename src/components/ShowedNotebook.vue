<template>
  <div :class="this.NBname ? 'NBmain' : 'NBname'" :style="styleObj">
    <div class="header">
      <button @click="hideNotebook" class="btn-close">&times;</button>
      <span>{{ this.NBname }}</span>
    </div>
    <!-- <p>{{ this.NBid }}</p> -->
    <!-- <p v-for="d in this.NBdata" :key="d.id">{{ d.content }}</p> -->
    <my-memo-s-d
      class="sd"
      v-for="d in NBdata"
      :key="d.index"
      :memo="d"
      :deleteMM="deleteMM"
      :addMMOD="addMMOD"
    ></my-memo-s-d>
    <!-- <button @click="test">click</button> -->
  </div>
</template>


<!--打开的笔记本！-->

<script>
import MyMemoSD from "./MyMemoSD.vue";
export default {
  components: { MyMemoSD },

  name: "ShowedNotebook",
  data() {
    return {
      memos: [],
      //NBdata: null,
      styleObj: { transform: "scale(1)" },
    };
  },
  props: [
    "showedNB",
    "hideNB",
    "getMemosNB",
    "deleteMM",
    "addMMOD",
    "showedNBname",
  ],
  methods: {
    hideNotebook() {
      this.styleObj.transform = "scale(0.01)";
      setTimeout(() => {
        this.hideNB();

        this.styleObj.transform = "scale(1)";
      }, 200);
    },

    // test() {
    //   console.log(this.NBdata[0].content);
    // },
  },
  computed: {
    NBid() {
      return this.showedNB;
    },
    NBdata() {
      return this.getMemosNB(this.NBid);
    },
    NBname() {
      return this.showedNBname;
    },
  },
};
</script>

<style scoped>
div .NBmain {
  position: absolute;
  bottom: 30px;
  right: 10px;
  width: 200px;
  height: 526px;
  margin-left: -400px;
  margin-top: -300px;
  border: 1px solid hotpink;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  background-color: #fafafa;
  z-index: 100;

  transform-origin: right bottom;
  animation: zoomIn 0.1s ease-in;
  transition: transform 0.4s ease;
}

.play {
  /* animation: zoomOut 0.1s ease-in; */
  background: yellow;
}

div .header {
  width: 201px;
  height: 30px;
  background-color: #000;
  border-radius: 3px 0 0 0;
  font-size: 13px;
  user-select: none;
}

.header > span {
  display: block;
  width: 150px;
  padding-top: 4px;
  padding-left: 8px;
  color: #fafafa;
}

.btn-close {
  height: 30px;
  width: 35px;
  font-size: 20px;
  float: right;
  border-color: #000;
  background-color: #000;
  color: #fafafa;
}

.btn-close:hover {
  background-color: rgb(239, 98, 145);
  color: #fafafa;
}

.sd {
  margin-left: 4px;
}

.header {
  opacity: 0;
}

.header:hover {
  opacity: 1;
  cursor: default;
}

@keyframes zoomIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes zoomOut {
  from {
    background: yellow;
    /* transform-origin: top left;
    transform: scale(1); */
  }
  to {
    background: red;
    /* transform-origin: top left;
    transform: scale(0); */
  }
}
</style>