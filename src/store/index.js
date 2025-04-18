// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      token: localStorage.getItem('token'),
      login: !!localStorage.getItem('token'),
      isAuthenticated: !!localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')) || null,
    };
  },
  mutations: {
    SET_TOKEN(state, { token, user }) {
      state.token = token;
      state.login = !!token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        state.isAuthenticated = true;
        state.user = user;
      }
      
    },
    CLEAR_AUTH(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('SET_TOKEN', { token, user });
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
    },
  },
  getters: {
    isAdmin: (state) => state.user?.role === 'Admin',
  },
});