import { AuthFormContainer, LoginForm } from '@/src/components';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from '@/src/configs/app.routes';
import { useSelector, AppDispatch, loginUser } from '@/src/store';
import { useDispatch } from 'react-redux';
import { LoginDto } from '@/src/shared';
import { useRouter } from 'next/router';
import { message } from 'antd';
import PageTransitionApparition from '@/src/components/animations/pagesTransition';

const Login: NextPage = () => {
  const router = useRouter();
  const {
    login: { loading, error },
  } = useSelector((state) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const onSuccess = () => {
    message.success('Logged in successfully...');
    router.push(DASHBOARD_ROUTE);
  };

  const onFailed = () => {
    message.error('Loggin failed...');
  };

  const login = (loginDto: LoginDto) => {
    dispatch(
      loginUser({
        ...loginDto,
        onSuccess,
        onFailed,
      })
    );
  };

  return (
    <PageTransitionApparition>
      <AuthFormContainer>
        <h3 className="text-lg font-bold mt-4 mb-2">Sign in</h3>
        <div className="flex justify-between items-center mb-8">
          <p>
            Don’t have an account?
            <Link
              className="text-primary hover:opacity-70 transition-opacity ml-2"
              href={REGISTER_ROUTE}
            >
              Sign up
            </Link>
          </p>

          <Link
            className="text-primary hover:opacity-70 transition-opacity ml-2"
            href={'/'}
          >
            Back to homepage
          </Link>
        </div>
        <LoginForm onFinish={login} loading={loading} error={error} />
      </AuthFormContainer>
    </PageTransitionApparition>
  );
};

export default Login;
