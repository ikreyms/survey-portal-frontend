<template>
  <div class="text-h6">{{ heading }}</div>
  <div v-if="caption" class="text-caption">{{ caption }}</div>
</template>

<script setup lang="ts">
export interface ModalHeadingProps {
  heading: string;
  caption?: string;
}

defineProps<ModalHeadingProps>();

</script>
