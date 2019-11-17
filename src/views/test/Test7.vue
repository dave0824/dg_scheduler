<template>
  <Layout>
    <Header>Header</Header>
      <Sider>
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
      </Sider>
      <Content>
        <div
          class="onDown"
          draggable="false"
          @dragover="onDragover($event)"
          @drop="onDrop($event)">

        </div>
      </Content>
    <Footer>Footer</Footer>
  </Layout>
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
    /*width 60px*/
  }
 .container{
    width 400px
    height 400px
    border 1px solid #1890ff
  }
  .onDown{
    width 400px
    height 400px
    border 1px solid #1890ff

  }
</style>