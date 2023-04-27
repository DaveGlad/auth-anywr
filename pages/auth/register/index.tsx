import { NextPage } from 'next';
import Link from 'next/link';
import { AuthFormContainer, RegisterForm } from '@/src/components';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '@/src/configs/app.routes';
import { RegisterDto } from '@/src/shared';
import { useSelector, AppDispatch, registerUser } from '@/src/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { message } from 'antd';
import PageTransitionApparition from '@/src/components/animations/pagesTransition';

const RegisterInstructor: NextPage = () => {
  const router = useRouter();
  const {
    register: { loading, error },
  } = useSelector((state) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const onSuccess = () => {
    message.success('Registered successfully...');
    router.push(DASHBOARD_ROUTE);
  };

  const onFailed = () => {
    message.error('Registered failed...');
  };

  const register = (values: RegisterDto) => {
    dispatch(
      registerUser({
        ...values,
        onSuccess,
        onFailed,
      })
    );
  };

  return (
    <PageTransitionApparition>
      <AuthFormContainer>
        <h3 className="text-lg font-bold mt-4 mb-2">Sign up</h3>
        <div className="flex justify-between items-start mb-8">
          <p>
            Already have an account ?
            <Link
              className="text-primary hover:opacity-70 transition-opacity ml-2"
              href={LOGIN_ROUTE}
            >
              Sign in
            </Link>
          </p>

          <Link
            className="text-primary hover:opacity-70 transition-opacity ml-2"
            href={'/'}
          >
            Back to homepage
          </Link>
        </div>
        <RegisterForm error={error} onFinish={register} loading={loading} />
      </AuthFormContainer>
    </PageTransitionApparition>
  );
};

export default RegisterInstructor;
