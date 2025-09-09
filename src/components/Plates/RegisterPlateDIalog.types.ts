export interface PlateNumberFormatsWithRangeTracking {
    id: number
    name: string
    format: string
    ranges: PlateRangeTypeWithTracking[]
}

export interface PlateRangeTypeWithTracking {
    name: string
    min: number
    max: number
    current: {
        min: number,
        max: number
    }
    checked: boolean
}