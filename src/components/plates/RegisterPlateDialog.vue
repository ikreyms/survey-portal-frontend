<template>
  <q-dialog persistent v-model="isDialogOpen" @dismiss="onCancel" @hide="onCancel" @escape-key="onCancel">
    <q-card style="min-width: 300px; width: 1000px;">
      <q-card-section>
        <div class="text-h6">Register Plates</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-select
          class="q-mb-lg"
          v-model="format"
          :options="formats"
          label="Format"
          option-value="id"
          option-label="name"
        />

        <div class="column q-mb-md">
          <div class="text-subtitle2">Select PSM number range(s) to register</div>
          <div class="row items-center q-gutter-x-sm text-grey-8">
            <q-icon name="info"></q-icon>
            <div class="text-caption">Bounds are inclusive</div>
          </div>
        </div>

        <div class="column q-gutter-y-md q-mb-md">
          <q-card v-for="range in formatsUI?.ranges" :key="range.name" class="q-pa-sm q-pb-lg">
            <div class="row items-center justify-between" :style="{ marginBottom: range.inputType === 'slide' ? '32px' : '0px' }">
              <q-checkbox :label="range.name" v-model="range.checked"></q-checkbox>
              <q-btn
                outline
                no-caps
                size="sm"
                color="grey-9"
                class="q-mr-sm"
                icon="cached"
                dense
                @click="toggleRangeInputType(range)"
              >
                {{ range.inputType === 'slide' ? 'Switch to Text Input' : 'Switch to Slider' }}
              </q-btn>
            </div>
            <div v-if="range.inputType === 'slide'">
              <div class="q-px-md q-mb-sm row items-center">
                <q-range left-label-color="primary" left-thumb-color="primary" right-label-color="info"
                  right-thumb-color="info" :disable="!range.checked" v-model="range.current" :min="range.min"
                  :max="range.max" label-always />
              </div>
              <div class="q-px-sm row items-center justify-between">
                <q-btn-group outline>
                  <q-btn outline size="xs" :disable="!range.checked" color="primary" icon="remove"
                    @click="handleLowerBoundDecrement(range)" />
                  <q-btn outline size="xs" :disable="!range.checked" color="primary" icon="add"
                    @click="handleLowerBoundIncrement(range)" />
                </q-btn-group>
                <q-btn-group outline>
                  <q-btn outline size="xs" :disable="!range.checked" color="info" icon="remove"
                    @click="handleUpperBoundDecrement(range)" />
                  <q-btn outline size="xs" :disable="!range.checked" color="info" icon="add"
                    @click="handleUpperBoundIncrement(range)" />
                </q-btn-group>
              </div>
            </div>
            <div v-else-if="range.inputType === 'text'" class="q-px-sm row items-center q-gutter-x-md">
              <q-input
                class="col"
                type="number"
                :disable="!range.checked"
                v-model.number="range.current.min"
                label="Lower Bound"
                :error="!!range.minError"
                :error-message="range.minError || ''"
                />
                <q-input
                class="col"
                type="number"
                :disable="!range.checked"
                v-model.number="range.current.max"
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
        <q-btn flat label="Cancel" color="grey-7" @click="onCancel" />
        <q-btn flat label="Register" color="primary" @click="register" />
      </q-card-actions>
    </q-card>
    {{ format }}
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { formats } from './data';
import type { PlateNumberFormatUI, PlateRange, PlateRangeUI } from './RegisterPlateDialog.types';

const isDialogOpen = ref(false);
const format = ref(formats.value[0])
const formatsUI = ref<PlateNumberFormatUI[] | null>(null);

const toggleRangeInputType = (range: PlateRangeUI) => {
  range.inputType = range.inputType === 'slide' ? 'text' : 'slide';
}

const handleLowerBoundDecrement = (range: PlateRangeUI) => {
  if (range.current.min <= range.min) return;
  range.current.min--;
}

const handleLowerBoundIncrement = (range: PlateRangeUI) => {
  if (range.current.min >= range.max) return;
  range.current.min++;
}

const handleUpperBoundDecrement = (range: PlateRangeUI) => {
  if (range.current.max <= range.min) return;
  range.current.max--;
}

const handleUpperBoundIncrement = (range: PlateRangeUI) => {
  if (range.current.max >= range.max) return;
  range.current.max++;
}

const validateRange = (range: PlateRangeUI) => {
  if (range.inputType !== 'text') {
    range.minError = null
    range.maxError = null
    return true
  }
  let minError: string | null = null;
  let maxError: string | null = null;

  if (range.current.min < range.min) minError = 'Lower bound cannot be below minimum';
  else if (range.current.min > range.max) minError = 'Lower bound cannot be above maximum';

  if (range.current.max < range.min) maxError = 'Upper bound cannot be below minimum';
  else if (range.current.max > range.max) maxError = 'Upper bound cannot be above maximum';

  if (range.current.min > range.current.max) minError = maxError = 'Lower bound cannot be above upper bound';

  range.minError = minError;
  range.maxError = maxError;

  return !minError && !maxError;
}

const register = () => {
  const selectedRanges: PlateRange[] = [];
  format.value?.ranges.forEach(r => {
    if (r.checked) {
      if (!validateRange(r)) return;
      const newRange = { ...r };
      delete newRange.checked;
      delete newRange.inputType;
      delete newRange.minError;
      delete newRange.maxError;
      selectedRanges.push(newRange);
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
  isDialogOpen.value = newVal
});

onMounted(() => {
  formatsUI.value = formats.value.map(f => ({
    ...f,
    ranges: f.ranges.map(r => ({
      ...r,
      checked: false,
      inputType: 'slide',
      minError: null,
      maxError: null,
    }))
  }));
})
</script>
