-<template>
  <div>
    <button class="btn-add" @click="addMemoOnDesk">
      <i class="fa fa-plus"></i>
    </button>
    <my-memo-o-d
      v-for="m in memosOnDesk"
      :key="m.id"
      :id="m.id"
      :memosOnDesk="memosOnDesk"
      :memo="m"
      :updateMMOD="updateMMOD"
      :deleteMMOD="deleteMMOD"
    ></my-memo-o-d>
  </div>
</template>

<script>
/*
https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer 
DataTransfer 对象用于保存拖动并放下（drag and drop）过程中的数据。
*/

import MyMemoOD from "./MyMemoOD.vue";
import { nanoid } from "nanoid";
export default {
  name: "MyDesk",
  components: {
    MyMemoOD,
  },
  computed: {},
  methods: {
    //添加便签
    addMemoOnDesk() {
      //console.log("add memo!");
      const MemoODObj = {
        id: nanoid(),
        content: "",
        notebookId: "001",
        "position-t": Math.floor(Math.random() * 200),
        "position-l": Math.floor(Math.random() * 200),
        "z-index": 0,
      };
      this.addMMOD(MemoODObj);
    },
  },
  props: ["memosOnDesk", "addMMOD", "updateMMOD", "deleteMMOD"],
};
</script>

<style>
.btn-add {
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 0;
}
.btn-add:hover {
  background-color: hotpink;
  color: #fafafa;
}
</style>