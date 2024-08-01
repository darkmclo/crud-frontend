<script setup lang="ts">
import { ref, computed } from "vue";
import ButtonGroupMenu from '../components/reusables/ButtonGroupMenu.vue'
import { useRoute } from 'vue-router';

const selectedMode = ref('view');

const setModeChange = (modeSel: string) => { 
    selectedMode.value = modeSel;
};  

/*
//Obtener ruta actual
const route = useRoute();
const currentRouteName = computed(() => route.name);
*/

</script>

<template>
  <main>
    <ButtonGroupMenu :activeModeSelected="selectedMode" @activeModeSwitched="setModeChange" />
    
    <router-view />
  </main>
</template>