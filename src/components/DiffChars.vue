<template>
  <div class="text-diff text-diff-chars">
    <span
      v-for="(part, index) in diff"
      :key="index"
      :class="{
        'diff-added': part.added,
        'diff-removed': part.removed,
      }"
      v-text="part.value"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { diffChars } from 'diff';
import type { Change } from 'diff';

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

const diff = computed<Change[]>(() => {
  return diffChars(props.oldText, props.newText, props.options);
});
</script>

<style scoped>
.text-diff {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.diff-added {
  background-color: var(--text-diff-added-bg, #ddfbe6);
  color: var(--text-diff-added-color, #008000);
}

.diff-removed {
  background-color: var(--text-diff-removed-bg, #fce9e9);
  color: var(--text-diff-removed-color, #c70000);
  text-decoration: var(--text-diff-removed-decoration, line-through);
}
</style> 