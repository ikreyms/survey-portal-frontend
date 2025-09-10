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
      }
    ]
  }
])
