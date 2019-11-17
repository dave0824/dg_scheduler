<template>
  <div>
    <div
      class="container"
      draggable="false"
      @dragover="onDragover($event)"
      @drop="onDrop($event)">
      <div
        class="drag-content"
        draggable="true"
        @dragstart="onDragstart($event)"
        @dragend="onDragend($event)">
          托我啊
      </div>
    </div>
    <div
      class="onDown"
      draggable="false"
      @dragover="onDragover($event)"
      @drop="onDrop($event)">

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        childNode: ''
      }
    },
    methods: {
      onDragstart(event) {
        this.childNode=event.target;
      },
      onDragend(event) {

      },
      onDrop(event) {
        event.target.appendChild(this.childNode);
      },
      onDragover(event) {
        event.preventDefault();
      },
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
  .container{
    width 100px
    height 100px
    border 1px solid #1890ff
  }
  .onDown{
    width 100px
    height 100px
    border 1px solid #1890ff

  }
</style>