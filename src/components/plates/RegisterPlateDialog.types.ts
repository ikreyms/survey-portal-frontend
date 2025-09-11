/**
 * Represents the format of a plate number including its identifier,
 * name, pattern format, and associated numeric ranges.
 */
export interface PlateNumberFormat {
  /** Unique identifier of the plate number format */
  id: number;

  /** Name of the format (e.g., "Standard", "Diplomatic") */
  name: string;

  /** String format of the plate number (e.g., "PSM-1234") */
  format: string;

  /** Array of ranges associated with this format */
  ranges: Array<PlateRange>;
}

/**
 * UI-specific version of PlateNumberFormat including UI-specific PlateRange information.
 */
export interface PlateNumberFormatUI {
  /** Unique identifier of the plate number format */
  id: number;

  /** Name of the format (e.g., "Standard", "Diplomatic") */
  name: string;

  /** String format of the plate number (e.g., "ABC-1234") */
  format: string;

  /** Array of PlateRangeUI used for UI interactions */
  ranges: Array<PlateRangeUI>;
}

/**
 * Represents a numeric range associated with a plate number format.
 * Includes minimum and maximum values, as well as the currently used subrange.
 */
export interface PlateRange {
  /** Descriptive name of the range (e.g., "Main Range") */
  name: string;

  /** The defined range for the plate number format */
  defined: RangeBounds;

  /** Available range from the entire range for the plate number format */
  available: RangeBounds;

  /** Currently used subrange within the min-max bounds */
  selectedRange: RangeBounds;

  /** Thresholds for triggering availability warnings */
  thresholds: {
    /** Warning threshold for available numbers in this range */
    warning: number;

    /** Critical threshold for available numbers in this range */
    critical: number;
  }
}

export interface RangeBounds {
  /** Minimum bound of range */
  min: number;

  /** Maximum bound of range */
  max: number
}

/**
 * UI-specific extension of PlateRange to support interactive features
 * like selection, validation errors, and input types.
 */
export interface PlateRangeUI extends PlateRange {
  /** Optional flag indicating if the range is selected or active in the UI */
  isSelected?: boolean;

  /** Type of input UI for the range: either text input or slider */
  inputType?: 'text' | 'slide';

  /** Error message for invalid minimum input, or null if valid */
  minError?: string | null;

  /** Error message for invalid maximum input, or null if valid */
  maxError?: string | null;
}
