<template>
  <div class="mainDiv">
    <!--<h2>任务执行流程</h2>-->
    <div class="leftDiv">
      <div class="font1">
        <a-icon type="tags" />
        <b>TASK信息</b>
      </div>
      <div
        class="container"
        draggable="false">
        <a-input class="input1" placeholder="请输入Task名称"></a-input>
        <a-button
          class="drag-content"
          v-for="(item,cindex) in group"
          :key="cindex"
          draggable="true"
          @dragstart="onDragstart($event)"
          @dragend="onDragend($event)"
          :id="item.id">
          {{item.name}}
        </a-button>
      </div>
    </div>
    <div class="rightDiv">
      <div class="font2">
        <a-icon type="coffee" />
        <b>TASK信息配置图</b>
      </div>
      <div
        class="onDown"
        draggable="false"
        @dragover="onDragover($event)"
        @dragenter="onDragenter($event)"
        @drop="onDrop($event)">
        <a-button @click="lastStep()">撤销</a-button>
        <a-button @click="clear()">清空</a-button>
        <a-button class="submit" @click="submit()">提交</a-button>
        <div id="mountNode"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import G6 from '@antv/g6'
  export default{
    components: {
      G6
    },
    data(){
      return{
        childNode: '', // 存被拖动的元素
        graph:'', // 画笔
        jobTaskList:[],//记录任务表
        // G6
        initData: {
          // 点集
          nodes: [],
          // 边集
          edges: []
        },
        group: [
          { id: '1', name: '任务1' },
          { id: '2', name: '任务2' },
          { id: '3', name: '任务3' },
          { id: '4', name: '任务4' },
          { id: '5', name: '任务5' },
          { id: '6', name: '任务6' },
          { id: '7', name: '任务7' },
          { id: '8', name: '任务8' }
        ],
        loadData: () => {
          return this.$http.get('/service').then(res => {
            return res.result
          })
        },
      }
    },
    methods: {
      onDragstart(event) {
        this.childNode=event.target;
        console.log(this.childNode);
      },
      onDragend(event) {

      },

      onDragenter($event){
        event.preventDefault();
      },
      onDrop2(event){
        event.target.appendChild(this.childNode);
      },
      onDrop(event) {
        this.initData.nodes.push({
            id: this.childNode.id,
            x: event.offsetX,      // 节点横坐标
            y: event.offsetY,      // 节点纵坐标
            label: this.childNode.innerText // 节点文本
          }
        );

        console.log(this.childNode.id);
        var tempY = 9999;
        if(this.initData.nodes.length >= 2){

          var id = this.initData.nodes[this.initData.nodes.length-2].id;
          for(var i=this.initData.nodes.length - 2; i>=0;i--){
            var disX = Math.abs(event.offsetX - this.initData.nodes[i].x);// 记录新结点x值和每个结点的X值得差的绝对
            if(disX < 180 ) { // 如果差值的绝对值小于45就退出循环
              id = this.initData.nodes[i].id;
              break;
            }
            var disY = Math.abs(event.offsetY - this.initData.nodes[i].y);// 记录新结点Y值和每个结点的Y值得差的绝对值
            if(disY < tempY && disY>30){// 取绝对值最小的为原结点
              tempY = disY;
              id = this.initData.nodes[i].id;
            }
          }
          this.initData.edges.push({
            source: id,  // 起始点 id
            target: this.initData.nodes[this.initData.nodes.length-1].id,  // 目标点 id
            label: '' ,  // 边的文本
            style: {
              endArrow: true
            }
          });
        }
        this.childNode.disabled = true;
        this.reRender(); // 重新渲染
      },
      onDragover(event) {
        event.preventDefault();
      },

      // G6
      init() {
        const graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          /*fitView: true,*/
          defaultNode: {
            shape: 'rect',
            size: [ 180, 30 ],
            style: {
              fill: 'steelblue',   // 节点填充色
              stroke: '#fff',      // 节点描边色
              lineWidth: 1         // 节点描边粗细
            },
            // 节点上的标签文本配置
            labelCfg: {
              // 节点上的标签文本样式配置
              style: {
                fill: '#fff'       // 节点标签文字颜色
              }
            }
          },
          width: 700,             // 图的宽度
          height: 550            // 图的高度
        });

        graph.data(this.initData) // 加载数据
        graph.render()     // 渲染
        this.graph = graph;
      },
      // 重新渲染
      reRender(){
        this.graph.data(this.initData) // 加载数据
        this.graph.render()     // 渲染
      },
      // 回退一步
      lastStep() {
        if(this.initData.nodes.length <= 0){// 判断结点数量是否大于0
          alert("已经退回原点啦，不要在点了！");
        }else {
          for(var i=0; i<this.initData.edges.length-1;i++){ // 删除和这个结点相连接的线
            if(this.initData.edges[i].target == this.initData.nodes[this.initData.nodes.length-1].id){// 如果连线的目标结点是最后一个结点的ID则删除这条边
              this.initData.edges.splice(i,1);
            }
          }
          document.getElementById(this.initData.nodes[this.initData.nodes.length-1].id).disabled = false;// 将最后一个结点对应的标签设置为false
          this.initData.nodes.splice(this.initData.nodes.length-1,1);// 删除最后一个结点
          this.reRender();// 重新渲染
        }
      },
      // 清空
      clear(){
        var len = document.getElementsByClassName("drag-content").length;
        for(var i=0;i<len;i++){// 将所有标签disabled属性设置为false
          document.getElementsByClassName("drag-content")[i].disabled = false;
        }
        this.initData.edges = [];
        this.initData.nodes = [];
        this.reRender();// 重新渲染
      },
      // 提交
      submit(){
        this.jobTaskList = [];
        for(let i=0;i<this.initData.nodes.length;i++){
          this.jobTaskList.push({
            id: this.initData.nodes[i].id,
            name: this.initData.nodes[i].label
          });
        }
        console.log(this.jobTaskList);
        this.clear();
        alert("提交成功！");
      }
    },
    mounted(){
      this.init();
    }
  }
</script>
<style lang="stylus">
  .mainDiv{
    background white
  }
  .drag-content{
    width 180px
    background #13c2c2
    margin 5px auto
    margin-left 5px
  }
  .input1{
    width 180px
    margin 5px auto
    margin-left 5px
  }
  b{
    margin-left 5px
  }
  .font1{
      width 200px
      height 30px
      background #CCF5FF
    }
  .font2{
    width 740px
    height 30px
    background #CCF5FF
  }
  .container{
    width 200px
    height 600px
    border 1px solid #C9BBFF
  }
  .onDown{
    width 740px
    height 600px
    border 1px solid #C9BBFF
    text-align:right
  }
  .leftDiv{
    float: left
    margin : 0.05in
    border 1px solid #C9BBFF
  }
  .rightDiv{
    float: left
    margin : 0.05in
    border 1px solid #C9BBFF
  }

</style>