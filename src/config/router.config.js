// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        hidden: true,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: '监控页（外部）', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '测试功能', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        hidden: true,
        meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        hidden: true,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        hidden: true,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        hidden: true,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        hidden: true,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        hidden: true,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },

      {
        path: '/scheduler',
        name: 'scheduler',
        component: PageView,
        meta: { title: '调度程序', icon: 'slack', permission: ['dashboard'] },
        redirect: '/scheduler/test',
        children: [
          {
            path: '/scheduler/job',
            name: 'Job',
            component: () => import('@/views/scheduler/Job'),
            meta: { title: '调度作业', keepAlive: true }
          },
          {
            path: '/scheduler/jobLog',
            name: 'JobLog',
            component: () => import('@/views/scheduler/JobLog'),
            meta: { title: '作业日志', keepAlive: true }
          },
          {
            path: '/scheduler/task',
            name: 'Task',
            component: () => import('@/views/scheduler/Task'),
            meta: { title: '调度任务表', keepAlive: true }
          },
          {
            path: '/scheduler/taskLog',
            name: 'TaskLog',
            component: () => import('@/views/scheduler/TaskLog'),
            meta: { title: '任务执行日志', keepAlive: true }
          },
          {
            path: '/scheduler/jobTaskMapp',
            name: 'JobTaskMapp',
            component: () => import('@/views/scheduler/JobTaskMapp'),
            meta: { title: '任务与作业映射表', keepAlive: true }
          },
          {
            path: '/scheduler/newJobTaskMapp',
            name: 'NewJobTaskMapp',
            component: () => import('@/views/scheduler/NewJobTaskMapp'),
            meta: { title: 'Task信息配置', keepAlive: true }
          },
          {
            path: '/scheduler/newJobTaskMapp2',
            name: 'NewJobTaskMapp2',
            component: () => import('@/views/scheduler/NewJobTaskMapp2'),
            meta: { title: 'Task信息配置2', keepAlive: true }
          },
        ]
      },

      // 测试
      {
        path: '/test',
        name: 'test',
        component: PageView,
        meta: { title: '测试', icon: 'slack', permission: ['dashboard'] },
        redirect: '/test/test',
        children: [
          /*{
           path: '/test/newJobTaskMapp',
           name: 'NewJobTaskMapp',
           component: () => import('@/views/test/NewJobTaskMapp'),
           meta: { title: '新建任务与作业关系', keepAlive: true }
         },
         {
           path: '/test/newJobTaskMapp2',
           name: 'NewJobTaskMapp2',
           component: () => import('@/views/test/NewJobTaskMapp2'),
           meta: { title: '新建任务与作业关系2', keepAlive: true }
         },*/
          /*{
            path: '/test/newJobTaskMapp3',
            name: 'NewJobTaskMapp3',
            component: () => import('@/views/test/NewJobTaskMapp3'),
            meta: { title: '新建任务与作业关系', keepAlive: true }
          },*/
          /*{
            path: '/test/newJobTaskMapp4',
            name: 'NewJobTaskMapp4',
            component: () => import('@/views/test/NewJobTaskMapp4'),
            meta: { title: '新建任务与作业关系', keepAlive: true }
          },*/
          {
            path: '/test/newJobTaskMapp5',
            name: 'NewJobTaskMapp5',
            component: () => import('@/views/test/NewJobTaskMapp5'),
            meta: { title: 'Task信息配置', keepAlive: true }
          },
          {
            path: '/test/newJobTaskMapp6',
            name: 'NewJobTaskMapp6',
            component: () => import('@/views/test/NewJobTaskMapp6'),
            meta: { title: 'Task信息配置6', keepAlive: true }
          },
          {
            path: '/test/newJobTaskMapp7',
            name: 'NewJobTaskMapp7',
            component: () => import('@/views/test/NewJobTaskMapp7'),
            meta: { title: 'Task信息配置7', keepAlive: true }
          },
          {
            path: '/test/newJobTaskMapp8',
            name: 'NewJobTaskMapp8',
            component: () => import('@/views/test/NewJobTaskMapp8'),
            meta: { title: 'Task信息配置8', keepAlive: true }
          },
          {
            path: '/test/newJobTaskMapp9',
            name: 'NewJobTaskMapp9',
            component: () => import('@/views/test/NewJobTaskMapp9'),
            meta: { title: 'Task信息配置9', keepAlive: true }
          },
          {
            path: '/test/newJobTaskMapp10',
            name: 'NewJobTaskMapp10',
            component: () => import('@/views/test/NewJobTaskMapp10'),
            meta: { title: 'Task信息配置10', keepAlive: true }
          },
          {
            path: '/test/newJobTaskMapp11',
            name: 'NewJobTaskMapp11',
            component: () => import('@/views/test/NewJobTaskMapp11'),
            meta: { title: 'Task信息配置11', keepAlive: true }
          },
          {
            path: '/test/test',
            name: 'Test',
            component: () => import('@/views/test/Test'),
            meta: { title: '测试', keepAlive: true }
          },
          {
            path: '/test/test2',
            name: 'Test2',
            component: () => import('@/views/test/Test2'),
            meta: { title: '测试2', keepAlive: true }
          },
          {
            path: '/test/test3',
            name: 'Test3',
            component: () => import('@/views/test/Test3'),
            meta: { title: '测试3', keepAlive: true }
          },
          {
            path: '/test/test4',
            name: 'Test4',
            component: () => import('@/views/test/Test4'),
            meta: { title: '测试4', keepAlive: true }
          },
          {
            path: '/test/test5',
            name: 'Test5',
            component: () => import('@/views/test/Test5'),
            meta: { title: '测试5', keepAlive: true }
          },
          {
            path: '/test/test6',
            name: 'Test6',
            component: () => import('@/views/test/Test6'),
            meta: { title: '测试6', keepAlive: true }
          },
          {
            path: '/test/test7',
            name: 'Test7',
            component: () => import('@/views/test/Test7'),
            meta: { title: '测试7', keepAlive: true }
          },
          {
            path: '/test/test8',
            name: 'Test8',
            component: () => import('@/views/test/Test8'),
            meta: { title: '测试8', keepAlive: true }
          },
          {
            path: '/test/test9',
            name: 'Test9',
            component: () => import('@/views/test/Test9'),
            meta: { title: '测试9', keepAlive: true }
          },
          {
            path: '/test/test10',
            name: 'Test10',
            component: () => import('@/views/test/Test10'),
            meta: { title: '测试10', keepAlive: true }
          }
        ]
      },

      {
        path: '/testJsPlumb',
        name: 'testJsPlumb',
        component: PageView,
        meta: { title: '测试图', icon: 'slack', permission: ['dashboard'] },
        redirect: '/testJsPlumb/test1',
        children: [
          {
            path: '/testJsPlumb/test1',
            name: 'Test1',
            component: () => import('@/views/testJsPlumb/Test1'),
            meta: { title: '测试', keepAlive: true }
          },
         {
            path: '/testJsPlumb/test2',
            name: 'T2',
            component: () => import('@/views/testJsPlumb/Test2'),
            meta: { title: '测试2', keepAlive: true }
          },
          {
            path: '/testJsPlumb/test3',
            name: 'T3',
            component: () => import('@/views/testJsPlumb/Test3'),
            meta: { title: '测试3', keepAlive: true }
          },
          {
            path: '/testJsPlumb/test4',
            name: 'T4',
            component: () => import('@/views/testJsPlumb/Test4'),
            meta: { title: '测试4', keepAlive: true }
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '列表', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          /* {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          }, */
          /* {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [ */
          {
            path: '/other/list/apiGroup-table',
            name: 'APIGroup',
            component: () => import('@/views/other/APIGroup'),
            meta: { title: '接口权限组关系', keepAlive: true }
          },
          {
            path: '/other/list/client-table',
            name: 'Client',
            component: () => import('@/views/other/Client'),
            meta: { title: '客户信息', keepAlive: true }
          },
          {
            path: '/other/list/account-table',
            name: 'ClientAccountList',
            component: () => import('@/views/other/ClientAccountList'),
            meta: { title: '授权账号', keepAlive: true }
          },
          {
            path: '/other/list/right-table',
            name: 'RightGroup',
            component: () => import('@/views/other/RightGroup'),
            meta: { title: '客户权限组关系表', keepAlive: true }
          },
          {
            path: '/other/list/black-list',
            name: 'BlackList',
            component: () => import('@/views/other/BlackList'),
            meta: { title: '黑名单', keepAlive: true }
          },
          {
            path: '/other/list/auth-table',
            name: 'AuthGroupList',
            component: () => import('@/views/other/AuthGroupList'),
            meta: { title: '权限授权组', keepAlive: true }
          },
          {
            path: '/other/list/domain-table',
            name: 'DomainList',
            component: () => import('@/views/other/Domain'),
            meta: { title: '域模型', keepAlive: true }
          },
          {
            path: '/other/list/parameterList-list',
            name: 'ParameterList',
            component: () => import('@/views/other/ParameterList'),
            meta: { title: '参数信息', keepAlive: true }
          },
          {
            path: '/other/list/serve-list',
            name: 'ServeList',
            component: () => import('@/views/other/ServeList'),
            meta: { title: '服务器', keepAlive: true }
          },
          {
            path: '/other/list/serivce-list',
            name: 'ServiceList',
            component: () => import('@/views/other/ServiceList'),
            meta: { title: '服务模块', keepAlive: true }
          },
          {
            path: '/other/list/api-table',
            name: 'API',
            component: () => import('@/views/other/API'),
            meta: { title: '服务接口', keepAlive: true }
          },
          {
            path: '/other/list/user-list',
            name: 'UserList',
            component: () => import('@/views/other/UserList'),
            meta: { title: '用户列表', keepAlive: true }
          },
          {
            path: '/other/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/other/RoleList'),
            meta: { title: '角色列表', keepAlive: true }
          },
          {
            path: '/other/list/system-role',
            name: 'SystemRole',
            component: () => import('@/views/role/RoleList'),
            meta: { title: '角色列表2', keepAlive: true }
          },
          {
            path: '/other/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/other/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          },
          {
            path: '/other/list/tree-list',
            name: 'TreeList',
            component: () => import('@/views/other/TreeList'),
            meta: { title: '树目录表格', keepAlive: true }
          }
          /*  ]
          } */
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
