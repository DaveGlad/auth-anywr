import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@/src/store';
import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/cssinjs';
import { AntdThemeConfig } from '@/src/configs/antd.config';
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={AntdThemeConfig}>
        <StyleProvider hashPriority="high">
          <Component {...pageProps} />
        </StyleProvider>
      </ConfigProvider>
    </Provider>
  );
}
