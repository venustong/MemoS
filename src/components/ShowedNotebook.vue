<template>
  <div class="NBmain">
    <div class="header">
      <button @click="hideNotebook" class="btn-close">&times;</button>
    </div>
    <p>{{ this.NBid }}</p>
    <p v-for="d in this.NBdata" :key="d.id">{{ d.content }}</p>
    <!-- <button @click="test">click</button> -->
  </div>
</template>


<!--打开的笔记本！-->
<script>
export default {
  name: "ShowedNotebook",
  data() {
    return {
      memos: [],
      //NBdata: null,
    };
  },
  props: ["showedNB", "hideNB", "getMemosNB"],
  methods: {
    hideNotebook() {
      this.hideNB();
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
  },
};
</script>

<style scoped>
div .NBmain {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 600px;
  margin-left: -400px;
  margin-top: -300px;
  border: 1px solid hotpink;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  background-color: #fafafa;
  z-index: 100;
}

div .header {
  width: 801px;
  height: 40px;
  background-color: #000;
}

.btn-close {
  height: 40px;
  width: 45px;
  font-size: 20px;
  float: right;
  border-color: #000;
  background-color: #000;
  color: #fafafa;
}

.btn-close:hover {
  background-color: red;
}
</style>