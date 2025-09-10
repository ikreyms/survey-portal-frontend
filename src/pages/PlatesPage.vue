<template>
  <q-page padding>
    <div class="row q-gutter-x-md">
      <div class="text-h4">PSM Plates</div>
      <q-btn v-if="!isScreenLtMd" @click="showDialog = true" round outline color="primary" icon="add">
        <q-tooltip :offset="[0, 8]" :delay="500">Register New Plates</q-tooltip>
      </q-btn>
    </div>
    <q-separator spaced/>
    <q-page-sticky v-if="isScreenLtMd" position="bottom-right" :offset="[18, 18]">
      <!-- <q-btn size="lg" round outline color="primary" icon="add" @click="showDialog = true"/> -->
      <q-btn size="lg" round outline color="primary" icon="add" @click="showDialog = true"/>
    </q-page-sticky>
  </q-page>

  <register-plate-dialog
    :is-open="showDialog"
    @cancel="showDialog = false"
  />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import RegisterPlateDialog from 'src/components/plates/RegisterPlateDialog.vue';
import { ref, computed } from 'vue';

const q = useQuasar();

const showDialog = ref(false);

const isScreenLtMd = computed(() => q.screen.lt.sm)

</script>
