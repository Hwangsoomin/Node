import axios from 'axios';
import store from './store/index';

axios.interceptors.request.use(
	function(config) {
		try {
			config.headers.common = {
				Authorization: 'Bearer ' + store.state.accessToken,
			};
		} catch (err) {
			console.log();
		}
		return config;
	},
	function(error) {
		return Promise.reject(error);
	},
);
