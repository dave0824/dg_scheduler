<template>
  <div>
    <!--<a-button @click="init()">哥哥按我</a-button>-->
    <div id="mountNode"></div>
  </div>
</template>

<script>
  import G6 from '@antv/g6'
  export default {
    name: 'test8',
    comments: [
      G6
    ],
    data() {
      return {
        initData: {
          // 点集
          nodes: [{
            id: 'node1', // 节点的唯一标识
            x: 100,      // 节点横坐标
            y: 200,      // 节点纵坐标
            label: '起始点' // 节点文本
          },{
            id: 'node2',
            x: 300,
            y: 200,
            label: '目标点'
          }],
          // 边集
          edges: [
            // 表示一条从 node1 节点连接到 node2 节点的边
            {
              source: 'node1',  // 起始点 id
              target: 'node2',  // 目标点 id
              label: '连线'   // 边的文本
            }
          ]
        }
      }
    },
    methods: {
      init() {
        const graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          width: 800,             // 图的宽度
          height: 500,             // 图的高度
          modes: {
            // 默认交互模式
            default: ['drag-node', 'click-select'],
          }
        })
        graph.data(this.initData) // 加载数据
        graph.render()     // 渲染
      },
      del(){
        /*遍历数组，然后根据选中的状态获取对应的下标，然后进行删除*/
        for (let i = 0;i<this.data.length;i++){
          let obj = this.data[i];
          if (obj.isDelete){
            this.data.splice(i,1);
            i--
          }
        }

      }
    },
    mounted(){
      this.init();
    }
  }

</script>
<style scoped>

</style>