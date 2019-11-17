<template>
  <div>
    <div
      class="drag-content"
      draggable="true"
      @dragstart="onDragstart($event)"
      @dragend="onDragend($event)">
      <div>托我啊</div>

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
        /*this.classname = event.target*/
        this.childNode=event.target;
      },
      onDragend(event) {

      },
      onDrop(event) {
       /* console.log(event.target);*/
        /*console.log(this.classname);
        let tempNode = document.createElement('div');
        tempNode.innerHTML = event.dataTransfer.getData('node');
       document.getElementsByClassName("onDown")[0].appendChild(tempNode.firstChild);*/
        event.target.appendChild(this.childNode);
      },
      onDragover(event) {
        event.preventDefault();
      },
     /* createNode(node) {
        let tempNode = document.createElement('div');
        tempNode.innerHTML = node;
        return tempNode.firstChild;
      }*/
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