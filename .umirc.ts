import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'TroTro的论坛',
  },
  extraPostCSSPlugins: [
    require('tailwindcss'),
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '主页',
      path: '/home',
      component: './Home',
    },
    {
      name: '注册',
      path: '/register',
      component: './login/register',
      layout: false,
    },
    {
      name: '登录',
      path: '/login',
      component: './login',
      layout: false,
    }
  ],
  npmClient: 'pnpm',
  tailwindcss: {},
});
