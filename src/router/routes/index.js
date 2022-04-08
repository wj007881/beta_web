import Layout from '@/layout/index.vue'
import Home from '@/views/dashboard/index.vue'
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
import { IosSettings } from '@vicons/ionicons4'
import { Person } from '@vicons/ionicons5'
import { ManageAccountsFilled } from '@vicons/material'
import { UserAddOutlined, OrderedListOutlined } from '@vicons/antd'
export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
  {
    name: 'REDIRECT',
    path: '/redirect',
    component: Layout,
    isHidden: true,
    children: [
      {
        name: 'REDIRECT_NAME',
        path: '',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },

  {
    name: '个人中心',
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: 'Dashboard',
      icon: ChartBar,
    },
    children: [
      {
        name: 'HOME',
        path: 'home',
        component: Home,
        meta: {
          title: '项目总览',
          icon: HouseDamage,
        },
      },
      {
        name: 'user_info',
        path: 'user_info',
        component: Home,
        meta: {
          title: '个人资料',
          icon: Person,
        },
      },
      {
        name: 'modify_pwd',
        path: 'modify_pwd',
        component: Home,
        meta: {
          title: '修改密码',
          icon: IosSettings,
        },
      },
    ],
  },

  {
    name: 'TEST',
    path: '/test',
    component: Layout,
    redirect: '/test/unocss',
    meta: {
      title: '项目管理',
    },
    children: [
      {
        name: 'UNOCSS',
        path: 'unocss',
        component: () => import('@/views/test-page/TestUnocss.vue'),
        meta: {
          title: '测试unocss',
        },
      },
      {
        name: 'MESSAGE',
        path: 'message',
        component: () => import('@/views/test-page/TestMessage.vue'),
        meta: {
          title: '新建项目',
        },
      },
      {
        name: 'DIALOG',
        path: 'dialog',
        component: () => import('@/views/test-page/TestDialog.vue'),
        meta: {
          title: '项目列表',
        },
      },
      {
        name: 'TEST-KEEP-ALIVE',
        path: 'keep-alive',
        component: () => import('@/views/test-page/TestKeepAlive.vue'),
        meta: {
          title: '测试Keep-Alive',
          keepAlive: true,
        },
      },
    ],
  },

  {
    name: 'ERROR-PAGE',
    path: '/error-page',
    component: Layout,
    redirect: '/error-page/404',
    meta: {
      title: '数据统计',
      icon: Calculator,
    },
    children: [
      {
        name: 'ERROR-404',
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          title: '用户积分排名',
          icon: OrderedListOutlined,
        },
      },
    ],
  },

  {
    name: 'EXTERNAL-LINK',
    path: '/external-link',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: ManageAccountsFilled,
    },
    children: [
      {
        name: 'LINK-GITHUB-SRC',
        path: 'https://github.com/zclzone/vue-naive-admin',
        meta: {
          title: '添加用户',
          icon: UserAddOutlined,
        },
      },
      {
        name: 'LINK-GITEE-SRC',
        path: 'https://gitee.com/zclzone/vue-naive-admin',
        meta: {
          title: '删除/禁用用户',
          icon: UserAltSlash,
        },
      },
      {
        name: 'LINK-DOCS',
        path: 'https://zclzone.github.io/vue-naive-admin-docs',
        meta: {
          title: '文档 - vuepress',
          icon: LastfmSquare,
        },
      },
    ],
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NOT_FOUND',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

const modules = import.meta.globEager('./modules/*.js')
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default)
})

export { asyncRoutes }
