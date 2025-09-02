<template>
    <q-item clickable class="text-grey-9">
        <q-item-section avatar>
            <q-icon :name="iconName" :color="iconColor"></q-icon>
        </q-item-section>
        <q-item-section>
            <q-item-label :class="labelClass">{{ label }}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
export interface NavDropdownItem {
    iconName: string,
    iconColor?: string,
    label: string,
    labelClass?: string,
}

withDefaults(defineProps<NavDropdownItem>(), {
    iconColor: '',
    labelClass: ''
})
</script>