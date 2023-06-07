import {
  firebaseSignUpEndpoint,
  firebaseLoginEndpoint,
} from '../../../firebase';

const endpoints = {
  signUp: firebaseSignUpEndpoint,
  login: firebaseLoginEndpoint,
};

export default {
  async authenticate(context, payload) {
    // The authenticate action will either login or sign up the user to the firebase backend. The only difference being the endpoint.

    const response = await fetch(endpoints[payload.authMode], {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong');
      throw error;
    }

    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('token', responseData.idToken);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  async login(context, payload) {
    return context.dispatch('authenticate', {
      ...payload,
      authMode: 'login',
    });
  },
  async signUp(context, payload) {
    return context.dispatch('authenticate', {
      ...payload,
      authMode: 'signUp',
    });
  },
  logout(context) {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  tryLogin(context) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      context.commit('setUser', {
        userId,
        token,
      });
    }
  },
};
