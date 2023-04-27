import { LoginDto, RegisterDto, Status, User } from '@/src/shared';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Nextlogin,
  Nextlogout,
  authUser,
  firebaseCreateUserWithEmailAndPassword,
  firebaseLogInWithEmailAndPassword,
  logout,
} from '../../services/auth/index';
import { User as FirebaseUser } from 'firebase/auth';
import { displayFirebaseError } from '@/src/utils';
import { FirebaseError } from 'firebase/app';

type AppUser = User & {
  firebase: FirebaseUser;
};

export interface AuthInitialState {
  infos: AppUser | null;
  isLoggedIn: boolean;
  authenticate: {
    loading: boolean;
    error: string;
    status: Status;
  };
  login: {
    loading: boolean;
    error: string;
    status: Status;
  };
  register: {
    loading: boolean;
    error: string;
    status: Status;
  };
  logout: {
    loading: boolean;
    error: string;
    status: Status;
  };
}

const initialState: AuthInitialState = {
  infos: null,
  isLoggedIn: false,
  authenticate: {
    loading: true,
    error: '',
    status: 'pending',
  },
  login: {
    loading: false,
    error: '',
    status: 'pending',
  },
  register: {
    loading: false,
    error: '',
    status: 'pending',
  },
  logout: {
    loading: false,
    error: '',
    status: 'pending',
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    registerDto: RegisterDto & {
      onSuccess?: () => void;
      onFailed?: () => void;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const { email, password, onFailed, onSuccess } = registerDto;
    try {
      const firebaseUser = await firebaseCreateUserWithEmailAndPassword({
        email,
        password,
      });
      await firebaseLogInWithEmailAndPassword({
        email,
        password,
      });

      await Nextlogin();

      onSuccess && onSuccess();

      return fulfillWithValue({
        firebase: firebaseUser.user.toJSON(),
      });
    } catch (err) {
      console.log('error', err);
      onFailed && onFailed();
      if (err instanceof FirebaseError) {
        return rejectWithValue(displayFirebaseError(err));
      }
      return rejectWithValue('Une erreur est survenue');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    loginDto: LoginDto & {
      onSuccess?: () => void;
      onFailed?: () => void;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const { email, password, onSuccess, onFailed } = loginDto;
    try {
      const firebaseUser = await firebaseLogInWithEmailAndPassword({
        email,
        password,
      });
      await Nextlogin();
      onSuccess && onSuccess();
      const finalUser = {
        firebase: firebaseUser.user,
      };
      return fulfillWithValue(finalUser);
    } catch (err) {
      console.log('error', err);
      onFailed && onFailed();
      if (err instanceof FirebaseError) {
        return rejectWithValue(displayFirebaseError(err));
      }
      return rejectWithValue('Une erreur est survenue');
    }
  }
);

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (_: void, { rejectWithValue, fulfillWithValue }) => {
    try {
      const firebaseUser = await authUser();
      if (!firebaseUser) throw new Error('Firebase user null');
      const finalUser = {
        firebase: firebaseUser.toJSON() as FirebaseUser,
      };
      return fulfillWithValue(finalUser);
    } catch (err) {
      console.log('error', err);
      if (err instanceof FirebaseError) {
        return rejectWithValue(displayFirebaseError(err));
      }
      return rejectWithValue(
        (err as Error)?.message || 'Une erreur est survenue'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (
    {
      onSuccess,
      onFailed,
    }: {
      onSuccess?: () => void;
      onFailed?: () => void;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      await logout();
      await Nextlogout();
      onSuccess && onSuccess();
      return fulfillWithValue(null);
    } catch (err) {
      console.log('error', err);
      onFailed && onFailed();
      if (err instanceof FirebaseError) {
        return rejectWithValue(displayFirebaseError(err));
      }
      return rejectWithValue('Une erreur est survenue');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserInfos: (
      state: AuthInitialState,
      action: PayloadAction<AppUser>
    ) => {
      state.infos = {
        ...(state.infos || {}),
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    // Authenticate user
    builder
      .addCase(authenticateUser.pending, (state: AuthInitialState, _action) => {
        state.authenticate.loading = true;
        state.authenticate.error = '';
        state.authenticate.status = 'pending';
      })
      .addCase(
        authenticateUser.fulfilled,
        (state: AuthInitialState, action) => {
          state.authenticate.loading = false;
          state.authenticate.error = '';
          state.authenticate.status = 'success';
          state.infos = action.payload as AppUser;
          state.isLoggedIn = true;
        }
      )
      .addCase(authenticateUser.rejected, (state: AuthInitialState, action) => {
        state.authenticate.loading = false;
        state.authenticate.error = action.payload as string;
        state.authenticate.status = 'error';
      });
    // Register user
    builder
      .addCase(registerUser.pending, (state: AuthInitialState, action) => {
        state.register.loading = true;
        state.register.error = '';
        state.register.status = 'pending';
      })
      .addCase(registerUser.fulfilled, (state: AuthInitialState, action) => {
        state.register.loading = false;
        state.register.error = '';
        state.register.status = 'success';
        state.infos = action.payload as AppUser;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state: AuthInitialState, action) => {
        state.register.loading = false;
        state.register.error = action.payload as string;
        state.register.status = 'error';
      });
    // Login user
    builder
      .addCase(loginUser.pending, (state: AuthInitialState, action) => {
        state.login.loading = true;
        state.login.error = '';
        state.login.status = 'pending';
      })
      .addCase(loginUser.fulfilled, (state: AuthInitialState, action) => {
        state.login.loading = false;
        state.login.error = '';
        state.login.status = 'success';
        state.infos = action.payload as AppUser;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state: AuthInitialState, action) => {
        state.login.loading = false;
        state.login.error = action.payload as string;
        state.login.status = 'error';
      });
    // Logout user
    builder
      .addCase(logoutUser.pending, (state: AuthInitialState, action) => {
        state.logout.loading = true;
        state.logout.error = '';
        state.logout.status = 'pending';
      })
      .addCase(logoutUser.fulfilled, (state: AuthInitialState, action) => {
        state.logout.loading = false;
        state.logout.error = '';
        state.logout.status = 'success';
        state.infos = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state: AuthInitialState, action) => {
        state.logout.loading = false;
        state.logout.error = action.payload as string;
        state.logout.status = 'error';
      });
  },
});

export const { updateUserInfos } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
