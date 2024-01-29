// store.ts
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "canban",
  state: () => ({
    stages: [] as Array<{
      id: string;
      name: string;
      tasks: Array<{ id: string; text: string; description: string }>;
    }>,
  }),
  actions: {
    /**
     * Добавляет новую стадию
     *
     * @param name
     */
    addStage(name: string) {
      const newStage = {
        id: Date.now().toString(),
        name,
        tasks: [],
      };
      this.stages.push(newStage);
    },

    /**
     * Удаляет стадию
     *
     * @param stageId
     */
    deleteStage(stageId: string) {
      const stageIndex = this.stages.findIndex((stage) => stage.id === stageId);
      if (stageIndex !== -1) {
        this.stages.splice(stageIndex, 1);
      }
    },

    /**
     * Добавляет новую задачу в стадию
     *
     * @param stageId
     * @param text
     */
    addTask(stageId: string, text: string, description: string) {
      const stage = this.stages.find((stage) => stage.id === stageId);
      if (stage) {
        const newTask = {
          id: Date.now().toString(),
          text,
          description,
        };
        stage.tasks.push(newTask);
      }
    },

    /**
     * Удаляет задачу из стадии
     *
     * @param stageId
     * @param taskId
     */
    deleteTask(stageId: string, taskId: string) {
      const stage = this.stages.find((stage) => stage.id === stageId);
      if (stage) {
        stage.tasks = stage.tasks.filter((task) => task.id !== taskId);
      }
    },

    /**
     * Перемещает задачу в другую стадию
     *
     * @param taskId
     * @param newStageId
     */
    moveTask(taskId: string, newStageId: string) {
      let task = null;
      this.stages.forEach((stage) => {
        const taskIndex = stage.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          task = stage.tasks.splice(taskIndex, 1)[0];
        }
      });

      if (task) {
        const stage = this.stages.find((stage) => stage.id === newStageId);
        if (stage) {
          stage.tasks.push(task);
        }
      }
    },
  },
});
