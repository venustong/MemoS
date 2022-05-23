-<template>
  <div class="sideMemos" @click="showSideMenu(0)" @dblclick="showMMTD">
    <button class="btn-detail" @click.stop="showSideMenu(1)">
      <i class="fa fa-ellipsis-h"></i>
    </button>
    <ul v-show="showedSideMenu" @mouseleave.stop="showSideMenu(0)">
      <li class="delete" @click.stop="deleteMemo">delete</li>
      <li>move</li>
    </ul>
    <p class="pId">{{ this.memo.id }}</p>
    <p class="pContent">
      <i class="fa fa-star" v-show="this.memo.notebookId != '001'"></i
      >{{ this.memo.content }}
    </p>
  </div>
</template>

<script>
export default {
  name: "MyMemoSD",
  props: ["memo", "deleteMM", "addMMOD"],
  data() {
    return {
      showedSideMenu: false,
    };
  },
  methods: {
    showSideMenu(val) {
      this.showedSideMenu = val;
    },
    deleteMemo() {
      this.deleteMM(this.memo.id);
    },
    showMMTD() {
      const MemoODObj = {
        id: this.memo.id,
        content: this.memo.content,
        notebookId: this.memo.notebookId,
        "position-t": Math.floor(Math.random() * 200),
        "position-l": Math.floor(Math.random() * 200),
        "z-index": 0,
      };
      this.addMMOD(MemoODObj);
    },
  },
};
</script>

<style>
.btn-detail {
  float: right;
  width: 20px;
  height: 20px;
}

ul {
  position: absolute;
  top: 5px;
  right: 0;
  width: 50px;
  height: auto;
  list-style: none;
  border: 1px solid #000;
  border-bottom: 0;
  background-color: #fafafa;
}

ul li {
  line-height: 16px;
  cursor: default;
  border-bottom: 1px solid #000;
}
ul li:hover {
  background-color: #aaa;
}

.sideMemos {
  position: relative;
  width: 180px;
  min-height: 50px;
  max-height: 100px;
  border: 1px solid #000;
  margin: 6px 0 10px 0;
  overflow: hidden;
  line-height: 14px;
  padding: 5px;
  background-color: #fff;
  user-select: none;
}

.sideMemos:hover {
  border-color: hotpink;
  box-shadow: 0 0 3px rgba(255, 105, 180, 0.666);
}

.sideMemos .pId {
  display: block;
  margin-top: -3px;
  width: 160px;
  height: 12px;
  color: #aaa;
  font-size: 10px;
  opacity: 0;
  overflow: hidden;
}

.sideMemos .pId:hover {
  opacity: 1;
}

.sideMemos .pContent {
  font-size: 12px;
}
</style>