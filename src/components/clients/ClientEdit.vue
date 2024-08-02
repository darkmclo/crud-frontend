<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { vMaska } from "maska/vue"
//import { useField, useForm } from 'vee-validate';
//import * as yup from 'yup';

import { useClientStore } from "../../stores/clients";

const router = useRouter();
const clientStore = useClientStore();

const isResponseSuccess = ref<boolean>(false);

const props = defineProps({
  id: String
});

onMounted(async () => {
    getClientInfo(parseInt(props.id!));
    resetClientFormValidations();
})
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

//Data
const editClientFormData = ref({
  id: 0,
  name: "",
  rtn: "",
  addr: ""
});

const validateClientFormData = ref<validateClientFormDataType>({
  id: "",
  name: "",
  rtn: "",
  addr: ""
});

interface validateClientFormDataType {
  id: string;
  name: string;
  rtn: string;
  addr: string;
}

const resetClientFormValidations = () => {
  for (const key in validateClientFormData.value) {
    //delete validateContactFormData.value[key as keyof validateContactFormDataType]
    validateClientFormData.value[key as keyof validateClientFormDataType] = ""
  }
};

const form = ref<HTMLFormElement>(null!);

const isResetted = ref(false);
const disableInputsduringLoading = ref(false);

const resetCurrentForm = () => {
  form.value.resetForm();
  resetClientFormValidations();
  disableInputsduringLoading.value = true;
  isResetted.value = true;
};

const checkifFormChanged = () => {
  if (form.value.meta.dirty === true) {
    isResetted.value = false;
  }
};

const isRequiredName:any = (value: any) => {
  const regex = /^[\s\S]{2,60}$/i;
  if (!isResetted.value) {
    if (!value) {
      validateClientFormData.value.name = "is-invalid";
      return "Este campo es requerido.";
    }
    if (!regex.test(value)) {
      validateClientFormData.value.name = "is-invalid";
      return "Este campo debe tener entre 2 y 60 carácteres.";
    } 
    else if(regex.test(value)) {
      validateClientFormData.value.name = "is-valid";
      return true;
    }
    validateClientFormData.value.name = "";
    return true;
  }
};

const isRequiredRTN:any = (value: any) => {
    const regex = /^\d{4}-\d{4}-\d{5}$/i;
  if (!isResetted.value) {
    if (!value) {
      validateClientFormData.value.rtn = "is-invalid";
      return "Este campo es requerido.";
    }
    if (!regex.test(value)) {
      validateClientFormData.value.rtn = "is-invalid";
      return "Este campo debe contener un RTN con formato válido.";
    } 
    else if(regex.test(value)) {
      validateClientFormData.value.rtn = "is-valid";
      return true;
    }
    validateClientFormData.value.rtn = "";
    return true;
  }
};

const isRequiredAddress:any = (value: any) => {
  const regex = /^[\s\S]{10,100}$/i;
  if (!isResetted.value) {
    if (!value) {
      validateClientFormData.value.addr = "is-invalid";
      return "Este campo es requerido.";
    }
    if (!regex.test(value)) {
      validateClientFormData.value.addr = "is-invalid";
      return "Este campo debe tener entre 10 y 100 carácteres.";
    } 
    else if(regex.test(value)) {
      validateClientFormData.value.addr = "is-valid";
      return true;
    }
    validateClientFormData.value.addr = "";
    return true;
  }
};



const getClientInfo = async (selected_id: number) => {
    try {
        const response = await clientStore.getClientbyId(selected_id);
        console.log(JSON.stringify(response));
        const flag = 1;
        if (flag == 1) {
            editClientFormData.value.id = Number(response.data.id);
            editClientFormData.value.name = String(response.data.name);
            editClientFormData.value.rtn = String(response.data.rtn);
            editClientFormData.value.addr = String(response.data.addr);
            showAlertsandResetafterTimeout("Se ha cargado la información del cliente.", "success");
        }
        console.log("Se ha cargado la información del cliente");
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

const submitEditProductForm = async (client_Data: any) => {
    try {
        const response = await clientStore.updateClient(client_Data);
        if (response.status === 200 || response.status === 201) {
            isResponseSuccess.value = true;
            console.log("Respuesta desde el componente: ");
            console.log(JSON.stringify(response));
            showAlertsandResetafterTimeout(response.message, "success");
            alert(response.message);
            resetCurrentForm();
            router.push({ name: "Clientes.list" });
        }
        console.log("Exito");
    } catch(exception: any){
        if (exception.error || exception.status || exception.name === "AxiosError") {
            let error_message:string = "";
            switch (exception.error) {
                case "ValidationError":
                error_message = "Los datos ingresados son incorrectos.";
                console.log("Mensaje de error en Componente: " + error_message);
                break;
                case "ApplicationError":
                error_message = "Ocurrió un error durante el proceso.";
                console.log("Mensaje de error en Componente: " + error_message);
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
        <h2>Editar información del cliente</h2>
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
              <Form @submit="submitEditProductForm(editClientFormData)" ref="form" @change="checkifFormChanged">
                <fieldset>
                  <legend></legend>
                  <div class="col-sm-12">
                    <label for="name" class="form-label mt-4">Nombre del cliente:</label>
                    <Field type="text" 
                      class="form-control" 
                      v-model="editClientFormData.name" 
                      :class="validateClientFormData.name"  
                      name="name" :rules="isRequiredName"  
                      placeholder="<Nombre completo>" 
                      :disabled="disableInputsduringLoading === true" />
                    <ErrorMessage class="invalid-feedback" name="name" />
                  </div>
                  <div class="col-sm-12">
                    <label for="rtn" class="form-label mt-4">RTN:</label>
                    <Field
                      class="form-control" 
                      v-model="editClientFormData.rtn" 
                      :class="validateClientFormData.rtn"  
                      name="rtn" :rules="isRequiredRTN"  
                      v-maska="'####-####-#####'"
                      placeholder="0000-0000-00000" 
                      :disabled="disableInputsduringLoading === true" />
                    <ErrorMessage class="invalid-feedback" name="rtn" />
                  </div>
                  <div class="col-sm-12">
                    <label for="addr" class="form-label mt-4">Dirección:</label>
                    <Field
                      class="form-control" 
                      v-model="editClientFormData.addr" 
                      :class="validateClientFormData.addr"  
                      name="addr" :rules="isRequiredAddress"  
                      placeholder="Casa, Col/Residencial, Ciudad, Dpto." 
                      :disabled="disableInputsduringLoading === true" />
                    <ErrorMessage class="invalid-feedback" name="addr" />
                  </div>
                  <div class="mt-4 text-center">
                    <button type="submit" class="btn btn-primary" :disabled="disableInputsduringLoading === true">Guardar</button>
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