import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../../plugins/axios-instance";

//const cookie = new Cookie();

export const useProductStore = defineStore("products", () => {
    
    const getAllProducts = async () => {
        try {
          const res = await axiosInstance.get("products");
          const response_data = res.data.data;
          return response_data;
        } catch (error: any) {
          console.log("Error al obtener la información:", error.response);
        }
    };

    const getProductbyId = async (id_selected: number) => {
        try {
          const res = await axiosInstance.get(`get-product/${id_selected}`);
          const response_data = res.data;
          response_data.status = res.status;
          return response_data;
        } catch (error: any) {
          const error_data = JSON.parse(JSON.stringify(error.response.data));
          throw error_data;
        }
    };

    const saveProduct = async (dataReg: {
        productName: string;
        quantity: number;
        price: number;
      }) => {
      try {
        const res = await axiosInstance.post(`save-product`, {
          productName: dataReg.productName,
          quantity: dataReg.quantity,
          price: dataReg.price
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

    const updateProduct = async (dataReg: {
      id: number;
      productName: string;
      quantity: number;
      price: number;
    }) => {
      try {
        const res = await axiosInstance.put(`update-product/${(dataReg.id)}`, {
          id: dataReg.id,
          productName: dataReg.productName,
          quantity: dataReg.quantity,
          price: dataReg.price
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

    const deleteProduct = async (
      id_selected: number ) => {
      try {
        const res = await axiosInstance.delete(`delete-product/${id_selected}`)
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
        getAllProducts,
        getProductbyId,
        saveProduct,
        updateProduct,
        deleteProduct
    };
});