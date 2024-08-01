import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../../plugins/axios-instance";

export const useServerStore = defineStore("server", () => {
    const serverStatus = ref<string>();

	const checkServerStatus = async () => {
		try {
            const response = await axiosInstance.get('status');
            if (response.status === 200) {
              serverStatus.value = 'Online';
            } else {
              serverStatus.value = 'Offline';
            }
            return serverStatus.value;
          } catch (error) {
            serverStatus.value = 'Offline';
            return serverStatus.value;
        }
	};

    return {
        checkServerStatus,
        serverStatus
    };
});