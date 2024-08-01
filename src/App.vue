<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import SiteHeader from './components/sections/SiteHeader.vue'

import { useServerStore } from "./stores/server";

const serverStore = useServerStore();

const checkServerHealth = async () => {
  try {
    const res = await serverStore.checkServerStatus();
    console.log("Estado del servidor: " + res);
  } catch(error: any){
    console.log("Error: " + error);
  }
};

onMounted(() => {
  checkServerHealth();
  //checkInterval = setInterval(checkServerHealth, 5000);
})

</script>

<template>
  <SiteHeader />
  <RouterView />
</template>

<style>

</style>