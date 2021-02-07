import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state: { accessToken: null, id: null, name: null },
	mutations: {
		Login(state, { accessToken, user }) {
			state.accessToken = accessToken;
			state.id = user.id;
			state.name = user.name;
		},
	},
	actions: {
		async Login({ commit }, { id, password }) {
			const result = await axios.post('/api/user/login', {
				id,
				password,
			});
			axios.defaults.headers.common = {
				Authorization: 'Bearer ' + result.data.result.accessToken,
			};
			return commit('Login', result.data.result);
		},
	},
	modules: {},
	plugins: [createPersistedState()],
});
