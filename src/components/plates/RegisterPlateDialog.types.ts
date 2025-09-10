export interface PlateNumberFormat {
  id: number
  name: string
  format: string
  ranges: Array<PlateRange>
}

export interface PlateNumberFormatUI {
  id: number
  name: string
  format: string
  ranges: Array<PlateRangeUI>
}

export interface PlateRange {
  name: string
  min: number
  max: number
  current: {
    min: number,
    max: number
  }
}

export interface PlateRangeUI extends PlateRange {
  checked?: boolean,
  inputType?: 'text' | 'slide'
  minError?: string | null
  maxError?: string | null
}

