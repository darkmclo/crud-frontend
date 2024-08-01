<script setup lang="ts">
import { onMounted, onUpdated, Ref, ref, computed } from "vue";
import { useClientStore } from "../../stores/clients";

const clientStore = useClientStore();

onMounted(() => {
    fetchClients();
});

/*
onUpdated(() => {
    fetchProducts();
});
*/

const fetchClients = async () => {
    try {
        await clientStore.getAllClients().then((res: any) => {
            ClientData.value = res.map((item: any) => item);
        });
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

const ClientData: any = ref([]);

</script>

<template>
    <div class="container">
        <div class="row mt-4">
            <h2>Lista de Clientes</h2>
        </div>
        <div class="row mt-4">
            <div class="col-sm"></div>
            <div class="col-sm-10 table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">RTN</th>
                            <th scope="col">Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="client in ClientData" :key="client.id">
                            <th scope="row">{{ client.id }}</th>
                            <td>{{ client.name }}</td>
                            <td>{{ client.rtn }}</td>
                            <td>{{ client.addr }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm"></div>
        </div>
    </div>
</template>