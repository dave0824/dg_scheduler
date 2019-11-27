<template>
  <div>
    <h2>请选择标签</h2>
    <div class="leftDiv">
      <h3>所有标签</h3>
      <div
        class="container"
        draggable="false"
        @dragover="onDragover($event)"
        @drop="onDrop($event)">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="{ show: true, clear: true }"
          :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
          draggable="true"  @dragstart="onDragstart($event)" @dragend="onDragend($event)"
        >
        </s-table>
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
  import { STable } from '@/components'
  export default{
    components: {
      STable
    },
    data(){
      return{
        childNode: '',
        group: [
          '标签1',
          '标签2',
          '标签3',
          '标签4',
          '标签5',
        ],
        // 表头
        columns: [
          {
            title: '任务ID',
            dataIndex: 'taskID',
            sorter: true,
            needTotal: true
          },
          {
            title: '任务名称',
            dataIndex: 'taskName',
            scopedSlots: { customRender: 'taskName' }
          },
          {
            title: '任务编码',
            dataIndex: 'taskCode',
            scopedSlots: { customRender: 'taskCode' }
          },
          {
            title: '任务应用名',
            dataIndex: 'taskAppName',
            scopedSlots: { customRender: 'taskAppName' }
          }
        ],

        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return this.$http.get('/service', {
            params: Object.assign(parameter, this.queryParam)
          }).then(res => {
            return res.result
          })
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    methods: {
      onDragstart(event) {
        this.childNode=event.target;
        console.log(this.childNode);
      },
      onDragend(event) {

      },
      onDrop(event) {
        event.target.appendChild(this.childNode);
      },
      onDragover(event) {
        event.preventDefault();
      },

      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    }
  }
</script>
<style lang="stylus">
  .drag-content{
    background #13c2c2
  }
  .container{
   /* width 300px
    height 300px
    border 1px solid #1890ff*/
  }
  .onDown{
    width 400px
    height 715px
    border 1px solid #1890ff
    /*loat: left
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