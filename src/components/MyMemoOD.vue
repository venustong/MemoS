-<template>
  <div
    class="mainMM"
    :style="positionObj"
    :id="memo.id"
    :draggable="canDrag"
    @dragstart="dragStartHandler"
    @dragover="dragOverHandler"
  >
    <div class="head">
      <button class="btn-close" @click.stop="closeMemo">
        <i class="fa fa-close"></i>
      </button>
      <div class="handler" v-show="canDrag"><i class="fa fa-circle-o"></i></div>
      <div class="drag" @mousedown.prevent="drag"></div>
    </div>
    <textarea
      class="ta"
      placeholder="record something..."
      v-model="value"
      @blur="recordMemo"
      @focus="aboveIt"
    ></textarea>
  </div>
</template>

<script>
import { debounce } from "./debounce"; // eslint-disable-line no-unused-vars
export default {
  name: "MyMemoOD",
  data() {
    return {
      positionObj: {
        position: "absolute",
        top: this.memo["position-t"] + "px",
        left: this.memo["position-l"] + "px",
      },
      ttop: this.memo["position-t"],
      lleft: this.memo["position-l"],
      value: this.memo.content,
    };
  },

  computed: {
    top2() {
      return this.memo["position-t"];
    },
    left2() {
      return this.memo["position-l"];
    },
    canDrag() {
      return this.value == "" ? false : true;
    },
  },
  methods: {
    //拖拽到笔记本里面！
    dragStartHandler(e) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "all";
      e.dataTransfer.setData("mmid", e.target.id);
      //e.dataTransfer.setData("content",e.target)
      //console.log(e.target);
    },

    //保存
    recordMemo() {
      var l = this.memo["position-l"];
      var t = this.memo["position-t"];

      this.updateMMOD(this.memo, l, t, this.value);
    },

    closeMemo() {
      var obj = {
        id: this.memo.id,
        content: this.memo.content,
        notebookId: this.memo.notebookId,
      };
      this.deleteMMOD(obj);

      // if (this.memo.content == "") {
      //   console.log("直接删了！");
      //   this.deleteMMOD(this.memo.id);
      //   return;
      // }
      // if (this.memo.content != "") {
      //   console.log("我记下了！");
      //   this.addMM(obj);
      //   this.deleteMMOD(this.memo.id);
      // }
    },

    //置顶
    aboveIt() {
      document.getElementById(this.memo.id).style.zIndex = 99;
      var allMM = document.getElementsByClassName("mainMM");
      var MMid = this.memo.id;

      for (var i = 0; i < allMM.length; i++) {
        if (allMM[i].id == MMid) {
          continue;
        } else {
          allMM[i].style.zIndex = 1;
        }
      }
    },
    //拖拽
    drag(event) {
      var obj = event.target;

      // /*原生js写?? */
      document.getElementById(this.memo.id).style.zIndex = 99;

      event = event || window.event;
      var offsetX = event.clientX - obj.offsetLeft;
      var offsetY = event.clientY - obj.offsetTop;

      document.onmousemove = (event) => {
        obj.setCapture && obj.setCapture();
        event = event || window.event;
        var l = event.clientX - offsetX + this.lleft;
        var t = event.clientY - offsetY + this.ttop;
        //console.log(l);
        if (l < 0) {
          return (l = 1);
        }
        if (l > 1100) {
          return (l = 1100);
        }

        if (t < 1) {
          return (l = 1);
        }
        if (t > 350) {
          return (l = 350);
        }
        this.positionObj.top = t + "px";
        this.positionObj.left = l + "px";
        this.updateMMOD(this.memo, l, t, this.memo.content);
        var allMM = document.getElementsByClassName("mainMM");
        var MMid = this.memo.id;

        for (var i = 0; i < allMM.length; i++) {
          if (allMM[i].id == MMid) {
            continue;
          } else {
            allMM[i].style.zIndex = 1;
          }
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        obj.releaseCapture && obj.releaseCapture();
        this.ttop = parseInt(
          this.positionObj.top.slice(0, this.positionObj.top.length - 2)
        );
        this.lleft = parseInt(
          this.positionObj.left.slice(0, this.positionObj.left.length - 2)
        );
        return false;
      };
    },
  },
  //

  watch: {
    value() {
      debounce(() => {
        this.recordMemo();
      }, 1000); //抖动
    },
  },
  props: ["memosOnDesk", "memo", "updateMMOD", "deleteMMOD"],
  mounted() {
    this.aboveIt();
  },
};
</script>

<style scoped>
* {
  border-radius: 0;
}

.mainMM {
  /* top: 0px;
  left: 0px; */
  width: 220px;
  height: 220px;
  background-color: #fff;
  border: 1px solid hotpink;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.head {
  position: relative;
  margin: 0;
  width: 100%;
  height: 30px;
}

.above {
  z-index: 99;
}

.below {
  z-index: 0;
}

.ta {
  outline: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: transparent;
  min-width: 209px;
  max-width: 209px;
  min-height: 179px;
  max-height: 179px;
  overflow: auto;
  font-size: 15px;
  border: 0;
  resize: none;
  padding: 5px;
}

.ta::placeholder {
  font-size: 16px;
  color: #aaa;
  font-style: italic;
}

.head .handler {
  position: absolute;
  left: -20px;
  width: 20px;
  height: 30px;
  border: 1px solid border;
  cursor: grab;
  opacity: 0;
}

.head .handler:hover {
  opacity: 1;
}

.head .drag {
  /* display: inline-block; */
  position: absolute;
  left: 0;
  width: 86%;
  height: 100%;
  background-color: #555;
}

.head .drag:hover {
  background-color: #333;
}

.head .btn-close {
  position: absolute;
  right: 0px;
  height: 100%;
  width: 15%;
  background-color: #555;
  color: #fff;
  border: 0;
}

.head .btn-close:hover {
  background-color: rgb(239, 98, 145);
  color: #fafafa;
}
</style>