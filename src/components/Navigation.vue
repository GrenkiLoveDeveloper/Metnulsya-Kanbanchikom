<template>
  <nav class="bg-gray-800 p-6">
    <router-link
      :class="{ 'text-white': $route.path !== '/' }"
      class="hover:text-gray-300 mx-2"
      to="/"
      >Главная</router-link
    >
    <router-link
      :class="{ 'text-white': $route.path !== '/chart' }"
      class="hover:text-gray-300 mx-2"
      to="/chart"
      >Диаграмма</router-link
    >
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
