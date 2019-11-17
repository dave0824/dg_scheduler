<template>
  <div>
    <div class="leftDiv">
    <h3>所有标签</h3>
      <div
        class="container"
        draggable="false"
        @dragover="onDragover($event)"
        @drop="onDrop($event)">
        <a-button
          class="drag-content"
          v-for="(item,cindex) in group"
          :key="cindex"
          draggable="true"
          @dragstart="onDragstart($event)"
          @dragend="onDragend($event)">
            {{item}}
        </a-button>
      </div>
    </div>
    <div class="rightDiv">
      <h3>选择的标签</h3>
      <div
        class="onDown"
        draggable="false"
        @dragover="onDragover($event)"
        @drop="onDrop($event)">

      </div>
      <a-button class="submit">提交</a-button>
    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        childNode: '',
        group: [
          '标签1',
          '标签2',
          '标签3',
          '标签4',
          '标签5',
        ]
      }
    },
    methods: {
      onDragstart(event) {
        this.childNode=event.target;
        console.log(this.childNode);
        console.log(event.target);
        console.log('aaaaaaaa');
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
  .drag-content{
    background #13c2c2
  }
  .container{
    width 300px
    height 300px
    border 1px solid #1890ff
  }
  .onDown{
    width 300px
    height 300px
    border 1px solid #1890ff
    /*float: left
    margin : 0.25in*/
  }
  .submit{
    float: left
    margin : -30px 0px 0px 340px
  }
  .leftDiv{
    float: left
    margin : 0.25in
  }
  .rightDiv{
    float: left
    margin : 0.25in
  }

</style>