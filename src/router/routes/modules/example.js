import Layout from '@/layout/index.vue'
import {
  ChartBar,
  Calculator,
  UserAltSlash,
  Dove,
  Github,
  HouseDamage,
  LastfmSquare,
  Link,
  TimesCircle,
} from '@vicons/fa'
import { Person } from '@vicons/ionicons5'
import { ManageAccountsFilled } from '@vicons/material'
import { UserAddOutlined, OrderedListOutlined } from '@vicons/antd'
export default [
  {
    name: 'EXAMPLE',
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    meta: {
      title: '组件示例',
      role: ['admin'],
    },
    children: [
      {
        name: 'EXAMPLE-TABLE',
        path: 'table',
        component: () => import('@/views/examples/table/index.vue'),
        redirect: '/example/table/post',
        meta: {
          title: '表格',
          role: ['admin'],
        },
        children: [
          {
            name: 'POST-LIST',
            path: 'post',
            component: () => import('@/views/examples/table/post/index.vue'),
            meta: {
              title: '文章列表',
              role: ['admin'],
            },
          },
          {
            name: 'POST-CREATE',
            path: 'post-create',
            component: () => import('@/views/examples/table/post/post-create.vue'),
            meta: {
              title: '创建文章',
              role: ['admin'],
            },
          },
        ],
      },
    ],
  },
  {
    name: 'user manage',
    path: '/user-manage',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: ManageAccountsFilled,
      role:['admin']
    },
    children: [
      {
        name: 'add-user',
        path: '/add-user',
        component: () => import('@/views/user-manage/add-user.vue'),
        meta: {
          title: '添加用户',
          icon: UserAddOutlined,
          role: ['admin'],
        },
      },
      {
        name: 'del-user',
        path: '/del-user',
        meta: {
          title: '删除/禁用用户',
          icon: UserAltSlash,
          role: ['admin'],
        },
      },
      {
        name: 'LINK-DOCS',
        path: 'https://zclzone.github.io/vue-naive-admin-docs',
        meta: {
          title: '文档 - vuepress',
          icon: LastfmSquare,
          role: ['admin'],
        },
      },
    ],
  },
]
