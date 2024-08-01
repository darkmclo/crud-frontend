<script setup lang="ts">
import { onMounted, onUpdated, Ref, ref, computed } from "vue";
import { useProductStore } from "../../stores/products";

const productsStore = useProductStore();

onMounted(() => {
    fetchProducts();
});

const fetchProducts = async () => {
    try {
        await productsStore.getAllProducts().then((res: any) => {
            ProductData.value = res.map((item: any) => item);
        });
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

const ProductData: any = ref([]);

const ProductDataQuantityTotal: any = computed(() => {
    return (ProductData.value).reduce((acc, ite) => {
        return acc + parseInt(ite.quantity);
  }, 0);
});
const ProductDataPriceTotal: any = computed(() => {
    return (ProductData.value).reduce((acc, ite) => {
        return acc + Number(ite.price);
  }, 0);
});
const ProductDataGrandTotal: any = computed(() => {
    return ( (ProductData.value).reduce((acc, ite) => {
        return acc + (parseInt(ite.quantity) * Number(ite.price));
  }, 0) ).toFixed(2);
});

const ProductDataTotals: any = ref({
    quantityTotal: ProductDataQuantityTotal,
    priceTotal: ProductDataPriceTotal,
    grandTotal: ProductDataGrandTotal
});

</script>

<template>
    <div class="container">
        <div class="row mt-4">
            <h2>Lista de Productos</h2>
        </div>
        <div class="row mt-4">
            <div class="col-sm"></div>
            <div class="col-sm-10 table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad (existencia)</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Total (?)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in ProductData.slice(0, 4)" :key="product.productName">
                            <th scope="row">{{ product.productName }}</th>
                            <td>{{ (product.quantity).toFixed(0) }}</td>
                            <td>L. {{ (product.price).toFixed(2) }}</td>
                            <td>L. {{ Number(product.quantity) * Number(product.price) }}</td>
                        </tr>
                        <tr class="table-dark">
                            <th scope="row">TOTALES:</th>
                            <td>{{ ProductDataTotals.quantityTotal }}</td>
                            <td>L. {{ ProductDataTotals.priceTotal }}</td>
                            <td>L. {{ ProductDataTotals.grandTotal }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm"></div>
        </div>
    </div>
</template>