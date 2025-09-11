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
        defined: {
          min: 1000,
          max: 4999,
        },
        available: {
          min: 1000,
          max: 4999,
        },
        selectedRange: {
          min: 1000,
          max: 1300,
        },
        thresholds: {
          warning: 50,
          critical: 20,
        }
      },
      {
        name: 'tourism',
        defined: {
          min: 5000,
          max: 9999,
        },
        available: {
          min: 5000,
          max: 9999,
        },
        selectedRange: {
          min: 5000,
          max: 5300,
        },
        thresholds: {
          warning: 50,
          critical: 20,
        }
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
        defined: {
          min: 10000,
          max: 19999,
        },
        available: {
          min: 10000,
          max: 19999,
        },
        selectedRange: {
          min: 10000,
          max: 10300,
        },
        thresholds: {
          warning: 50,
          critical: 20,
        }
      }
    ]
  }
])
