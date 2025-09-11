<template>
  <div class="text-h5">{{ heading }}</div>
</template>

<script setup lang="ts">
export interface PageHeadingProps {
  heading: string;
}

defineProps<PageHeadingProps>();

</script>
