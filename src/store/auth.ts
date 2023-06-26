import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localStorageService from "../services/localStorage.service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoading: false,
    error: null
  },
  reducers: {
    authRequested: (state) => {
      state.isLoading = true;
    },
    authReceived: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authLogout: (state) => {
      state.token = null;
    }
  }
});

const { actions, reducer: authReducer } = authSlice;
const {
  authRequested,
  authReceived,
  authRequestFailed,
  authLogout
} = actions;

export const auth = ({ email, password, isLogin }) => async(dispatch) => {
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJMLGiImZgIcQKVrS-sW3yqOsG5Noe0Cs';
  if (isLogin) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJMLGiImZgIcQKVrS-sW3yqOsG5Noe0Cs';
  }

  dispatch(authRequested());
  try {
    const response = await axios.post(url,authData);
    const { idToken, localId, refreshToken, expiresIn } = response.data;
    
    dispatch(authReceived(idToken));
    localStorageService.setTokens({ accessToken: idToken, userId: localId, refreshToken, expiresIn });
    dispatch(autoLogout(expiresIn));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const autoLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, time * 1000);
}
export const autoLogin = () => (dispatch) => {
  const token = localStorageService.getAccessToken();
  if (!token) {
    dispatch(logout());
  } else {
    const differenceDates = Number(localStorageService.getExpiresDate()) - new Date().getTime();
    if (differenceDates <= 0) dispatch(logout());
    dispatch(authReceived(token));
    dispatch(autoLogout(differenceDates / 1000));
  }
}
export const logout = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(authLogout());
}

export const getAuthToken = () => (state) => state.auth.token;
export const getAuthLoadingStatus = () => (state) => state.auth.isLoading;

export default authReducer;