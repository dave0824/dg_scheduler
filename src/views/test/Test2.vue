<template>
  <div class="container">
    <div class="layout">
      <button
        class="layout-btn"
        @click="layoutType=val.value"
        v-for="val in layoutOptions"
        :key="val.value"
      >{{val.label}}</button>
    </div>

   <div
      class="group"
      :class="{'left-top-container': gindex===0,
        'right-top-container': gindex===1,
        'bottom-container': gindex===2,
        'top-container': gindex<2}"
      v-for="(group,gindex) in data"
      :key="gindex"
    >
          <div
            class="cls-default"
            v-for="(item,cindex) in group.children"
            :key="cindex"
            :data-id="gindex+'-'+cindex"
            draggable="true"
            @dragstart="onDragstart($event)"
            @dragend="onDragend($event)"
            @dragover="onDragover($event)"
            @drop="onDrop($event)"
            :style="{'background-color': item.color}"
            :class="{'cls1-0': cindex ===0 && layoutType==1,
            'cls2-0': (cindex ===0 || cindex ===1) && layoutType==2,
            'cls3-0': cindex ===0 && layoutType==3,
            'cls3-1': (cindex ===1 || cindex ===2) && layoutType==3,
            'cls4-0': cindex <4 && layoutType==4,
            'cls6-0': cindex === 0 && layoutType==6
            }"
          >
                <div class="content">{{item.color ? item.color : '我是空对象'}}</div>
          </div>
    </div>
    <div class="tips">上面两个区域内是展示区的内容能互相拖拽
      <br>下面的是资源区，只能复制出去覆盖目标区域，本身不会被替换掉
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stargindex: "",
        endIndex: "",
        layoutType: "9",
        layoutOptions: [
          { label: "单分屏", value: 1 },
          { label: "二分屏", value: 2 },
          { label: "三分屏", value: 3 },
          { label: "四分屏", value: 4 },
          { label: "六分屏", value: 6 },
          { label: "九分屏", value: 9 }
        ],
        data: [
          {
            group: "left-show",
            title: "视频播放区一",
            children: [
              {
                id: 6,
                color: "orange"
              },
              {
                id: 2,
                color: "yellow"
              },
              {},
              {},
              {},
              {},
              {
                id: 3,
                color: "cyan"
              },
              {},
              {
                id: 5,
                color: "brown"
              }
            ]
          },
          {
            group: "right-show",
            title: "视频播放区二",
            children: [
              {},
              {
                id: 7,
                color: "pink"
              },
              {},
              {},
              { id: 4, color: "purple" },
              {},
              {},
              {},
              {
                id: 10,
                color: "gray"
              }
            ]
          },
          {
            group: "source",
            title: "视频资源区",
            children: [
              {
                id: 11,
                color: "white"
              },
              {
                id: 12,
                color: "black"
              },
              {
                id: 13,
                color: "red"
              },
              {
                id: 14,
                color: "green"
              },
              {
                id: 15,
                color: "blue"
              }
            ]
          }
        ]
      };
    },
    methods: {
      onDragstart(event) {
        this.stargindex = event.target.getAttribute("data-id");
      },
      onDragend(event) {
        let startGroupIndex = this.stargindex.split("-")[0];
        let startChildIndex = this.stargindex.split("-")[1];
        let endGroupIndex = this.endIndex.split("-")[0];
        let endChildIndex = this.endIndex.split("-")[1];
        // 对数据做简单的深拷贝 目前不需要
        // let endObj = JSON.parse(
        //   JSON.stringify(this.data[endGroupIndex].children[endChildIndex])
        // );
        // let startObj = JSON.parse(
        //   JSON.stringify(this.data[startGroupIndex].children[startChildIndex])
        // );
        let endObj = this.data[endGroupIndex].children[endChildIndex];
        let startObj = this.data[startGroupIndex].children[startChildIndex];
        if (this.data[endGroupIndex].group === "source") {
          //往资源区拖拽时  不做任何替换操作
          return;
        }
        this.data[endGroupIndex].children.splice(endChildIndex, 1, startObj);
        if (this.data[startGroupIndex].group !== "source") {
          //拖拽起始区域不是 source时  把起始区域替换成拖拽后区域的数据
          this.data[startGroupIndex].children.splice(startChildIndex, 1, endObj);
        }
      },
      onDrop(event) {
        if (event.target.className.indexOf("cls-default") > -1) {
          this.endIndex = event.target.getAttribute("data-id");
        } else {
          this.endIndex = event.target.parentElement.getAttribute("data-id");
        }
      },
      onDragover(event) {
        event.preventDefault();
      }
    }
  };
</script>

<style scoped>
  .container {
    background-color: #eee;
    height: 800px;
  }
  .layout .layout-btn {
    background-color: #409eff;
    color: #fff;
    padding: 10px 15px;
    margin: 10px 15px;
  }
  .tips {
    font-size: 24px;
    text-align: center;
  }
  .group {
    float: left;
    overflow: hidden;
    box-sizing: border-box;
  }
  .group-title {
    height: 40px;
    line-height: 40px;
  }
  .cls-default {
    float: left;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #999;
  }
  .cls-default .content {
    text-align: center;
    padding-top: 20px;
    font-size: 20px;
  }
  .top-container {
    height: 400px;
    width: 40%;
    margin: 15px 5%;
  }
  .top-container .cls-default {
    width: 33.33%;
    height: 33.33%;
  }
  .top-container .cls1-0 {
    width: 100%;
    height: 100%;
  }
  .top-container .cls2-0 {
    width: 50%;
    height: 100%;
  }
  .top-container .cls3-0 {
    width: 50%;
    height: 100%;
  }
  .top-container .cls3-1 {
    width: 50%;
    height: 50%;
  }
  .top-container .cls4-0 {
    width: 50%;
    height: 50%;
  }
  .top-container .cls6-0 {
    width: 66.66%;
    height: 66.65%;
  }
  .bottom-container {
    width: 90%;
    height: 200px;
    margin: 15px 5%;
  }
  .bottom-container .cls-default {
    width: 15%;
    height: 150px;
  }
</style>
