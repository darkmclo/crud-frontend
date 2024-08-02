<script setup lang="ts">
import { ref } from "vue";
import ButtonGroupMenu from '../components/reusables/ButtonGroupMenu.vue'

const selectedMode = ref('view');

const setModeChange = (modeSel: string = "view") => { 
    selectedMode.value = modeSel;
};

</script>

<template>
  <main>
    <ButtonGroupMenu :activeModeSelected="selectedMode" @activeModeSwitched="setModeChange" />
    
    <router-view />
  </main>
</template>