<template>
  <div
    class="p-6 bg-gray-800 rounded shadow-md flex flex-col items-center justify-center"
  >
    <h1 class="text-2xl font-bold mb-4 text-white text-center">Task Details</h1>
    <p class="mb-2 text-white text-center">
      <span class="font-semibold">Current ID:</span> {{ currentId }}
    </p>
    <p class="mb-2 text-white text-center">
      <span class="font-semibold">Task Name:</span> {{ text }}
    </p>
    <p class="text-white text-center">
      <span class="font-semibold">Description:</span> {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: string;
  text: string;
  description: string;
}
interface Stage {
  id: string;
  name: string;
  tasks: Task[];
}

import { ref, onMounted, Ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store/canban";

const route = useRoute();
const store = useStore();
let currentId: Ref<string | string[]> = ref("");
let description = ref("");
let text = ref("");

onMounted(() => {
  currentId.value = route.params.id;
  const id = currentId.value;

  const task = store.stages
    .map((stage: Stage) => stage.tasks)
    .reduce((acc: Task[], curr: Task[]) => acc.concat(curr), [])
    .find((task: Task) => task.id === id);

  if (task) {
    description.value = task.description;
    text.value = task.text;
  }
});
</script>

<style scoped></style>
