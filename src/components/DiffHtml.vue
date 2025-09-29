<template>
  <div class="text-diff text-diff-html" v-html="diffResult"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { diff } from 'diffblazer';

const props = defineProps({
  oldText: {
    type: String,
    required: true,
  },
  newText: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const diffResult = computed<string>(() => {
  return diff(props.oldText, props.newText, props.options);
});
</script>