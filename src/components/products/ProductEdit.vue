<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Field, Form, ErrorMessage } from 'vee-validate';
//import { useField, useForm } from 'vee-validate';
//import * as yup from 'yup';

import { useProductStore } from "../../stores/products";

//const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const isResponseSuccess = ref<boolean>(false);

const props = defineProps({
  id: String
});

/*
defineProps<{
  id?: number
}>()
*/

onMounted(() => {
    getProductInfo(parseInt(props.id!));
    resetProductFormValidations();
})

function roundToTwo(num: number) {
    return +(Math.round(num + "e+2") + "e-2");
}

const error_message = ref({
    message: "",
    state: "default",
});

function showAlertsandResetafterTimeout(msg: string, state: string) {
    error_message.value.message = msg;
    
    switch (state) {
        case "success":
        error_message.value.state = "success";
        //throw new Error(error_message);
        break;
        case "error":
        error_message.value.state = "error";
        //throw new Error(error_message);
        break;
        default:
        error_message.value.state = "default";
        break;
    }
    
    setTimeout(() => {
        error_message.value.message = "";
        error_message.value.state = "default";
    }, 9000);
}

const editProductFormData = ref({
    id: 0,
    productName: "",
    quantity: 0,
    price: 0.00
});

const totalPrice = computed(() => {
    return roundToTwo(editProductFormData.value.quantity * editProductFormData.value.price)
});

const validateProductEditFormData = ref<validateProductEditFormDataType>({
    id: "",
    productName: "",
    quantity: "",
    price: ""
});

interface validateProductEditFormDataType {
    id: string;
    productName: string;
    quantity: string;
    price: string;
}

const resetProductFormValidations = () => {
    for (const key in validateProductEditFormData.value) {
        //delete validateContactFormData.value[key as keyof validateContactFormDataType]
        validateProductEditFormData.value[key as keyof validateProductEditFormDataType] = ""
    }
};

const form = ref<HTMLFormElement>(null!);

const isResetted = ref(false);

const resetCurrentForm = () => {
    form.value.resetForm();
    resetProductFormValidations();
    isResetted.value = true;
};

const checkifFormChanged = () => {
    if (form.value.meta.dirty === true) {
        isResetted.value = false;
    }
};

const isRequiredProductName:any = (value: any) => {
    const regex = /^[\s\S]{2,60}$/i;
    if (!isResetted.value) {
        if (!value) {
            validateProductEditFormData.value.productName = "is-invalid";
            return "Este campo es requerido.";
        }
        if (!regex.test(value)) {
            validateProductEditFormData.value.productName = "is-invalid";
            return "Este campo debe tener entre 2 y 60 carácteres.";
        } 
        else if(regex.test(value)) {
            validateProductEditFormData.value.productName = "is-valid";
            return true;
        }
        validateProductEditFormData.value.productName = "";
        return true;
    }
};

const isRequiredQuantity:any = (value: any) => {
    //const regex = /^\d+(\.\d{1,2})?$/i;
    //const regex = /^-?[1-9]\d*$/;
    const regex = /^\d+$/;
    if (!isResetted.value) {
        if (!value) {
            validateProductEditFormData.value.quantity = "is-invalid";
            return "Este campo es requerido.";
        }
        if (!regex.test(value)) {
            validateProductEditFormData.value.quantity = "is-invalid";
            return "Este campo debe contener solo números enteros positivos.";
        } 
        else if(regex.test(value)) {
            validateProductEditFormData.value.quantity = "is-valid";
            return true;
        }
        validateProductEditFormData.value.quantity = "";
        return true;
    }
};

const isRequiredPrice:any = (value: any) => {
    const regex = /^\d+(\.\d{1,2})?$/i;
    if (!isResetted.value) {
        if (!value) {
            validateProductEditFormData.value.price = "is-invalid";
            return "Este campo es requerido.";
        }
        if (!regex.test(value)) {
            validateProductEditFormData.value.price = "is-invalid";
            return "Este campo debe contener solo números y un máximo de 2 decimales.";
        } 
        else if(regex.test(value)) {
            validateProductEditFormData.value.price = "is-valid";
            return true;
        }
        validateProductEditFormData.value.price = "";
        return true;
    }
};

//const response_ref = ref({});

