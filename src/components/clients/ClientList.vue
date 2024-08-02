<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useClientStore } from "../../stores/clients";
import { useRouter } from "vue-router";

const router = useRouter();

const clientStore = useClientStore();

onMounted(() => {
    fetchClients();
});

const fetchClients = async () => {
    try {
        await clientStore.getAllClients().then((res: any) => {
            ClientData.value = res.map((item: any) => item);
        });
    } catch (error) {
        console.error("Error encontrando la información de los clientes:", error);
    }
}

const ClientData: any = ref([]);

const deletedSelectedClient = async (id: number) => {
    try {
        const response = await clientStore.deleteClient(id);
        if (response.status === 200 || response.status === 201) {
            console.log("Respuesta desde el componente: ");
            console.log(JSON.stringify(response));
            alert(response.message);
            await fetchClients();
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
    }
}

const gotoEditClient = (selected_id: number) => {
    router.push({ name: "Clientes.edit", params: {id: selected_id} });
}

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
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="client in ClientData" :key="client.id">
                            <th scope="row">{{ client.id }}</th>
                            <td>{{ client.name }}</td>
                            <td>{{ client.rtn }}</td>
                            <td>{{ client.addr }}</td>
                            <td>
                                <div class="row">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-outline-primary"
                                        @click.prevent="gotoEditClient(client.id)"
                                        >Editar</button>
                                        <button type="button" class="btn btn-outline-danger"
                                        @click.prevent="deletedSelectedClient(client.id)"
                                        >Borrar</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm"></div>
        </div>
    </div>
</template>