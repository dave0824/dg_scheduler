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
        <a-button @click="setDisabled()">失效</a-button>
        <div id="mountNode"></div>
      </div>
    </div>

    <!--悬浮窗口-->
    <a-modal
      title="新建窗口"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="任务ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskId"/>
          </a-form-item>
          <a-form-item
            label="任务编码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskCode"/>
          </a-form-item>
          <a-form-item
            label="任务应用名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskAppName"/>
          </a-form-item>
          <a-form-item
            label="任务组编码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskGroupCode"/>
          </a-form-item>
          <a-form-item
            label="任务路径"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskPath"/>
          </a-form-item>
          <a-form-item
            label="任务方法"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskMethod"/>
          </a-form-item>
          <a-form-item
            label="任务方式"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="detailForm.taskCategory"/>
          </a-form-item>
          <a-form-item
            label="是否分配"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group v-model="detailForm.isAssignment">
              <a-radio  value="1">是</a-radio>
              <a-radio  value="0">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
  import G6 from '@antv/g6'
  export default{
    components: {
      G6,
    },
    data(){
      return{
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        // 悬浮框参数
        detailForm: {
          taskId: '',
          taskCode: '123',
          taskAppName: 'appName',
          taskGroupCode: 'taskGroupCode',
          taskPath: '/service',
          taskMethod: 'getById',
          taskCategory: '紧急任务',
          isAssignment: '1'
        },

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
      }
    },
    methods: {
      onDragstart(event) {
        this.childNode=event.target;
        // console.log(this.childNode);
      },
      onDragend(event) {

      },

      onDragenter($event){
        event.preventDefault();
      },
      onDrop(event) {
        this.initData.nodes.push({ // 当拖拽元素放下时添加节点
            id: this.childNode.id,  // 结点id
            x: event.offsetX - 90,      // 节点横坐标
            y: event.offsetY,      // 节点纵坐标
            label: this.childNode.innerText,// 节点文本
          }
        );

        var tempY = 9999;
        if(this.initData.nodes.length >= 2){ // 当节点数大于等于2时开始加边

          var id = this.initData.nodes[this.initData.nodes.length-2].id;
          for(var i=this.initData.nodes.length - 2; i>=0;i--){
            var disX = Math.abs(event.offsetX - 90 - this.initData.nodes[i].x);// 记录新结点x值和每个结点的X值得差的绝对
            if(disX < 180 ) { // 如果差值的绝对值小于180就退出循环
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
              endArrow: true // 添加边结尾箭头
            }
          });
        }
        this.childNode.disabled = true; // 设置标签为不可用
        this.reRender(); // 重新渲染
      },
      onDragover(event) {
        event.preventDefault();
      },

      // G6
      init() {
        // 注册自定义节点
        G6.registerNode("customNode", {
          // 绘制节点
          drawShape: function drawShape(cfg, group) {
            var shapeType = this.shapeType;
            const style = this.getShapeStyle(cfg)
            var shape = group.addShape(shapeType, {
              attrs: style
            });
            // 绘制节点里面的图标。
            var innerImage = group.addShape('image', {
              attrs: {
                x: 66,
                y: -9,
                width: 18,
                height: 18,
                img:
                  'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
              },
            });
            // 设置className属性
            innerImage.set("className", "node-inner-image");
            return shape;
          }
        }, "rect");

        const graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          defaultNode: {
            shape: 'customNode',
            size: [ 180, 30 ],
            style: {
              fill: '#f0f5ff',   // 节点填充色
              stroke: '#adc6ff',      // 节点描边色
              lineWidth: 1         // 节点描边粗细
            }
          },
          // 设置使结点移动
          modes: {
            // 默认交互模式
            default: ['drag-node', 'click-select'],
          },
          width: 700,             // 图的宽度
          height: 550            // 图的高度
        });

        graph.data(this.initData) // 加载数据
        graph.render()     // 渲染
        this.graph = graph;
        this.onclicks(this)

      },
      // 节点上的点击事件
     onclicks(this2){
        this.graph.on("node:click", function(event) {
          var shape = event.target;
          if (shape.get("className") === "node-inner-image") {
            // 如果点击是发生在节点里面的图片上，显示悬浮框
             this2.detailForm.taskId = event.item._cfg.id;// 记录标签传来的id
            // 通过id加载task详细信息
            //this.findTaskById(event.item._cfg.id);
             this2.show() // 显示悬浮框
          } else {
            // 否则隐藏悬浮框

          }
       });
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

      // 悬浮窗取消
      handleCancel () {
        this.visible = false
        this.setDisabled()
      },
      //将刷新的标签重新设置为失效
      setDisabled(){
        for(var i = 0;i < this.initData.nodes.length; i++){

          document.getElementById(this.initData.nodes[i].id).disabled = "disabled";

          /*document.getElementById(this.initData.nodes[i].id).setAttribute("disabled","disabled");*/
          console.log(i);
          console.log(document.getElementById(this.initData.nodes[i].id));
          console.log(document.getElementById(this.initData.nodes[i].id).disabled);
        }
      },
      show(){
        this.visible = true;
      },

      // 提交修改的task数据
      handleSubmit () {
        this.axios({
          method: 'post',
          url:'/task/update',
          data:this.qs.stringify(this.detailForm),
        }).then((res)=>{
          console.log(res);
        });
        this.visible = false;
        this.setDisabled()
      },

      // 加载标签数据
      loadData: () => {
        this.axios.get('/task/findAll')
          .then(function (response) {
            this.group = response.result;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      // 根据标签id查找标签详细信息
      findTaskById: (id) => {
        this.axios.get('/task/findById',{
          params:{
            id: id
          }
        })
          .then(function (response) {
            this.detailForm = response.result;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      // 提交
      submit(){
        this.jobTaskList = [];
        for(let i=0;i<this.initData.nodes.length;i++){ // 获取提交的任务id和name以及执行顺序
          this.jobTaskList.push({
            id: this.initData.nodes[i].id,
            name: this.initData.nodes[i].label
          });
        }
        console.log(this.jobTaskList);
        // 提交数据
        // this.sendSubmitData();
        this.clear();
        alert("提交成功！");
      },

      // 发送提交数据
      sendSubmitData(){
        this.axios({
          method: 'post',
          url:'/job/add',
          data:this.qs.stringify(this.jobTaskList),
        }).then((res)=>{
          console.log(res);
        });
      }
    },
    mounted(){
      this.init();
      // this.loadData();
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