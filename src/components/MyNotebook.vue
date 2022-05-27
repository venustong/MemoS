-<template>
  <div
    class="origin"
    @dblclick.self.prevent="showNotebook(this.notebook.id)"
    @click.self="changeNBname(0)"
    @drop="dropHandler"
    @dragover="dragOverHandler"
  >
    <div
      class="delete"
      @click.stop="deleteNotebook"
      v-show="this.notebook.id != '001'"
    >
      <i class="fa fa-close fa-lg"></i>
    </div>

    <div
      class="folder"
      @click.self="changeNBname(0)"
      @dblclick.stop="showNotebook(this.notebook.id)"
    ></div>
    <!-- <div
      class="folder"
      @click.self="changeNBname(0)"
      @dblclick.stop="showNotebook(this.notebook.id)"
    >
      <i class="fa fa-inbox fa-4x"></i>
    </div> -->
    <div class="NBname" @dblclick.stop="changeNBname(1)" v-show="!changeName">
      {{ this.value == "" ? this.NBname : this.value }}
    </div>
    <input
      type="text"
      class="inputNBname"
      style="cursor: text"
      v-show="changeName"
      :placeholder="this.NBname"
      v-model="value"
      maxlength="20"
      @keyup.enter="changeNBname(0)"
    />
    <!-- <div v-show="isShow" class="main">
      <button @click="showNotebook(0)" class="btn-main-close">hide me</button>
    </div> -->

    <!-- <div class="menu" v-show="menuShow"></div> -->
  </div>
</template>

<script>
import { debounce } from "./debounce";
export default {
  name: "MyNotebook",
  props: ["notebook", "showNB", "updateNB", "deleteNB", "addMM"],
  data() {
    return {
      NBname: this.notebook.name,
      isShow: false,
      menuShow: false,
      changeName: false,
      value: "",
    };
  },
  methods: {
    showNotebook(val) {
      this.isShow = val;
      this.showNB(val);
    },

    deleteNotebook() {
      if (this.notebook.memoCount > 0) {
        if (confirm("删除文件夹将删除里面的便签，确定要删除吗？")) {
          /*处理笔记本中的memo.... */
          //this.deleteMM(null, this.notebook.id);
          this.deleteNB(this.notebook.id);
        }
      } else {
        this.deleteNB(this.notebook.id);
      }
    },
    showMenu(val) {
      this.menuShow = val;
      return false;
    },

    changeNBname(val) {
      this.changeName = val;
      if (!val) {
        if (this.value != "") {
          //console.log(this.value);
          this.NBname = this.value;
          this.updateNB(this.notebook.id, this.value, this.notebook.memoCount);
        } else {
          this.value = this.NBname;
          return;
        }
      }
    },

    //拖拽事件
    dragOverHandler(e) {
      //console.log(e);
      e.preventDefault();
    },

    dropHandler(e) {
      var id = e.dataTransfer.getData("mmid");
      let n = this.notebook.memoCount;
      this.updateNB(this.notebook.id, this.notebook.name, n + 1);
      this.addMemo(id);
      e.dataTransfer.clearData();
    },

    addMemo(id) {
      this.addMM(null, id, this.notebook.id);
    },
  },
  watch: {
    value() {
      debounce(() => {
        this.updateNB(this.notebook.id, this.value);
      }, 300); //抖动
    },
  },
};
</script>

<style>
* {
  padding: 0;
}

input {
  border: 0;
  outline: 0;
  color: palevioletred;
}

/* notebook封面 */
div .origin {
  position: relative;
  float: left;
  /* display: inline-block; */
  width: 183px;
  height: 30px;
  margin-left: 8px;
  margin-right: 10px;
  margin-top: 9px;
  user-select: none;

  border: 1px solid #333;
  background: #ffffff;
  box-shadow: 0 0 5px #d5d5d5;
}

div .origin:hover {
  /* border-radius: 4px; */
  /* border-color: rgba(255, 105, 180, 0.656);
  box-shadow: 0 0 4px rgba(246, 75, 181, 0.716);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.144),
    rgba(0, 0, 0, 0.032) 50%,
    rgba(255, 255, 255, 0)
  ); */

  border: 1px solid hotpink;
  box-shadow: 0 0 5px #ff94df;
  /* cursor: pointer; */
}

/* 暂用，到时需要隐藏，因为会替换成不同的笔记本封面??*/
.btn-origin {
  display: block;
  position: relative;
  width: 80px;
  left: 50%;
  top: 50%;
  margin-top: -20px;
  margin-left: -40px;
  background-color: black;
  border: 1px solid gainsboro;
  color: #fff;
}

.btn-origin:hover {
  background-color: #fff;
}

div .menu {
  width: 50px;
  height: 100px;
  border: 1px solid black;
}

.folder {
  position: absolute;
  border-radius: 3px 0 0 3px;
  top: -1px;
  left: -1px;
  width: 30px;
  height: 30px;
  margin-left: 0;
  margin-top: 0;
  /* text-align: center; */
  background-color: #333;
  border: 1px solid #333;
}

.origin:hover .folder {
  background-color: hotpink;
  border: 1px solid hotpink;
  color: hotpink;
}

.folder:hover {
  background-color: hotpink;
  border: 1px solid hotpink;
}

/* .folder > i {
  border: 1px solid blue;
} */

.NBname,
.inputNBname {
  position: absolute;
  top: 1px;
  left: 40px;
  width: 100px;
  height: 25px;
  /* margin-left: -50%; */
  font-size: 14px;
  line-height: 14px;
  /* text-align: center; */
  /* border: 1px solid red; */
}

.NBname {
  /* width: 80px; */
  /* overflow: visible;
  left: 50%;
  word-wrap: break-word;
  font-size: 12px;
  line-height: 12px; */
  /* //margin-top: 5px; */
  /* border: 1px solid red; */
  top: 2px;
  margin-top: 5px;
}

div.delete {
  position: absolute;
  right: 0px;
  top: -10px;
  width: 10px;
  height: 10px;
  opacity: 0;
  /* border: 1px solid red; */
}

div.delete:hover {
  opacity: 1;
  color: hotpink;
}
</style>