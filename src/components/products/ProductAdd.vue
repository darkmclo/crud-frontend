<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Field, Form, ErrorMessage } from 'vee-validate';
//import { useField, useForm } from 'vee-validate';
//import * as yup from 'yup';

import { useProductStore } from "../../stores/products";

const router = useRouter();
const productStore = useProductStore();

const isResponseSuccess = ref<boolean>(false);

import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod';

onMounted(() => {
  resetProductFormValidations();
})

//yup config
/*
const simpleSchema = {
    // If you defined global rules you can also use them
    productName: 'required|min:8',
    // ...
};

configure({
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
});

const complexSchema = yup.object({
  productName: yup.string().required(),
  quantity: yup.number().required().max(1000),
  price: yup.number().required().min(2),
});

const advancedSchema = yup.object().shape({
  productName: yup.string().required().label('Producto'),
  quantity: yup.number().min(5).required().label('Cantidad'),
  price: yup.number().required().min(2).label('Precio')
});
*/
function roundToTwo(num: number) {
    return +(Math.round(num + "e+2")  + "e-2");
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

const addProductFormData = ref({
  //id: "",
  productName: "",
  quantity: 0,
  price: 0.00
});

const totalPrice = computed(() => {
    return roundToTwo(addProductFormData.value.quantity * addProductFormData.value.price)
});

const validateProductFormData = ref<validateProductFormDataType>({
  //id: 0,
  productName: "",
  quantity: "",
  price: ""
});

interface validateProductFormDataType {
  //id: number;
  productName: string;
  quantity: string;
  price: string;
}

const resetProductFormValidations = () => {
  for (const key in validateProductFormData.value) {
    //delete validateContactFormData.value[key as keyof validateContactFormDataType]
    validateProductFormData.value[key as keyof validateProductFormDataType] = ""
  }
};

const form = ref<HTMLFormElement>(null!);

const isResetted = ref(false);
const disableInputsduringLoading = ref(false);

const resetCurrentForm = () => {
  form.value.resetForm();
  resetProductFormValidations();
  disableInputsduringLoading.value = true;
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
      validateProductFormData.value.productName = "is-invalid";
      return "Este campo es requerido.";
    }
    if (!regex.test(value)) {
      validateProductFormData.value.productName = "is-invalid";
      return "Este campo debe tener entre 2 y 60 carácteres.";
    } 
    else if(regex.test(value)) {
      validateProductFormData.value.productName = "is-valid";
      return true;
    }
    validateProductFormData.value.productName = "";
    return true;
  }
};

const isRequiredQuantity:any = (value: any) => {
  const regex = /^\d+(\.\d{1,2})?$/i;
  if (!isResetted.value) {
    if (!value) {
      validateProductFormData.value.quantity = "is-invalid";
      return "Este campo es requerido.";
    }
    if (!regex.test(value)) {
      validateProductFormData.value.quantity = "is-invalid";
      return "Este campo debe contener solo números enteros.";
    } 
    else if(regex.test(value)) {
      validateProductFormData.value.quantity = "is-valid";
      return true;
    }
    validateProductFormData.value.quantity = "";
    return true;
  }
};

const isRequiredPrice:any = (value: any) => {
  const regex = /^\d+(\.\d{1,2})?$/i;
  if (!isResetted.value) {
    if (!value) {
      validateProductFormData.value.price = "is-invalid";
      return "Este campo es requerido.";
    }
    if (!regex.test(value)) {
      validateProductFormData.value.price = "is-invalid";
      return "Este campo debe contener solo números y un máximo de 2 decimales.";
    } 
    else if(regex.test(value)) {
      validateProductFormData.value.price = "is-valid";
      return true;
    }
    validateProductFormData.value.price = "";
    return true;
  }
};

//zod config
/*
const validationSchema = toTypedSchema(
  z.object({
    productName: z.string().min(1, 'Este campo es requerido.' ),
    quantity: z.number().min(1, { message: 'Este campo es requerido' }).max(8, { message: 'Máximo alcanzado' }),
    price: z.number().min(1, { message: 'Este campo es requerido' }).max(100, { message: 'Máximo alcanzado' })
  })
);
*/

/*
const { handleSubmit, errors } = useForm({
  validationSchema,
});
*/

const submitAddProductForm = async (productData: any) => {
    try {
      disableInputsduringLoading.value = true;
      const response = await productStore.saveProduct(productData);
      if (response.status === 200 || response.status === 201) {
        isResponseSuccess.value = true;
        console.log("Respuesta desde el componente: ");
        console.log(JSON.stringify(response));
        disableInputsduringLoading.value = false;

        showAlertsandResetafterTimeout(response.message, "success");
        //alert(response.message);
        resetCurrentForm();
        //router.push({ name: "Productos.list" });
      }
      console.log("Exito");
    } catch(exception: any){
      disableInputsduringLoading.value = false;
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
      //console.log(exception);
    }
    //console.log("Se ingresaron los datos.")
};

/*
const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
*/

</script>

<template>
    <div class="container">
        <div class="row mt-4">
            <h2>Añadir producto nuevo</h2>
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
              <Form @submit="submitAddProductForm(addProductFormData)" ref="form" @change="checkifFormChanged">
                <fieldset>
                  <legend>Por favor, ingrese los datos solicitados.</legend>
                  <div class="col-sm-12">
                    <label for="productName" class="form-label mt-4">Nombre del producto</label>
                    <Field type="text" 
                      class="form-control" 
                      v-model="addProductFormData.productName" 
                      :class="validateProductFormData.productName"  
                      name="productName" :rules="isRequiredProductName"  
                      placeholder="<Nombre del producto>" 
                      :disabled="disableInputsduringLoading === true" />
                    <ErrorMessage class="invalid-feedback" name="productName" />
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <label for="quantity" class="form-label mt-4">Cantidad (disponible en existencia)</label>
                      <Field class="form-control" 
                      v-model="addProductFormData.quantity" 
                      :class="validateProductFormData.quantity"  
                      name="quantity" :rules="isRequiredQuantity" 
                      placeholder="Cantidad disponible" 
                      :disabled="disableInputsduringLoading === true" />
                      <ErrorMessage class="invalid-feedback" name="quantity" />
                    </div>
                    <div class="col-sm-6">
                      <label for="price" class="form-label mt-4">Precio (L.)</label>
                      <Field class="form-control" 
                        v-model="addProductFormData.price" 
                        :class="validateProductFormData.price"  
                        name="price" 
                        :rules="isRequiredPrice"
                        placeholder="<Precio del producto>" 
                        :disabled="disableInputsduringLoading === true" />
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