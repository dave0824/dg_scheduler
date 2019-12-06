<template>
  <div id="diagramContainer">
    <div id="item_left" class="item"></div>
    <div id="item_right" class="item" style="margin-left:50px;"></div>
  </div>
</template>

<script>
  import jsplumb from 'jsplumb'
  export default {
    name: 'test1',
    components: {
      jsplumb
    },

      mounted(){
      /* global jsPlumb */
      jsPlumb.ready(function () {
        jsPlumb.connect({
          source: 'item_left',
          target: 'item_right',
          endpoint: 'Dot'
        })
      })
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