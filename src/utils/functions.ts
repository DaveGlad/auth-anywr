import { IConfirmation } from '../shared';
import { Modal } from 'antd';
import { FirebaseError } from 'firebase/app';
import { AuthError } from 'firebase/auth';
const { confirm } = Modal;

export const displayFirebaseError = (
  error: AuthError | FirebaseError
): string => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Wrong password';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/user-disabled':
      return 'User disabled';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Weak password';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code';
    case 'auth/account-exists-with-different-credential':
      return 'Account exists with different credential';
    case 'auth/requires-recent-login':
      return 'Requires recent login';
    case 'auth/too-many-requests':
      return 'Too many requests';
    case 'auth/network-request-failed':
      return 'Network request failed';
    case 'auth/invalid-credential':
      return 'Invalid credential';
    case 'auth/invalid-user-token':
      return 'Invalid user token';
    case 'auth/invalid-password':
      return 'Invalid password';
    case 'auth/invalid-api-key':
      return 'Invalid Api Key';
    default:
      return 'Firebase Error';
  }
};

export const showConfirm = <T>(confirmation: IConfirmation<T>) => {
  const { title, content, onCancel, onOk, icon } = confirmation;
  confirm({
    title,
    icon,
    content,
    okButtonProps: {
      danger: true,
    },
    onCancel,
    onOk,
  });
};
