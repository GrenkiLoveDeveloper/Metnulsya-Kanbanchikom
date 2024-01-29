<template>
  <div class="w-full mx-auto p-4 bg-gray-800 text-white">
    <div class="max-w-screen-2xl mx-auto overflow-auto">
      <h1 class="text-2xl mb-4">Супер канБан доска</h1>

      <div class="flex space-x-4 m-2">
        <e-input
          placeholder="Название стадии"
          type="text"
          v-model="newStageName"
          required
        />
        <e-button
          :color="'blue'"
          :disabled="newStageName.length < 1"
          @click="addStage(newStageName)"
        >
          Добавить стадию
        </e-button>
      </div>

      <div class="flex space-x-4">
        <Stage v-for="stage in stages" :key="stage.id" :stage="stage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, nextTick } from "vue";
import { useStore } from "@/store/canban";
import Stage from "@/components/Stage.vue";
const EButton = defineAsyncComponent(
  () => import("@/components/ui/buttons/ButtonElem.vue")
);
const EInput = defineAsyncComponent(
  () => import("@/components/ui/Inputs/InputElem.vue")
);

const store = useStore();
const stages = store.stages;

const newStageName = ref("");

const addStage = async (name: string) => {
  store.addStage(name);
  await nextTick();
  newStageName.value = "";
};
</script>

<style scoped>
.w-full {
  background-color: #2d3748;
  min-height: 100vh;
}
</style>
