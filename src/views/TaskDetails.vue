<template>
  <div
    class="p-6 bg-gray-800 rounded shadow-md flex flex-col items-center justify-center task-detail"
  >
    <h1 class="text-2xl font-bold mb-4 text-white text-center">Task Details</h1>
    <div v-if="isUpdated" class="mt-4 p-2 bg-green-500 text-white rounded">
      Task has been updated!
    </div>
    <p class="mb-2 text-white text-center">
      <span class="font-semibold">Current ID:</span> {{ currentId }}
    </p>
    <div class="mb-2 text-white text-center">
      <span class="font-semibold">Task Name:</span>
      <EInput v-model="text" class="input" />
    </div>
    <div class="text-white text-center">
      <span class="font-semibold">Description:</span>
      <EInput v-model="description" class="input" />
    </div>
    <EButton @click="updateTask" class="btn">Update Task</EButton>
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

import { ref, onMounted, Ref, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store/canban";

const EButton = defineAsyncComponent(
  () => import("@/components/ui/buttons/ButtonElem.vue")
);
const EInput = defineAsyncComponent(
  () => import("@/components/ui/Inputs/InputElem.vue")
);

const route = useRoute();
const store = useStore();
let currentId: Ref<string | string[]> = ref("");

let description = ref("");
let text = ref("");
const isUpdated = ref(false);

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

const updateTask = () => {
  store.updateTask({
    id: currentId.value,
    text: text.value,
    description: description.value,
  });
  isUpdated.value = true;

  setTimeout(() => {
    isUpdated.value = false;
  }, 3000);
};
</script>

<style scoped>
.task-detail {
  background-color: #1b1b1e;
  min-height: 100vh;
}
</style>
