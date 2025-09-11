<template>
  <q-dialog persistent v-model="isDialogOpen" @hide="onCancel">
    <q-card style="min-width: 300px; width: 1200px;">
      <q-card-section>
        <modal-heading
          heading="Register PSM Plates"
          caption="Register new PSM plates to the system"
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-select
          class="q-mb-lg"
          v-model="format"
          :options="formatsUI"
          label="Plate Number Format"
          option-value="id"
          option-label="name"
        />

        <div class="column q-mb-md">
          <div class="text-subtitle2">Select PSM ranges to register for the chosen format</div>
          <div class="row items-center q-gutter-x-sm text-grey-8">
            <q-icon name="info"></q-icon>
            <div class="text-caption">Bounds are inclusive</div>
          </div>
        </div>

        <div class="column q-gutter-y-md q-mb-md">
          <q-card v-for="range in format?.ranges" :key="range.name" class="q-pa-sm q-pb-lg">
            <div class="row items-center justify-between" :style="{ marginBottom: range.inputType === 'slide' ? '2rem' : '0px' }">
                <q-item tag="label" dense>
                  <q-item-section avatar top>
                    <q-checkbox v-model="range.isSelected"></q-checkbox>
                  </q-item-section>
                  <q-item-section class="justify-start">
                    <q-item-label>{{ `${toTitleCase(range.name)} (${range.defined.min} - ${range.defined.max})` }}</q-item-label>
                    <q-item-label caption class="row items-center" :class="`text-${getColorForAvailableCount(range)}`">
                      <q-badge rounded :color="getColorForAvailableCount(range)" class="q-mr-xs"></q-badge>
                      <span>Available Range: {{ range.available.min }} - {{ range.available.max }}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              <q-btn
                outline
                size="sm"
                color="grey-8"
                class="q-mr-sm"
                :icon="range.inputType === 'slide' ? 'keyboard' : 'tune'"
                dense
                @click="toggleRangeInputType(range)"
              >
                <q-tooltip :delay="600">{{ range.inputType === 'slide' ? 'Switch to Text Input' : 'Switch to Slider' }}</q-tooltip>
              </q-btn>
            </div>
            <div v-if="range.inputType === 'slide'">
              <div class="q-px-md q-mb-sm row items-center">
                <q-range left-label-color="primary" left-thumb-color="primary" right-label-color="info"
                  right-thumb-color="info" :disable="!range.isSelected" v-model="range.selectedRange" :min="range.available.min"
                  :max="range.available.max" label-always />
              </div>
              <div class="q-px-sm row items-center justify-between">
                <q-btn-group outline>
                  <q-btn outline size="xs" :disable="!range.isSelected" color="primary" icon="remove"
                    @click="handleLowerBoundDecrement(range)" />
                  <q-btn outline size="xs" :disable="!range.isSelected" color="primary" icon="add"
                    @click="handleLowerBoundIncrement(range)" />
                </q-btn-group>
                <q-btn-group outline>
                  <q-btn outline size="xs" :disable="!range.isSelected" color="info" icon="remove"
                    @click="handleUpperBoundDecrement(range)" />
                  <q-btn outline size="xs" :disable="!range.isSelected" color="info" icon="add"
                    @click="handleUpperBoundIncrement(range)" />
                </q-btn-group>
              </div>
            </div>
            <div v-else-if="range.inputType === 'text'" class="q-px-sm row items-center q-gutter-x-md">
              <q-input
                class="col"
                type="number"
                :disable="!range.isSelected"
                v-model.number="range.selectedRange.min"
                @update:model-value="validateRange(range)"
                label="Lower Bound"
                :error="!!range.minError"
                :error-message="range.minError || ''"
                />
                <q-input
                class="col"
                type="number"
                :disable="!range.isSelected"
                v-model.number="range.selectedRange.max"
                @update:model-value="validateRange(range)"
                label="Upper Bound"
                :error="!!range.maxError"
                :error-message="range.maxError || ''"
              />
            </div>
          </q-card>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="q-px-md">
        <q-btn flat label="Cancel" color="grey-7" @click="onCancel"/>
        <q-btn flat label="Register" color="primary" @click="register" :disable="!canRegister"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { formats } from './data';
