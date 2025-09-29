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
  // Merge user options with custom markers to match other diff components
  const customOptions = {
    markers: {
      insert: {
        start: '<span class="diff-added">',
        end: '</span>',
      },
      delete: {
        start: '<span class="diff-removed">',
        end: '</span>',
      },
      modify: {
        start: '<span class="diff-added">',
        end: '</span>',
      },
      replaceDelete: {
        start: '<span class="diff-removed">',
        end: '</span>',
      },
      replaceInsert: {
        start: '<span class="diff-added">',
        end: '</span>',
      },
    },
    ...props.options
  };

  return diff(props.oldText, props.newText, customOptions);
});
</script>