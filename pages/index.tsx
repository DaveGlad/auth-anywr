import { Button, Space } from 'antd';
import Link from 'next/link';
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from '@/src/configs/app.routes';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import PageTransitionApparition from '@/src/components/animations/pagesTransition';

export default function Home() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <PageTransitionApparition>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24 `}
      >
        <h1 className="text-center text-2xl mb-8">
          Hello <span className="font-bold">Anywr</span>
        </h1>

        <Space>
          {isLoggedIn ? (
            <Link href={DASHBOARD_ROUTE}>
              <Button type={'primary'}>Mon compte</Button>
            </Link>
          ) : (
            <Fragment>
              <Link href={LOGIN_ROUTE}>
                <Button type={'primary'}>Login</Button>
              </Link>
              <Link href={REGISTER_ROUTE}>
                <Button type={'primary'}>Register</Button>
              </Link>
            </Fragment>
          )}
        </Space>
      </main>
    </PageTransitionApparition>
  );
}
