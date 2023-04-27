import { Inter } from 'next/font/google';
import { Button, Popconfirm, Space, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppDispatch, logoutUser } from '@/src/store';
import { useDispatch, useSelector } from 'react-redux';
import PageTransitionApparition from '@/src/components/animations/pagesTransition';

export default function Dashboard() {
  const router = useRouter();
  const {
    isLoggedIn,
    logout: { loading },
    infos,
  } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const onLogoutSuccess = () => {
    message.success('Logout successfully...');
    router.push('/');
  };
  const onLogoutFailed = () => {
    message.error('Logout failed...');
  };

  return (
    <PageTransitionApparition>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24 `}
      >
        <h1 className="text-center mb-8 text-2xl">
          Hello {infos?.firebase.email?.split('@')[0]}
        </h1>

        <Space>
          <Link href={'/'}>
            {' '}
            <Button block type="primary">
              Home
            </Button>
          </Link>
          <Popconfirm
            description={'Voulez-vous vraiment vous déconnecter ?'}
            placement="bottom"
            title={'Déconnexion'}
            onConfirm={() => {
              dispatch(
                logoutUser({
                  onSuccess: onLogoutSuccess,
                  onFailed: onLogoutFailed,
                })
              );
            }}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              loading,
            }}
          >
            <Button block type="primary">
              Se déconnecter
            </Button>
          </Popconfirm>
        </Space>
      </main>
    </PageTransitionApparition>
  );
}
