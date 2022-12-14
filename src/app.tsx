// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { Button, message } from 'antd';
import { RequestConfig } from '@@/plugin-request/request';
import { history } from '@umijs/max';
import { PostSelectAccount } from '@/service/account/account';
import PostButton from './components/PostButton';
import { PostLogout } from '@/service/common/login';

export async function getInitialState(): Promise<{ name: string; id: string }> {
  const account = await PostSelectAccount();
  return { name: account.userName, id: account.userId };
}

const ExitButton = () => {
  return (
    <Button
      style={{ backgroundColor: '#FF8888', color: 'white' }}
      type="text"
      onClick={async () => {
        await PostLogout();
        message.success('拜拜了');
        history.push('/login');
      }}
    >
      退出
    </Button>
  );
};

export const layout = () => {
  return {
    title: 'TroTro的论坛',
    logo: 'https://gitcode.net/TroTro_/image/-/raw/master/touxiang.jpg',
    layout: 'side',
    //菜单标题下方区域
    menuExtraRender: () => {
      return;
    },
    //用户
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'large',
    },
    actionsRender: () => {
      return [<PostButton key="PostButton" />, <ExitButton key="ExitButton" />];
    },
    rightRender: () => {
      return false;
    },
    //菜单页脚
    menuFooterRender: () => {
      return;
    },
  };
};

export const request: RequestConfig = {
  timeout: 20000,
  errorConfig: {
    errorHandler: (error) => {
      //responseInterceptors捕捉不到
      // @ts-ignore
      if (error.code === 'ERR_BAD_RESPONSE') {
        message.error('服务器寄了');
        throw error;
      }
      message.error(error.message);
      throw error;
    },
  },
  responseInterceptors: [
    (response: any) => {
      // @ts-ignore
      const {
        data: { code, msg },
      } = response;
      switch (code) {
        case 500:
          throw new Error(msg);
        case 501:
          message.error('未登录账号');
          history.push('/login');
          break;
      }
      return response.data;
    },
  ],
};
