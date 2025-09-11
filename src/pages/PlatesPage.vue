<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row q-gutter-x-md">
          <page-heading heading="PSM Plates"/>
          <q-btn size="sm" v-if="!isScreenLtSm" @click="showDialog = true" round outline color="primary" icon="add">
            <q-tooltip :offset="[0, 8]" :delay="500">Register New Plates</q-tooltip>
          </q-btn>
        </div>
        <q-separator spaced/>
        <q-page-sticky v-if="isScreenLtSm" position="bottom-right" :offset="[18, 18]">
          <q-btn size="lg" round outline color="primary" icon="add" @click="showDialog = true"/>
        </q-page-sticky>
      </q-card-section>
    </q-card>
  </q-page>

  <register-plate-dialog
    :is-open="showDialog"
    @cancel="showDialog = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useScreen } from 'src/composables/screen';
import RegisterPlateDialog from 'src/components/plates/RegisterPlateDialog.vue';
import PageHeading from 'src/components/PageHeading.vue';

const { isScreenLtSm } = useScreen();

const showDialog = ref(false);
</script>
