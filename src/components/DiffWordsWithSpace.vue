<template>
  <div class="text-diff text-diff-words-with-space">
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
import { diffWordsWithSpace } from 'diff';
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
  return diffWordsWithSpace(props.oldText, props.newText, props.options);
});
</script> 