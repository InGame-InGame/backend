import { store } from '@/store';
import { storeLogin, storeLogout } from '@/store/authSlice';

export const getToken = () => {
  const state = store.getState();
  return state.auth.token;
};

export const removeToken = () => {
  store.dispatch(storeLogout());
};

export const setToken = (res: { accessToken: string }) => {
  const token = res.accessToken;
  store.dispatch(storeLogin({ token }));
};
