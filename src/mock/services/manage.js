import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      jobTaskID: Mock.mock('@integer(1, 100)'),
      preTaskKey: 'key',
      inputType: 'type',
      inputValue: 'value',
      routeStrategy: 'strategy',
      failOver: 'fail',
      predictRunTime: Mock.mock('@integer(50, 100)'),

      taskLogID: Mock.mock('@integer(1, 100)'),
      taskKey: 'key',
      taskMsg: 'msg',
      taskStatus: Mock.mock('@integer(0, 1)'),
      taskHandleTime: Mock.mock('@datetime'),
      taskFinishTime: Mock.mock('@datetime'),

      taskID: Mock.mock('@integer(1, 100)'),
      taskName: Mock.mock('@cname'),
      taskCode: 'code',
      taskAppName: 'name',
      taskGroupCode: 'code',
      taskPath: '/path',
      taskMethod: 'get',
      taskCategory: 'http',
      isAssignment: Mock.mock('@char(n,y)'),

      jobLogID: Mock.mock('@integer(0, 100)'),
      jobTriggerState: Mock.mock('@integer(0, 1)'),
      jobTriggerTime: Mock.mock('@datetime'),
      jobHandleState: Mock.mock('@integer(0, 1)'),
      jobHandleMsg: '消息',
      jobHandleTime: Mock.mock('@datetime'),
      jobHandleFinishTime: Mock.mock('@datetime'),

      jobID: Mock.mock('@integer(1, 100)'),
      jobName: Mock.mock('@cname'),
      jobKey: 'Key',
      jobGroup: 'Group',
      jobTriggerType: '方式',
      jobTriggerValue: Mock.mock('@integer(1, 100)'),
      jobDesc: '这是描述',
      /*jobAlarmEmail: Mock.mock('@email'),*/
      jobAlarmEmail: 'email',
      jobParentKey: 'key',
      jobNextHandleTime: Mock.mock('@datetime'),

      interfaceName: '接口名',
      requestMethod: 'get',
      originalRequestURL: '/user',
      backEndServeURL: '/user',
      urlCurrentLimitingStatisticalCycle: Mock.mock('@integer(1, 100)'),
      urlCurrentLimitingStatisticalCycleMaxPermitRequestNumber: '10',
      urlSingleIPCurrentLimitingStatisticalCycle: Mock.mock('@integer(1, 100)'),
      urlSingleIPCurrentLimitingStatisticalCycleMaxPermitRequestNumber: Mock.mock('@integer(10, 20)'),
      returnResultType: 'json',
      interfaceId: Mock.mock('@integer(1, 99999)'),
      clientCode: 'clientCode',
      clientName: 'clientName',
      clientId: Mock.mock('@integer(1, 99999)'),
      clientKey: '产品密钥',
      authGroupNo: Mock.mock('@integer(1, 99999)'),
      authGroupName: '权限组名',
      higherAuthGroupId: Mock.mock('@integer(1, 99999)'),
      serviceName: '服务名称',
      serviceDescription: '这是服务描述',
      serveModelId: Mock.mock('@integer(1, 99999)'),
      serveModelName: '服务名',
      ip: '192.168.0.1',
      protocol: 'TCP/IP',
      weight: Mock.mock('@integer(1, 9)'),
      serveInterfaceId: Mock.mock('@integer(1, 99999)'),
      requestParamCode: 'a1b2c3',
      requestParamType: 'char',
      requestParamCategory: 'get',
      originalParamName: 'name',
      originalParamCode: 'd4e5f6',
      originalParamType: 'int',
      originalParamDefaultValue: Mock.mock('@integer(1, 999)'),
      originalParamCategory: 'get',
      key: tmpKey,
      id: tmpKey,
      fieldName: '这是域名称',
      fieldNo: Mock.mock('@integer(1,99999)'),
      no: 'No ' + tmpKey,
      description: '这是客户端KEY',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 1)'),
      isDel: Mock.mock('@integer(0, 1)'),
      updatedAt: Mock.mock('@datetime'),
      createPerson: Mock.mock('@cname'),
      updatePerson: Mock.mock('@cname'),
      createdAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    'data': [{
      id: 1,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: 'Alipay',
      description: '那是一种内在的东西， 他们到达不了，也无法触及的',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 2,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: 'Angular',
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 3,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: 'Ant Design',
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 4,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      title: 'Ant Design Pro',
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 5,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      title: 'Bootstrap',
      description: '凛冬将至',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 6,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
      title: 'Vue',
      description: '生命就像一盒巧克力，结果往往出人意料',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    }
    ],
    'pageSize': 10,
    'pageNo': 0,
    'totalPage': 6,
    'totalCount': 57
  })
}

const activity = () => {
  return builder([{
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '蓝莓酱',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划'
    },
    time: '2018-08-23 09:35:37'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '创建',
      event: '番组计划'
    },
    time: '2017-05-27 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: '@image(64x64)'
    },
    project: {
      name: '高逼格设计天团',
      action: '更新',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)'
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  }
  ])
}

const teams = () => {
  return builder([{
    id: 1,
    name: '科学搬砖组',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  },
  {
    id: 2,
    name: '程序员日常',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
  },
  {
    id: 1,
    name: '设计天团',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
  },
  {
    id: 1,
    name: '中二少女团',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
  },
  {
    id: 1,
    name: '骗你学计算机',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
  }
  ])
}

const radar = () => {
  return builder([{
    item: '引用',
    '个人': 70,
    '团队': 30,
    '部门': 40
  },
  {
    item: '口碑',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '产量',
    '个人': 50,
    '团队': 60,
    '部门': 40
  },
  {
    item: '贡献',
    '个人': 40,
    '团队': 50,
    '部门': 40
  },
  {
    item: '热度',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '引用',
    '个人': 70,
    '团队': 50,
    '部门': 40
  }
  ])
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
