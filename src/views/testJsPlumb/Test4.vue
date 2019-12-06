<template>
  <div class="mainDiv">
    <!--<h2>任务执行流程</h2>-->
    <div class="leftDiv">
      <div class="font1">
        <a-icon type="tags" />
        <b>TASK信息</b>
      </div>
      <div
        id="leftTask"
        class="container">
        <a-input class="input1" placeholder="请输入Task名称"></a-input>
        <a-button
          class="drag-content"
          draggable="true"
          :disabled=item.disable
          @dragstart="onDragstart($event)"
          @dragend="onDragend($event)"
          v-for="(item,cindex) in group"
          :key="cindex"
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
        <a-button class="submit" @click="submit()">提交</a-button>
        <div id="container"></div>
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
  import jsplumb from 'jsplumb'
  import  $ from "jquery"
  import 'jquery-ui/ui/widgets/draggable'
  import 'jquery-ui/ui/widgets/droppable'
  import 'jquery-ui/ui/widgets/resizable'
  export default {
    name: 'test1',
    components: {
      jsplumb
    },
    data(){
      return{
        instance:'' ,// 记录实例
        modelCounter: 0,// 计数器
        startCircle: '',// 起点样式
        endCircle: '',// 终点样式
        childNode: '', // 存被拖动的元素
        jobTaskList:[],//记录任务表
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

        group: [
          { id: '1', name: '任务1' ,disable: false},
          { id: '2', name: '任务2' ,disable: false},
          { id: '3', name: '任务3' ,disable: false},
          { id: '4', name: '任务4' ,disable: false},
          { id: '5', name: '任务5' ,disable: false},
          { id: '6', name: '任务6' ,disable: false},
          { id: '7', name: '任务7' ,disable: false},
          { id: '8', name: '任务8' ,disable: false}
        ],
      }
    },
    methods:{
      // 初始化数据
      init(){
        /**
         * 初始化一个jsPlumb实例
         */
        var instance = jsPlumb.getInstance({
          DragOptions: {cursor: "pointer", zIndex: 2000},
          //连线的状态
          ConnectionOverlays: [
            //箭头样式
            ["Arrow", {
              location: 1,
              visible: true,
              width: 11,
              length: 11,
              direction: 1,
              id: "arrow_forwards"
            }],
          ],
          Container: "container"
        });
        instance.importDefaults({
          ConnectionsDetachable: true,
          /*ReattachConnections: true  //连线不可断开*/
        });
        //点击连线事件
       /* instance.bind("click", function (conn, originalEvent) {
        });
        instance.bind("connectionDrag", function (connection) {
          debugger
          console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function (connection) {
          debugger
          console.log("connection " + connection.id + " was dragged");
        });

        instance.bind("connectionMoved", function (params) {
          debugger
          console.log("connection " + params.connection.id + " was moved");
        });*/

        this.instance = instance;// 记录实例

        //基本连接线样式
        var connectorPaintStyle = {
          stroke: "#888888",
          strokeWidth: 2
        };
       // 鼠标悬浮在连接线上的样式
        var connectorHoverStyle = {
          strokeWidth: 3,
          stroke: "#216477"
        };
        //起点样式设置
        var startCircle = {
          anchors: "BottomCenter",
          endpoint: ["Dot", {cssClass: "endpointcssClass"}], //端点形状
          connectorStyle: connectorPaintStyle,//连线样式
          connectorHoverStyle: connectorHoverStyle,//悬浮连线样式
          paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 7,
            strokeWidth: 1
          },		//端点的颜色样式
          isSource: true, //是否可拖动（作为连接线起点）
          connector: ["Bezier", {curviness: 63}],
          isTarget: false, //是否可以放置（连接终点）
          maxConnections: -1,
          onMaxConnections: function (info) {//绑定一个函数，当到达最大连接个数时弹出提示框
            alert("连线不能超过2条");
          }
        };
        this.startCircle = startCircle;// 保存起点样式

        //终点样式设置
        var endCircle = {
          anchors: "TopCenter",
          endpoint: ["Dot", {cssClass: "endpointcssClass"}], //端点形状
          connectorStyle: connectorPaintStyle,//连线样式
          connectorHoverStyle: connectorHoverStyle,//悬浮连线样式
          paintStyle: {
            fill: "#62A8D1",
            radius: 6
          },		//连接点的颜色
          isSource: false, //是否可拖动（作为连接线起点）
          connector: ["Flowchart", {stub: 30, gap: 0, coenerRadius: 0, alwaysRespectStubs: true, midpoint: 0.5}],
          isTarget: true, //是否可以放置（连接终点）
          maxConnections: -1,
          onMaxConnections: function (info) {//绑定一个函数，当到达最大连接个数时弹出提示框
            alert("连线不能超过2条");
          }
        };
        this.endCircle = endCircle;// 保存终点样式


          /**
           * 设置左边任务表单
           * @param Data
           */
       /*   console.log("1111111111")
          //拖拽设置
          $("#leftTask a-button").draggable({
            helper: "clone",
            scope: "plant"
          });
          $("#container").droppable({
            scope: "plant",
            drop: function(event, ui) {
              this.CreateModel(ui, $(this));
            }
          });*/
      },

      onDragstart(event) {
        this.childNode=event.target;
      },
      onDragend(event) {

      },

      onDragenter($event){
        event.preventDefault();
      },
      onDrop(event) {

        for(var i=0;i<this.group.length;i++){// 设置被选中的标签为不可用
          if(this.group[i].id === this.childNode.id){
            this.group[i].disable = true;
            break;
          }
        }

        this.createModel(event,$(this));// 添加模型
      },
      onDragover(event) {
        event.preventDefault();
      },

      /**
       * 添加模型
       * @param ui
       * @param selector
       */
      createModel(event,selector) {
        var _this = this;
        var taskId = this.childNode.id; // 获得被拖动结点的id
        const id = 'mode_' + taskId  ;
        var div =$('<div class="newPoint"</div>');// 创建div
        div.attr("id",id);
        div.append(this.childNode.innerText);

        // 设置位置属性
        var left = event.pageX - 90;
        var top =  event.pageY - 18;
        console.log(left);
        console.log(top);
        div.css({position: "absolute"});
        div.css("top",top);
        div.css("left",left);

        // 添加查看详情图标并设置点击事件
        var img = $('<img id="atlas-img" class="atlas" src="https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg" >');// 在div内部添加图片
        img.click(function() {
          _this.detailForm.taskId = taskId;
          // _this.findTaskById(taskId); // 通过id加载数据
          _this.show()
        });
        div.append(img);

        // 添加删除按钮和事件
        var del = $('<div>x<div>');
        del.click(function() {
          _this.removeElement(id,taskId);
        })
        div.append(del);


        $("#container").append(div);
        //console.log("到我了了了了了")
        console.log(this.instance);
       // console.log('---------------')
        //console.log(this.endCircle)
        //console.log(id)
        //console.log($('#'+id).attr("id"))
        // 添加连接点
        this.instance.addEndpoint(id, this.endCircle);
        this.instance.addEndpoint(id, this.startCircle);

        //var _this = this;
        //注册实体可draggable
        $("#" + id).draggable({
          containment: "parent",
          drag: function (event, ui) {
            _this.instance.repaintEverything();
          },
          stop: function () {
            _this.instance.repaintEverything();
          }
        });

        // 记录添加的任务
        this.jobTaskList.push(
          {
            id:taskId,
            name:this.childNode.innerText
          }
        );
     },

      // 删除结点
      removeElement(id,taskId) {
        var element = $("#"+id)
        if (confirm("确定删除该标签？")){
          this.instance.remove(element);

          //设置删除的结点的标签为可用
          for(var i=0;i<this.group.length;i++){// 设置被选中的标签为可用
            if(this.group[i].id === taskId){
              this.group[i].disable = false;
              break;
            }
          }
          // 从任务记录表中删除这个数据
          for(var i=0;i<this.jobTaskList.length;i++){
            if(this.jobTaskList[i].id === taskId){
              this.jobTaskList.splice(i,1);// 删除这个记录
            }
          }
        }
      },

      // 悬浮窗取消
      handleCancel () {
        this.visible = false
      },

      // 悬浮框显示
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

        for(var i=0; i<this.group.length;i++){ // 添加disable属性并设置为false
          this.$set(this.group[i], 'disable', 'false')
        }
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
        console.log(this.jobTaskList);
        // 提交数据
        // this.sendSubmitData();
        this.jobTaskList = [];
        this.clear();
        alert("提交成功！");
      },

     // 清空
      clear(){
        for(var i=0;i<this.group.length;i++){// 将所有标签disabled属性设置为false
          this.group[i].disable = false;
        }

        this.instance.deleteEveryEndpoint();// 这个方法删除所有节点，不需要传入参数
        $('#container').empty();
        this.jobTaskList = [];
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
    },

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
  #container{
    width 740px
    height 560px
  }
  .onDown{
    width 740px
    height 600px
    border 1px solid #C9BBFF
    text-align:right
  }
    #container{

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


  .newPoint{
    width 180px
    height 36px
    background '#f0f5ff'
    border 1px solid #C9BBFF
    text-align:center
    line-height 36px
  }

  img{
    margin-left 150 px
    margin-top   -75px
    cursor:pointer
  }

</style>