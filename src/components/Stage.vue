<template>
  <div class="w-64 bg-gray-700 p-2 rounded stages-block flex flex-col">
    <h2 class="text-xl mb-2">{{ stage.name }}</h2>
    <p class="mb-2">Заданий: {{ stage.tasks.length }}</p>

    <e-button
      :size="'sm'"
      class="close-btn"
      template="close"
      @click="deleteStage(stage.id)"
      title="Удалить стадию"
    />

    <draggable
      tag="div"
      class="flex flex-col flex-grow"
      v-model="props.stage.tasks"
      group="tasks"
      @end="updateTaskStage"
      :itemKey="'id'"
    >
      <template #item="{ element }">
        <div class="task-block block mb-2 w-full">
          <a
            class="block w-full"
            href="javascript:void(0)"
            @click="openTaskDetails(element.id)"
            >{{ element.text }}</a
          >
          <e-button
            :size="'sm'"
            class="close-btn"
            template="close"
            @click="deleteTask(stage.id, element.id)"
          />
        </div>
      </template>
    </draggable>

    <div class="mb-2">
      <hr class="mb-2" />

      <div>
        <e-input
          placeholder="Название задачи"
          type="text"
          v-model="newTask"
          required
        />

        <e-input
          placeholder="Описание задачи"
          type="text"
          v-model="taskDescription"
          required
        />

        <e-button
          class="mt-5"
          :color="'green'"
          @click="addTask()"
          :disabled="newTask.length < 1"
        >
          Добавить задачу
        </e-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineAsyncComponent, nextTick } from "vue";
import { useStore } from "@/store/canban";
import { useRouter } from "vue-router";
import { SortableEvent } from "sortablejs";

const draggable = defineAsyncComponent(() => import("vuedraggable"));

const EInput = defineAsyncComponent(
  () => import("@/components/ui/Inputs/InputElem.vue")
);
const EButton = defineAsyncComponent(
  () => import("@/components/ui/buttons/ButtonElem.vue")
);

const store = useStore();
const router = useRouter();

const props = defineProps<{
  stage: {
    id: string;
    name: string;
    tasks: Array<{ id: string; text: string }>;
  };
}>();

let newTask = ref("");
let taskDescription = ref("");

const openTaskDetails = (id: string) => {
  router.push({ name: "TaskDetails", params: { id } });
};

const addTask = async () => {
  if (newTask.value.trim()) {
    store.addTask(props.stage.id, newTask.value, taskDescription.value);
    await nextTick();
    newTask.value = "";
    taskDescription.value = "";
  }
};

const deleteTask = (stageId: string, taskId: string) => {
  store.deleteTask(stageId, taskId);
};

const deleteStage = (stageId: string) => {
  store.deleteStage(stageId);
};

const updateTaskStage = (event: SortableEvent) => {
  const taskId = event.item.id;
  const newStageId = event.to.id;
  store.moveTask(taskId, newStageId);
};
</script>

<style scoped>
.stages-block {
  position: relative;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}
.task-block {
  position: relative;
}
</style>
