<template>
  <div>
    <div class="banner">
      <button class="btn-add" @click="addNB">
        <i class="fa fa-plus"></i>
      </button>
      <div class="container-nb">
        <!-- <my-notebook
          id="001"
          :notebook="desk"
          :showNB="showNB"
          :updateNB="updateNB"
          :deleteNB="deleteNB"
          :addMM="addMM"
        ></my-notebook> -->
        <my-notebook
          v-for="n in notebooks"
          :key="n.id"
          :id="n.id"
          :notebook="n"
          :showNB="showNB"
          :updateNB="updateNB"
          :deleteNB="deleteNB"
          :addMM="addMM"
        ></my-notebook>
      </div>
    </div>
    <div class="sidebar">
      <input
        type="text"
        class="searchbar"
        v-model="searchVal"
        placeholder="search"
      />
      <!-- <button @click="test">hhhhhhhhhh</button> -->

      <my-memo-s-d
        v-show="!this.searchVal"
        v-for="m in memos"
        :key="m.index"
        :memo="m"
        :deleteMM="deleteMM"
        :addMMOD="addMMOD"
      ></my-memo-s-d>
      <my-memo-s-d
        v-show="this.searchVal"
        v-for="m in sMemos"
        :key="m.index"
        :memo="m"
        :deleteMM="deleteMM"
        :addMMOD="addMMOD"
      ></my-memo-s-d>
    </div>
    <div class="the-main">
      <my-desk
        :memosOnDesk="memosOnDesk"
        :addMMOD="addMMOD"
        :updateMMOD="updateMMOD"
        :deleteMMOD="deleteMMOD"
        :deleteMM="deleteMM"
      ></my-desk>
    </div>
    <div class="footer"></div>
    <showed-notebook
      v-show="this.showedNB"
      :showedNB="showedNB"
      :hideNB="hideNB"
      :getMemosNB="getMemosNB"
      :deleteMM="deleteMM"
      :addMMOD="addMMOD"
      :showedNBname="showedNBname"
    ></showed-notebook>
  </div>
</template>


<script>
import MyNotebook from "./components/MyNotebook.vue";
import ShowedNotebook from "./components/ShowedNotebook.vue";
import MyDesk from "./components/MyDesk.vue";
import MyMemoSD from "./components/MyMemoSD.vue";
// import { debounce } from "./components/debounce";
import { throttle } from "./components/throttle";

