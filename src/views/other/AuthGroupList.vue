<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="权限组编号" >
              <a-input placeholder="" v-model="updateFrom.authGroupNo"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="是否删除">
              <a-select placeholder="请选择" default-value="0" v-model="updateFrom.isDel">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="上级权限组ID">
                <a-input style="width: 100%" v-model="updateFrom.higherAuthGroupId"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间">
                <a-date-picker style="width: 100%" placeholder="请输入创建日期" v-model="updateFrom.createTime"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期" v-model="updateFrom.updateTime"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建人">
                <a-input style="width: 100%" v-model="updateFrom.createPerson"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus"  @click="add()">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :alert="{ show: true, clear: true }"
      :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
    >
      <template v-for="(col, index) in columns" v-if="col.scopedSlots" :slot="col.dataIndex" slot-scope="text, record">
        <div :key="index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col, record)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record)">保存</a>
            <a-divider type="vertical" />
            <a-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a class="edit" @click="() => edit(record)">修改</a>
            <a-divider type="vertical" />
            <a class="delete" @click="() => del(record)">删除</a>
          </span>
        </div>
      </template>
    </s-table>
    <!--悬浮窗口-->
    <a-modal
      title="新建接口"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="权限组编号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input-number  v-model="createForm.authGroupNo"/>
          </a-form-item>
          <a-form-item
            label="权限组名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="createForm.authGroupName"/>
          </a-form-item>
          <a-form-item
            label="上级权限组ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="createForm.higherAuthGroupId"/>
          </a-form-item>
          <a-form-item
            label="是否删除"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group v-model="createForm.isDel">
              <a-radio  value="1">是</a-radio>
              <a-radio  value="0">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      updateFrom: {
        authGroupNo: '',
        authGroupName: '',
        higherAuthGroupId: '',
        isDel: 1,
        createPerson: '',
        updatePerson: '',
        createTime: ''
      },
      // 悬浮框参数
      createForm: {
        authGroupNo: '',
        authGroupName: '',
        higherAuthGroupId: '',
        isDel: 1
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      // 悬浮框参数
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '权限组编号',
          dataIndex: 'authGroupNo',
          sorter: true,
          needTotal: true
        },
        {
          title: '权限组名称',
          dataIndex: 'authGroupName',
          scopedSlots: { customRender: 'authGroupName' }
        },
        {
          title: '上级权限组ID',
          dataIndex: 'higherAuthGroupId',
          scopedSlots: { customRender: 'higherAuthGroupId' }
        },
        {
          title: '是否删除',
          dataIndex: 'isDel',
          needTotal: true
        },
        {
          title: '创建人',
          dataIndex: 'createPerson',
          scopedSlots: { customRender: 'createPerson' }
        },
        {
          title: '更新人',
          dataIndex: 'updatePerson',
          scopedSlots: { customRender: 'updatePerson' }
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
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

    handleOk () {
      this.$refs.table.refresh()
    },
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
    edit (row) {
      row.editable = true
      // row = Object.assign({}, row)
    },
    // eslint-disable-next-line
    del (row) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.no} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
      row.editable = false
    },
    cancel (row) {
      row.editable = false
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 悬浮框方法
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
