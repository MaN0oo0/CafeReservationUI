// store/modules/auth.js
export default {
    namespaced: true,
    state: {
      isAuthenticated: !!localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')) || null,
    },
    mutations: {
      SET_AUTH(state, { token, user }) {
        state.isAuthenticated = true;
        state.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
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
        commit('SET_AUTH', { token, user });
      },
      logout({ commit }) {
        commit('CLEAR_AUTH');
      },
    },
    getters: {
      isAdmin: (state) => state.user?.role === 'Admin',
    },
  };