<script setup lang="ts">
import { Ref, ref, toRef, computed, defineEmits, onUpdated } from "vue";
import { useRoute, useRouter } from 'vue-router';

/*
const props = defineProps<{
    mode: string; //view, new, edit
}>();
*/

onUpdated(() => {
    switchActiveMode(String(activeMode.value));
});

const props = defineProps(['activeModeSelected']); //view, new, edit
const emit = defineEmits(['activeModeSwitched']);

const activeMode = toRef(props, 'activeModeSelected');
//const activeMode: string = ref(props.mode);

const route = useRoute();
const router = useRouter();
const currentRouteName = computed(() => (route.matched[0].name));
//const currentRouteName = computed(() => route.name);

function goTo(sublink: string) {
    //console.log('Dir: ' + currentRoutePath.value);
    router.push( { name: `${String(currentRouteName.value)}.${sublink}` } );
    switchActiveMode(sublink);
}

const switchActiveMode = (mode: string) => {
    switch (mode) {
        case 'list':
            emit('activeModeSwitched','view');
            break;
        case 'add':
            emit('activeModeSwitched','new');
            break;
        case 'edit':
            emit('activeModeSwitched','edit');
            break;
        default:
            break;
    }
}
</script>

<template>
    <div class="container mt-4 text-center">
        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" @click="goTo('list')" class="btn btn-outline-primary" v-bind:class = " (activeMode == 'view') ? 'active' : '' ">Listado</button>
            <button type="button" @click="goTo('add')" class="btn btn-outline-primary" v-bind:class = " (activeMode == 'new') ? 'active' : '' ">Agregar nuevo</button>
            <!--
            <button type="button" @click="goTo('edit')" class="btn btn-outline-primary" v-bind:class = " (activeMode == 'edit') ? 'active' : '' ">Editar</button>
            -->
        </div>
    </div>
</template>