import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@/src/store';
import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/cssinjs';
import { AntdThemeConfig } from '@/src/configs/antd.config';
import '@/src/configs/firebase.config';
import { ConfigProvider } from 'antd';
import { AuthUser } from '@/src/components';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/src/components/animations';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={AntdThemeConfig}>
        <StyleProvider hashPriority="high">
          <AnimatePresence mode="wait">
            <PageTransition />
            <AuthUser>
              <Component {...pageProps} />
            </AuthUser>
          </AnimatePresence>
        </StyleProvider>
      </ConfigProvider>
    </Provider>
  );
}
