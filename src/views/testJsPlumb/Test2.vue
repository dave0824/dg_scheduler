<template>
  <div id="diagramContainer">
    <div id="item_left" class="item"></div>
    <div id="item_right" class="item" style="margin-left:50px;"></div>
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

    mounted(){
      /* global jsPlumb */
      var instance = jsPlumb.getInstance({
        Container:"diagramContainer"
      });
      instance.connect({
        source: 'item_left',
        target: 'item_right',
        paintStyle: { stroke: 'lightgray', strokeWidth: 3 },//设置连线样式
        endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 },//设置连线样式
        overlays: [ ['Arrow', { width: 12, length: 12, location: 1 }] ],//设置箭头
        endpoint: 'Dot',
        connector: ['Bezier'],
        anchor: ['Left', 'Right']

      });

      //注册实体可draggable
      $("#item_left").draggable({
        containment: "parent",
        drag: function (event, ui) {
          instance.repaintEverything();
        },
        stop: function () {
          instance.repaintEverything();
        }
      });
      $("#item_right").draggable({
        containment: "window",
        drag: function (event, ui) {
          instance.repaintEverything();
        },
        stop: function () {
          instance.repaintEverything();
        }
      });
    }
  }
</script>

<style scoped>
  #item_left{
    width: 150px;
    height: 200px;
    border: 1px solid #C9BBFF;
    background: pink;
    float: left
  }
  #item_right{
    width: 150px;
    height: 200px;
    border: 1px solid #C9BBFF;
    float: left;
    background: pink;
  }
</style>