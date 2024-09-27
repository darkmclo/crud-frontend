<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
//import { Bar } from 'vue-chartjs';
//import ChartMain from "../charts/ChartMain.vue";

import { useProductStore } from "../../stores/products";
import router from "@/router";

const productStore = useProductStore();

onMounted(() => {
    fetchProducts();
});

const fetchProducts = async () => {
    try {
        await productStore.getAllProducts().then((res: any) => {
            ProductData.value = res.map((item: any) => item);
        });
    } catch (error) {
        console.error("Error buscando la información de los productos:", error);
    }
}

const reactiveChartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
        data: [40, 39, 10, 40, 39, 80, 40],
        },
    ],
});

const productNameArray: any = ref();

/*
const passProductDatatoCharts = () => {
productNameArray.value = ProductDataTop10Sort.value.map((obj: any) => obj.productName);
console.log((productNameArray.value));
//return productNameArray;
}
*/


const ProductData: any = ref([]);

const ProductDataTop10Sort: any = computed(() => {
    return (ProductData.value).slice(0,10).sort(function(a: any, b: any) {
        return b.count - a.count;
    });
});

/*
watch(
() => ProductDataTop10Sort.value,
(value) => {
console.log(JSON.parse(value));
}
)
*/

const ProductDataQuantityTotal: any = computed(() => {
    return (ProductData.value).reduce((acc: any, ite: any) => {
        return acc + parseInt(ite.quantity);
    }, 0);
});
const ProductDataPriceTotal: any = computed(() => {
    return (ProductData.value).reduce((acc: any, ite: any) => {
        return acc + Number(ite.price);
    }, 0).toFixed(2);
});
const ProductDataGrandTotal: any = computed(() => {
    return ( (ProductData.value).reduce((acc: any, ite: any) => {
        return acc + (parseInt(ite.quantity) * Number(ite.price));
    }, 0) ).toFixed(2);
});

const ProductDataTotals: any = ref({
    quantityTotal: ProductDataQuantityTotal,
    priceTotal: ProductDataPriceTotal,
    grandTotal: ProductDataGrandTotal
});

const deletedSelectedProduct = async (id: number) => {
    try {
        const response = await productStore.deleteProduct(id);
        if (response.status === 200 || response.status === 201) {
            console.log("Respuesta desde el componente: ");
            console.log(JSON.stringify(response));
            alert(response.message);
            await fetchProducts();
            //router.push({ name: "Productos.list" });
        }
        console.log("Eliminación exitosa.");
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
        }
        //console.log(exception);
    }
}

const gotoEditProduct = (selected_id: number) => {
    router.push({ name: "Productos.edit", params: {id: selected_id} });
}

</script>

<template>
    <div class="container">
        <div class="row mt-4">
            <h2>Lista de Productos</h2>
        </div>
        <div class="row mt-4">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <!--ChartMain :reactiveData="reactiveChartData" /-->
            </div>
            <div class="col-sm-4"></div>
        </div>
        <div class="row mt-4">
            <div class="col-sm"></div>
            <div class="col-sm-10 table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad (existencia)</th>
                            <th scope="col">Precio (Unitario)</th>
                            <th scope="col">Total (!)</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in ProductData" :key="product.id">
                            <th scope="row">{{ product.id }}</th>
                            <th scope="row">{{ product.productName }}</th>
                            <td>{{ (product.quantity) ? (product.quantity).toFixed(0) : "--" }}</td>
                            <td>L. {{ (product.price) ? (product.price).toFixed(2) : "--" }}</td>
                            <td>L. {{ Number(product.quantity) * Number(product.price) }}</td>
                            <td>
                                <div class="row">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-outline-primary"
                                        @click.prevent="gotoEditProduct(product.id)"
                                        >Editar</button>
                                        <button type="button" class="btn btn-outline-danger"
                                        @click.prevent="deletedSelectedProduct(product.id)"
                                        >Borrar</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="table-dark">
                            <th scope="row">----</th>
                            <th scope="row">TOTALES:</th>
                            <td>{{ ProductDataTotals.quantityTotal }}</td>
                            <td>L. {{ (ProductDataTotals.priceTotal) }}</td>
                            <td>L. {{ (ProductDataTotals.grandTotal) }}</td>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm"></div>
        </div>
        
    </div>
</template>