import { nanoid } from "nanoid";
export default {
  name: "App",

  components: {
    MyNotebook, //笔记本列表
    ShowedNotebook, //打开的笔记本
    MyDesk, //桌面
    MyMemoSD,
  },
  data() {
    return {
      notebooks: JSON.parse(localStorage.getItem("notebooks")) || [],
      memosOnDesk: JSON.parse(localStorage.getItem("memosOD")) || [],
      memos: JSON.parse(localStorage.getItem("memos")) || [],
      sMemos: [],
      showedNB: "",
      desk: {
        id: "001",
        memoCount: 0,
        name: "desk",
      },
      searchVal: "",
    };
  },
  methods: {
    //在app里面写缩写NB(Notebook),MM(Memo)
    showNB(x) {
      //console.log(x);
      this.showedNB = x;
    },
    hideNB() {
      this.showedNB = "";
    },

    getMemosNB(id) {
      var obj = this.memos.filter((m) => {
        //console.log("found!");
        return m.notebookId == id;
      });

      return obj;
    },

    addNB() {
      let nbObj = {
        id: nanoid(),
        name: "new notebook",
        memoCount: 0,
      };
      this.notebooks.push(nbObj);
      //notebooksData.push(nbObj);
    },

    updateNB(id, name, count) {
      this.notebooks.forEach((n) => {
        if (n.id == id) {
          //console.log(n.name);
          n.name = name;
          if (n.memoCount != count && count) {
            n.memoCount++;
          }
        }
      });
    },

    deleteNB(id) {
      this.memos = this.memos.filter((memo) => {
        return memo.notebookId != id;
      });

      if (this.showedNB == id) {
        //console.log("h");
        this.hideNB();
      }
      //在桌面上的memo也应该删除吗？
      // this.memosOnDesk = this.memosOnDesk.filter((memo) => {
      //   return memo.id != id;
      // });

      this.notebooks = this.notebooks.filter((n) => {
        return n.id != id;
      });
    },

    addMM(x, id, NBid) {
      //console.log(id + "." + NBid);
      var e = false; //默认在该nb里不存在
      var d = "";
      if (id && NBid) {
        //拷贝一份
        var obj = { id: "", content: "", notebookId: "" };
        this.memosOnDesk.forEach((m) => {
          if (m.id == id) {
            obj.id = m.id;
            obj.content = m.content;
            d = m.notebookId; //记录这个memo原属于什么NB
            //console.log(m.notebookId + "," + NBid);
            if (m.notebookId != NBid) {
              e = false;
              obj.notebookId = NBid;
            } else {
              e = true;
              obj.notebookId = m.notebookId;
            }
          }
        });
        if (!e) {
          //在该nb里不存在
          //if (d == "001") {
          //原先是在桌面上的
          //先删除后加
          console.log(d);
          this.memos = this.memos.filter((m) => {
            return m.id != id;
          });
          //}
          this.memos.unshift(obj);

          //this.deleteMMOD(obj);
        }
        this.deleteMMOD(obj);
        this.searchVal = "";
        return;
      } else if (x) {
        this.memos.unshift(x);
        this.searchVal = "";
      }
    },

    deleteMM(id) {
      this.memos.forEach((m) => {
        if (m.id == id) {
          this.notebooks.forEach((n) => {
            if (m.notebookId == n.id) {
              n.memoCount--;
            }
          });
        }
      });

      this.memos = this.memos.filter((memo) => {
        return memo.id != id;
      });
      this.memosOnDesk = this.memosOnDesk.filter((memo) => {
        return memo.id != id;
      });
    },

    //在桌面添加memo
    addMMOD(x) {
      this.memosOnDesk.unshift(x);
    },

    updateMMOD(x, l, t, c) {
      this.memosOnDesk.forEach((memo) => {
        if (memo.id == x.id) {
          //console.log(memo.id + "," + l + "," + t);
          memo["position-t"] = t;
          memo["position-l"] = l;
          memo.content = c;
        }
      });
    },

    deleteMMOD(x) {
      var t;
      var nid = ""; //记录原先的notebookID
      this.memos.forEach((m) => {
        if (x.id == m.id) {
          nid = m.notebookId;
          t = m;
        }
      });
      if (t) {
        //在memos已存在
        if (t.content == x.content) {
          //无修改
          this.deleteMMOD2(x.id);
          //console.log("没修改");
          return;
        } else {
          //修改了
          this.deleteMMOD2(x.id);
          this.deleteMM(x.id);
          this.addMM(x);
        }
      } else {
        var i = "001";
        //还有没有这个notebook
        i = this.notebooks.forEach((n) => {
          if (n.id == nid) return n.id;
        });
        x.notebookId = i || "001";

        //在memos不存在
        if (x.content == "") {
          this.deleteMMOD2(x.id);
          return;
        } else {
          this.addMM(x);
          this.deleteMMOD2(x.id);
        }
      }
    },

    deleteMMOD2(id) {
      this.memosOnDesk = this.memosOnDesk.filter((memo) => {
        return memo.id != id;
      });
    },

    // onDrop(event,notebook){
    //   const itemID=event.dataTransfer.getData('id')
    //   const item=this.memosOnDesk.find(item=>item.id=itemID)
    //   item.
    // }
  },
  watch: {
    memosOnDesk: {
      deep: true,
      handler(value) {
        localStorage.setItem("memosOD", JSON.stringify(value));
      },
    },
    notebooks: {
      deep: true,
      handler(value) {
        localStorage.setItem("notebooks", JSON.stringify(value));
      },
    },
    memos: {
      deep: true,
      handler(value) {
        this.searchVal = "";
        this.sMemos = [];
        localStorage.setItem("memos", JSON.stringify(value));
      },
    },

    sMemos() {
      if (this.searchVal == "") this.sMemos = [];
    },

    searchVal: {
      deep: true,
      handler(value) {
        // if (value == "") {
        //   this.sMemos = this.memos;
        //   return;
        // }

        this.sMemos = [];
        throttle(() => {
          var x = this.memos.filter((m) => {
            /*先不用正则写？ */
            return m.content.includes(value);
          });
          this.sMemos = x;
        }, 300);
      },
    },
  },
  computed: {
    showedNBname() {
      var x = "";
      this.notebooks.forEach((n) => {
        if (n.id == this.showedNB) {
          x = n.name;
        }
      });
      return x;
    },
  },
  // mounted() {
  //   var obj = {
  //     id: 666,
  //     name: "jenny",
  //   };
  //   memosData.push(obj);
  //   console.log(memosData);
  // },

  mounted() {
    // let nbs = localStorage.getItem("notebooks");
    // console.log(nbs);
    // if (this.notebooks == []) {
    //   //console.log("empty");
    //   let de = [
    //     {
    //       id: "001",
    //       name: "desk",
    //       memoCount: 0,
    //     },
    //   ];
    //   localStorage.setItem("notebooks", JSON.stringify(de));
    // }
  },
};
</script>


<style>
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body {
  background: palevioletred;
  width: 100%;
  height: 100%;
}

body textarea p {
  font-family: Arial, Helvetica, sans-serif;
}

div {
  border-radius: 3px;
}

.banner {
  position: absolute;
  left: 8px;
  right: 10px;
  top: 10px;
  background-color: #fafafade;

  width: cal(100% - 23px);
  height: 85px;
  overflow: auto;
  padding-left: 5px;
  padding-bottom: 5px;
}

.banner .btn-add {
  float: right;
}

.container-nb {
  /* border: 1px solid red; */
  width: 90%;
  height: auto;
}
.container-nb:after {
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
  content: "";
}

.sidebar {
  position: absolute;
  top: 110px;
  width: 200px;
  height: calc(100% - 150px);
  background-color: #fafafade;
  overflow: auto;
  padding: 5px;
}

.the-main {
  position: absolute;
  top: 110px;
  right: 10px;
  width: calc(100% - 235px);
  height: calc(100% - 140px);
  background-color: #fafafade;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: black;
  width: 100%;
  height: 20px;
  border-radius: 0;
}

.searchbar {
  border: 0;
  border-bottom: 1px solid red;
  width: 190px;
  height: 23px;
  background-color: transparent;
}
.searchbar::placeholder {
  font-size: 16px;
  color: #aaa;
  font-style: italic;
}

button {
  height: 40px;
  /* text-align: center; */
  background-color: gainsboro;
  border: 1px solid gainsboro;
}

button:hover {
  background-color: hotpink;
  color: #fafafa;
}

.testBox {
  position: absolute;
  z-index: 999;
  height: 40px;
  width: 40px;
  background: darkblue;
}

*::-webkit-scrollbar {
  width: 8px;
}
*::-webkit-scrollbar-track-piece {
  background-color: #fafafa00;
}
*::-webkit-scrollbar-track {
  background-color: #fafafa8d;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(153, 153, 153, 0.5);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(119, 119, 119, 0.5);
}

*::-webkit-scrollbar-button {
  display: none;
}
</style>