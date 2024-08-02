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

    const getClientbyId = async (id_selected: number) => {
        try {
          const res = await axiosInstance.get(`get-client/${id_selected}`);
          const response_data = res.data;
          response_data.status = res.status;
          return response_data;
        } catch (error: any) {
          const error_data = JSON.parse(JSON.stringify(error.response.data));
          throw error_data;
        }
    };

    const saveClient = async (dataReg: {
        name: string;
        rtn: string;
        addr: string;
      }) => {
      try {
        const res = await axiosInstance.post(`save-client`, {
          name: dataReg.name,
          rtn: dataReg.rtn,
          addr: dataReg.addr
        });
        const response_data = res.data;
        //console.log("Respuesta desde el store: ");
        response_data.status = res.status;
        console.log(response_data);
        return response_data;

      } catch (error: any) {
        //console.log("Error al obtener la información:", error.error);
        //console.log(JSON.stringify(error));
        console.log(error.response.data);
        const error_data = JSON.parse(JSON.stringify(error.response.data));
        throw error_data;
      }
    };

    const updateClient = async (dataReg: {
      id: number;
      name: string;
      rtn: string;
      addr: string;
    }) => {
      try {
        const res = await axiosInstance.put(`update-client/${(dataReg.id)}`, {
          id: dataReg.id,
          name: dataReg.name,
          rtn: dataReg.rtn,
          addr: dataReg.addr
        });
        const response_data = res.data;
        //console.log("Respuesta desde el store: ");
        response_data.status = res.status;
        console.log(response_data);
        return response_data;

      } catch (error: any) {
        //console.log("Error al obtener la información:", error.error);
        //console.log(JSON.stringify(error));
        console.log(error.response.data);
        const error_data = JSON.parse(JSON.stringify(error.response.data));
        throw error_data;
      }
    };

    const deleteClient = async (
      id_selected: number ) => {
      try {
        const res = await axiosInstance.delete(`delete-client/${id_selected}`)
        const response_data = res.data;
        response_data.status = res.status;
        console.log(response_data);
        return response_data;

      } catch (error: any) {
        console.log(error.response.data);
        const error_data = JSON.parse(JSON.stringify(error.response.data));
        throw error_data;
      }
    };

    return {
        getAllClients,
        getClientbyId,
        saveClient,
        updateClient,
        deleteClient
    };
});