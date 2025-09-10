import { ref } from "vue";
import type { PlateNumberFormatUI } from "./RegisterPlateDialog.types";

export const formats = ref<PlateNumberFormatUI[]>([
  {
    id: 1,
    name: 'default',
    format: 'PSM ####',
    ranges: [
      {
        name: 'local',
        fullRange: {
          min: 1000,
          max: 4999,
        },
        available: {
          min: 1000,
          max: 4999,
        },
        current: {
          min: 1000,
          max: 4999,
        },
      },
      {
        name: 'tourism',
        fullRange: {
          min: 5000,
          max: 9999,
        },
        available: {
          min: 5000,
          max: 9999,
        },
        current: {
          min: 5000,
          max: 5300,
        },
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
        fullRange: {
          min: 10000,
          max: 19999,
        },
        available: {
          min: 10000,
          max: 19999,
        },
        current: {
          min: 10000,
          max: 10300,
        },
      }
    ]
  }
])
