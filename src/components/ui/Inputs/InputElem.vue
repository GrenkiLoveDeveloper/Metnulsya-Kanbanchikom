<template>
  <input
    :type="type"
    :name="name"
    :id="id"
    v-bind="$attrs"
    :value="modelValue"
    @input="($event: Event) => $emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="p-2 rounded mb-2 bg-gray-600 text-white block"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    name?: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    modelValue: string;
  }>(),
  {
    type: "text",
    required: false,
  }
);

const { name, type, id, placeholder, required, modelValue } = toRefs(props);
</script>

<style scoped></style>
