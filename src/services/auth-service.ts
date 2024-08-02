import Cookie from 'universal-cookie';
import StoreKeys from '../data/auth/store-keys';
import instanceAxios from '../plugins/axios-instance';
import { useAuthStore } from '../stores/auth';

//const cookie = new Cookie();

export const serviceVerifySessionUser = async () => {
	const jwt = localStorage.getItem('user_token');
	const AuthStore = useAuthStore();
	if (!jwt) {
		AuthStore.jwt = jwt;
		configJWTAxios(jwt);
		return;
	}
	configJWTAxios(jwt);
	
	const userRaw = await instanceAxios.get('users/me?populate[0]=candidate');
	if (userRaw.status === 200 && userRaw.data?.candidate) {
		AuthStore.jwt = jwt;
		return;
	}

	configJWTAxios(undefined);

	if (userRaw.status === 401) {
		AuthStore.handleLogout();
		return;
	}
	console.log('El servidor no está disponible.');
};

const configJWTAxios = (jwt?: null | string) => {
	instanceAxios.interceptors.request.use(
		(config) => {
			config.headers['Authorization'] = jwt ? `Bearer ${jwt}` : undefined;
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);
};