import type { PlateNumberFormatUI, PlateRange, PlateRangeUI } from './RegisterPlateDialog.types';
import { toTitleCase } from 'src/utils/string';
import ModalHeading from '../ModalHeading.vue';

const isDialogOpen = ref(false);
const formatsUI = ref<PlateNumberFormatUI[]>([]);
// defult format is selected onMounted
const format = ref<PlateNumberFormatUI | null>(null);

const canRegister = computed(() => {
  const selected = format.value?.ranges.filter(r => r.isSelected) ?? [];
  if (selected.length === 0) return false;
  return selected.every(r => !r.minError && !r.maxError);
});

const toggleRangeInputType = (range: PlateRangeUI) => {
  range.inputType = range.inputType === 'slide' ? 'text' : 'slide';
}

const handleLowerBoundDecrement = (range: PlateRangeUI) => {
  if (range.selectedRange.min <= range.available.min) return;
  range.selectedRange.min--;
}

const handleLowerBoundIncrement = (range: PlateRangeUI) => {
  if (range.selectedRange.min >= range.available.max) return;
  range.selectedRange.min++;
}

const handleUpperBoundDecrement = (range: PlateRangeUI) => {
  if (range.selectedRange.max <= range.available.min) return;
  range.selectedRange.max--;
}

const handleUpperBoundIncrement = (range: PlateRangeUI) => {
  if (range.selectedRange.max >= range.available.max) return;
  range.selectedRange.max++;
}

const getColorForAvailableCount = (range: PlateRange) => {
  const availableCount = range.available.max - range.available.min + 1;
  if (availableCount > range.thresholds.warning) return 'positive';
  if (availableCount > range.thresholds.critical) return 'warning';
  return 'negative';
}

const validateRange = (range: PlateRangeUI) => {
  if (range.inputType !== 'text') {
    range.minError = null
    range.maxError = null
    return true
  }
  let minError: string | null = null;
  let maxError: string | null = null;

  if (range.selectedRange.min < range.available.min) minError = `Lower bound cannot be below ${range.available.min}`;
  else if (range.selectedRange.min > range.available.max) minError = `Lower bound cannot be above ${range.available.max}`;

  if (range.selectedRange.max < range.available.min) maxError = `Upper bound cannot be below ${range.available.min}`;
  else if (range.selectedRange.max > range.available.max) maxError = `Upper bound cannot be above ${range.available.max}`;

  if (range.selectedRange.min > range.selectedRange.max) minError = maxError = 'Lower bound cannot be above upper bound';

  range.minError = minError;
  range.maxError = maxError;
}

const register = () => {
  if (!canRegister.value) return;
  const selectedRanges: PlateRange[] = [];
  format.value?.ranges.forEach(r => {
    if (r.isSelected) {
      const { isSelected, inputType, minError, maxError, ...cleanRange } = r;
      void isSelected;
      void inputType;
      void minError;
      void maxError;
      selectedRanges.push(cleanRange);
    }
  })

  console.log('Registering ranges:', selectedRanges);
}

const emits = defineEmits(['cancel']);

const onCancel = () => {
  isDialogOpen.value = false;
  emits('cancel');
}

export interface RegisterPlateDialogProps {
  isOpen: boolean
}

const props = withDefaults(defineProps<RegisterPlateDialogProps>(), {
  isOpen: false,
});

watch(() => props.isOpen, (newVal) => {
  isDialogOpen.value = newVal;
  if (newVal) {
    formatsUI.value = formats.value.map(f => ({
      ...f, ranges: f.ranges.map(r => ({
        ...r, isSelected: false, inputType: 'slide', minError: null, maxError: null
      })
    )}));
    format.value = formatsUI.value[0] ?? null;
    console.log('Formats loaded:', formatsUI.value);
  }
});
</script>
