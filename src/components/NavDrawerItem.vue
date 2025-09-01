<template>
  <q-item v-bind="$attrs" :to="to" clickable class="text-grey-9" exact-active-class="bg-grey-3 text-grey-10">
    <q-item-section avatar>
      <q-icon :name="iconName"></q-icon>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface NavDrawerItemProps {
  to: string
  iconName: string,
  label: string
}
defineProps<NavDrawerItemProps>()
</script>
