<template>
  <div class="root">

    <draggable
      :data="'是我啊'"
     >

      <div class="drag-content">拖动我</div>
<!--
      <div class="drag-content" draggable="true">拖动我</div>
-->

    </draggable>

    <droppable
      class="drop-box"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @drop="onDrop"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @dragleave="onDragLeave">

      <div class="onDown">被拖动的东西可以在这里放下</div>

    </droppable>

  </div>
</template>

<script>

  import Draggable from '../scheduler/draggable'// form后面的地址根据实际情况而定
  import Droppable from '../scheduler/droppable'// form后面的地址根据实际情况而定
  export default {
    components: {
      Draggable,
      Droppable
    },
    methods: {
      onSourceDragStart (params) {
        console.log('被拖动元素监听到拖动开始')
      },
      onSourceDragEnd (params) {
        console.log('被拖动元素监听到拖动结束')
      },
      onDragStart (params) {
        console.log('监听到拖动开始')
      },
      onDragEnd (params) {
        console.log('监听到拖动结束')
      },
      onDrop (event) {
        /*console.log('监听到被拖动元素放下')*/
        /*console.log(this);*/
        /*this.$refs;*/
        console.log(params);
        document.getElementsByClassName('onDown')[0].appendChild(


          document.getElementsByClassName('drag-content')[0]
        );
      },
      onDragEnter (params) {
        console.log('监听到被拖动元素进入当前范围')
      },
      onDragOver (params) {
        // console.log('监听到被拖动元素在上方移动, 这个调用调多次就不打印了')
      },
      onDragLeave (params) {
        console.log('监听到被拖动元素离开当前范围')
      }
    }
  }
</script>

<style lang="stylus">
  .drop-box{
    width 100px
    height 100px
    border 1px solid #1890ff
  }
  .drag-content{
    background #13c2c2
    width 60px
  }
  .onDown{
    width 100px
    height 100px
    border 1px solid #1890ff

  }
</style>