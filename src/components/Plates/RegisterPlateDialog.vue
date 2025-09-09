<template>
  <q-dialog v-model="isDialogOpen">
    <q-card style="min-width: 300px; width: 1000px;">
      <q-card-section>
        <div class="q-mb-md">
          <div class="text-h6">Register Plates</div>
          <q-separator></q-separator>
        </div>
        <div class="column q-mb-lg">
          <q-select v-model="format" :options="formats" label="Format" option-value="id" option-label="name" />
        </div>

        <div class="column q-mb-sm">
          <div class="text-subtitle2">Select PSM number range(s) to register</div>
          <div class="row items-center q-gutter-x-sm text-grey-8">
            <q-icon name="info"></q-icon>
            <div class="text-caption">Bounds are inclusive</div>
          </div>
        </div>

        <div class="column q-gutter-y-lg">
          <div v-for="range in format?.ranges" :key="range.name">
            <q-checkbox style="margin-bottom: 2rem;" :label="range.name" v-model="range.checked"></q-checkbox>
            <div class="q-px-md q-mb-sm row items-center">
              <q-range left-label-color="primary" left-thumb-color="primary" right-label-color="info"
                right-thumb-color="info" :disable="!range.checked" v-model="range.current" :min="range.min"
                :max="range.max" label-always />
            </div>
            <div class="q-px-sm row items-center justify-between">
              <q-btn-group outline rounded>
                <q-btn outline size="xs" :disable="!range.checked" color="primary" icon="remove"
                  @click="handleLowerBoundDecrement" />
                <q-btn outline size="xs" :disable="!range.checked" color="primary" icon="add"
                  @click="range.current.min++" />
              </q-btn-group>
              <q-btn-group outline rounded>
                <q-btn outline size="xs" :disable="!range.checked" color="info" icon="remove"></q-btn>
                <q-btn outline size="xs" :disable="!range.checked" color="info" icon="add"></q-btn>
              </q-btn-group>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="right" class="q-px-md">
        <q-btn flat label="Cancel" color="primary" @click="onCancel" />
        <q-btn flat :disable="isLowerBoundError || isUpperBoundError" label="Register" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { PlateNumberFormatsWithRangeTracking, PlateRangeTypeWithTracking } from './RegisterPlateDIalog.types';

const formats = ref<PlateNumberFormatsWithRangeTracking[]>([
  {
    id: 1,
    name: 'default',
    format: 'PSM ####',
    ranges: [
      {
        name: 'local',
        min: 1000,
        max: 4999,
        current: {
          min: 1000,
          max: 4999,
        },
        checked: false
      },
      {
        name: 'tourism',
        min: 5000,
        max: 9999,
        current: {
          min: 5000,
          max: 5300,
        },
        checked: false
      }
    ]
  },
  {
    id: 2,
    name: 'format 2027',
    format: 'PSM #####',
    ranges: [
      {
        name: 'default',
        min: 10000,
        max: 19999,
        current: {
          min: 10000,
          max: 10300,
        },
        checked: false
      }
    ]
  }
])

const format = ref(formats.value[0])
const minRange = ref(1200);
const maxRange = ref(1600);
const isDialogOpen = ref(false);
const rangeOffset = ref(100);
const rangeBounds = ref({ min: minRange.value, max: minRange.value + rangeOffset.value });

const isLowerBoundError = computed(() => rangeBounds.value.min < minRange.value || rangeBounds.value.min > maxRange.value);
const isUpperBoundError = computed(() => rangeBounds.value.max > maxRange.value || rangeBounds.value.max < minRange.value);

const emits = defineEmits(['cancel']);

const onCancel = () => emits('cancel');

const handleLowerBoundDecrement = () => (range: PlateRangeTypeWithTracking) => {
  if (range.current.min < minRange.value) return
  range.current.min--;
}

export interface RegisterPlateDialogProps {
  isOpen: boolean
  rangeMin: number
  rangeMax: number
  defaultRangeOffset?: number
}

const props = withDefaults(defineProps<RegisterPlateDialogProps>(), {
  defaultRangeOffset: 100
})

watch(() => props.isOpen, (val) => { isDialogOpen.value = val }, { immediate: true })

watch(() => props.defaultRangeOffset, (val) => { rangeOffset.value = val }, { immediate: true })

watch(() => props.rangeMin, (val) => {
  minRange.value = val
  rangeBounds.value = { min: val, max: val + rangeOffset.value }
}, { immediate: true })

watch(() => props.rangeMax, (val) => { maxRange.value = val }, { immediate: true })

</script>