const getProductInfo = async (selected_id: number) => {
    try {
        const response = await productStore.getProductbyId( selected_id );
        if (response.status === 200 || response.status === 201) {
            editProductFormData.value.id = Number(response.data[0].id);
            editProductFormData.value.productName = String(response.data[0].productName);
            editProductFormData.value.quantity = parseInt(response.data[0].quantity);
            editProductFormData.value.price = parseFloat(response.data[0].price);
            showAlertsandResetafterTimeout("Se ha cargado la información del producto.", "success");
        }
        console.log("Se ha cargado la información del producto");
    } catch(exception: any){
        if (exception.error || exception.status || exception.name === "AxiosError") {
            let error_message:string = "";
            switch (exception.error) {
                case "ValidationError":
                error_message = "Los datos ingresados son incorrectos.";
                console.log("Mensaje de error en Componente: " + error_message);
                //throw new Error(error_message);
                break;
                case "ApplicationError":
                error_message = "Ocurrió un error durante el proceso.";
                console.log("Mensaje de error en Componente: " + error_message);
                //throw new Error(error_message);
                break;
                default:
                console.log("Mensaje de error en Componente: " + "La causa es desconocida");
                break;
            }
            showAlertsandResetafterTimeout(error_message, "error");
        }
    }
}

const submitEditProductForm = async (productData: any) => {
    try {
        const response = await productStore.updateProduct(productData);
        if (response.status === 200 || response.status === 201) {
            isResponseSuccess.value = true;
            console.log("Respuesta desde el componente: ");
            console.log(JSON.stringify(response));
            showAlertsandResetafterTimeout(response.message, "success");
            alert(response.message);
            resetCurrentForm();
            router.push({ name: "Productos.list" });
        }
        console.log("Exito");
    } catch(exception: any){
        if (exception.error || exception.status || exception.name === "AxiosError") {
            let error_message:string = "";
            switch (exception.error) {
                case "ValidationError":
                error_message = "Los datos ingresados son incorrectos.";
                console.log("Mensaje de error en Componente: " + error_message);
                //throw new Error(error_message);
                break;
                case "ApplicationError":
                error_message = "Ocurrió un error durante el proceso.";
                console.log("Mensaje de error en Componente: " + error_message);
                //throw new Error(error_message);
                break;
                default:
                console.log("Mensaje de error en Componente: " + "La causa es desconocida");
                break;
            }
            showAlertsandResetafterTimeout(error_message, "error");
        }
    }
};

</script>

<template>
    <div class="container">
        <div class="row mt-4">
            <h2>Editar producto</h2>
        </div>
        <div class="row mt-4">
            <div class="col-lg-3">
            </div>
            <div class="col-lg-6">
                <div class="mt-4 flex col-md-12" v-if=" error_message.state == 'error' ">
                    <div class="alert alert-danger" role="alert">{{ error_message.message ?? "" }}</div>
                </div>
                <div class="mt-4 flex col-md-12" v-if=" error_message.state == 'success' ">
                    <div class="alert alert-success" role="alert">{{ error_message.message ?? "" }}</div>
                </div>
                <div>
                    <Form @submit="submitEditProductForm(editProductFormData)" ref="form" @change="checkifFormChanged">
                        <fieldset>
                            <div class="col-sm-12">
                                <label for="id" class="form-label mt-4">ID del producto</label>
                                <Field
                                class="form-control" 
                                v-model="editProductFormData.id" 
                                :class="validateProductEditFormData.id"  
                                name="id" 
                                placeholder="<ID>" disabled readonly />
                                <ErrorMessage class="invalid-feedback" name="id" />
                            </div>
                            <div class="col-sm-12">
                                <label for="productName" class="form-label mt-4">Nombre del producto</label>
                                <Field type="text" 
                                    class="form-control" 
                                    v-model="editProductFormData.productName" 
                                    :class="validateProductEditFormData.productName"  
                                    name="productName" :rules="isRequiredProductName"  
                                    placeholder="<Nombre del producto>" />
                                <ErrorMessage class="invalid-feedback" name="productName" />
                            </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="quantity" class="form-label mt-4">Cantidad (disponible en existencia)</label>
                                <Field class="form-control" 
                                v-model="editProductFormData.quantity" 
                                :class="validateProductEditFormData.quantity"  
                                name="quantity" :rules="isRequiredQuantity" 
                                placeholder="Cantidad disponible" />
                                <ErrorMessage class="invalid-feedback" name="quantity" />
                            </div>
                            <div class="col-sm-6">
                                <label for="price" class="form-label mt-4">Precio (L.)</label>
                                <Field class="form-control" 
                                v-model="editProductFormData.price" 
                                :class="validateProductEditFormData.price"  
                                name="price" 
                                :rules="isRequiredPrice"
                                placeholder="<Precio del producto>" />
                                <ErrorMessage class="invalid-feedback" name="price" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4"></div>
                            <div class="col-sm-4">
                                <label for="price" class="form-label mt-4">Total (L.)</label>
                                <Field type="number" 
                                class="form-control" 
                                v-model="totalPrice"
                                name="total" 
                                placeholder="<Campo calculado>" 
                                    readonly />
                                </div>
                            <div class="col-sm-4"></div>
                        </div>
                            <div class="mt-4 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </fieldset>
                    </Form>
                </div>
            </div>
            <div class="col-lg-3">
            </div>
        </div>
    </div>
</template>