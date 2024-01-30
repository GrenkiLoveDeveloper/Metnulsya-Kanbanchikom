<template>
  <main>
    <Navigation />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
</script>

<style>
main {
  background-color: #1b1b1e;
}
</style>
