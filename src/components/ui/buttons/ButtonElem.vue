<template>
  <button
    :type="type"
    :id="id"
    :class="btnClasses"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <svg
      v-if="template == 'close'"
      aria-hidden="true"
      class="w-3 h-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
type ButtonType = "button" | "submit" | "reset";
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    type?: ButtonType;
    id?: string;
    color?: string;
    size?: string;
    template?: string;
    outline?: boolean;
    icon?: boolean;
  }>(),
  {
    type: "button",
    color: "blue",
    size: "md",
  }
);

const generateColorClasses = (color: string, outline: boolean) => {
  const baseClasses = `
    text-white bg-gradient-to-r from-${color}-500 via-${color}-600 to-${color}-700 hover:bg-gradient-to-br
    focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 shadow-lg
    shadow-${color}-500/50 dark:shadow-lg dark:shadow-${color}-800/80 rounded-lg`;

  const outlineClasses = `border-${color}-600 bg-white text-${color}-600 hover:bg-${color}-600 hover:border-${color}-600 hover:text-white`;

  return outline ? outlineClasses : baseClasses;
};

const colorClasses = computed(() =>
  generateColorClasses(props.color, props.outline)
);

const padding = props.icon ? "px-2" : "px-4";

const sizeMappings = {
  sm: `h-6 text-sm ${padding}`,
  md: `h-10 ${padding}`,
  lg: `text-lg h-12 ${padding}`,
};

const sizeClasses = computed(
  () => sizeMappings[props.size as keyof typeof sizeMappings] || sizeMappings.md
);

const btnClasses = computed(() => {
  if (props.template == "close") {
    return "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700";
  } else if (props.icon) {
    return "";
  }
  const disabled = props.disabled ? "opacity-75" : "";
  return `${colorClasses.value} ${sizeClasses.value} ${disabled}`;
});
</script>
