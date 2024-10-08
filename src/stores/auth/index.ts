import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../../plugins/axios-instance";
import { serviceVerifySessionUser } from "../../services/auth-service";

//const cookie = new Cookie();

export const useAuthStore = defineStore("auth", () => {
    const isValidatingAuth = ref(true);
	const jwt = ref<string | null>(getToken());
	//const user = ref<IAuth | null>(null);
	
	const validateSession = async () => {
		if (!isValidatingAuth.value) return;
		isValidatingAuth.value = false;
		jwt.value = localStorage.getItem('user_token');
		if (!jwt.value) return;
		await serviceVerifySessionUser();
	};

	const login = async(data: { email: string; password: string }) => {
		axiosInstance.post('/login', {
			email: data.email,
			password: data.password,
		})
		.then(response => {
			if (response.data.access_token) {
				localStorage.setItem('user_token', JSON.stringify(response.data));
			}
			return response.data;
		}).catch(error => console.log(error));
    }

    function logout() {
        localStorage.removeItem('user_token');
		jwt.value = null;
		user.value = null;
		candidate.value = null;
		cookie.remove(StoreKeys.JWT);
		
		//router.push('/login');
		window.location.href = "/login";
    }

    const handleLogin = async (data: { email: string; password: string }) => {
		try {
			const res = await axiosInstance.post(`auth/local`, {
				identifier: data.email,
				password: data.password,
			});
			if (!res.data.user) throw res.data ?? "Inicio de sesión fallo";
			
			//const userResp = res.data.user;
			const jwtCurrent = res.data.jwt;
			
			console.log(`jwtCurrent: ${jwtCurrent}`);
			//cookie.set(StoreKeys.JWT, jwtCurrent);
            localStorage.setItem('jwt',jwtCurrent);
			isValidatingAuth.value = true;
			await validateSession();
			return res.data;
		} catch (error: any) {
			data.password = "";
			console.log("Ocurrió un error en handleLogin()");
			return error.response.data;
		}
	};

    function handleLogout() {
		jwt.value = null;
		localStorage.removeItem('user_token');
		//cookie.remove(StoreKeys.JWT);
		
		//router.push('/login');
		window.location.href = "/login";
	}

	function getToken() {
		return localStorage.getItem('user_token');
	}

    return {
        isValidatingAuth,
        jwt,
        handleLogin,
        handleLogout
    };
});