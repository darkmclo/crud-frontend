import Cookie from 'universal-cookie';
import StoreKeys from '../data/auth/store-keys';
import instanceAxios from '../plugins/axios-instance';
import { useAuthStore } from '../stores/auth';

const cookie = new Cookie();

export const serviceVerifySessionCandidate = async () => {
	const jwt = cookie.get(StoreKeys.JWT);
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
		AuthStore.user = userRaw.data;
		return;
	}

	configJWTAxios(undefined);

	if (userRaw.status === 401) {
		AuthStore.logout();
		return;
	}

	/*
		Agregar Codigo para reddiccion de hay error de servicio no disponible
	*/
	console.log('Server no esta disponible');
};

const configJWTAxios = (jwt?: undefined | string) => {
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
