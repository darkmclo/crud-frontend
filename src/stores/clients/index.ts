import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../../plugins/axios-instance";

//const cookie = new Cookie();

export const useClientStore = defineStore("clients", () => {
    
    const getAllClients = async () => {
        try {
          const res = await axiosInstance.get("clients");
          const response_data = res.data.data;
          return response_data;
        } catch (error: any) {
          console.log("Error al obtener la información:", error.response);
          //return false;
        }
      };

    return {
        getAllClients
    };
});