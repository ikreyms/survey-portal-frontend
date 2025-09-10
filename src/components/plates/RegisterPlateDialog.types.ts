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
  
  /** Entire range for the plate number format */
  fullRange: {
    /** Minimum value of the full range */
    min: number;

    /** Maximum value of the full range */
    max: number;
  }

  /** Available range from the entire range for the plate number format */
  available: {
    /** Minimum value of the available range */
    min: number;
  
    /** Maximum value of the available range */
    max: number;
  }

  /** Currently used subrange within the min-max bounds */
  current: {
    /** Current minimum value in use */
    min: number;

    /** Current maximum value in use */
    max: number;
  };
}

/**
 * UI-specific extension of PlateRange to support interactive features
 * like selection, validation errors, and input types.
 */
export interface PlateRangeUI extends PlateRange {
  /** Optional flag indicating if the range is selected or active in the UI */
  selected?: boolean;

  /** Type of input UI for the range: either text input or slider */
  inputType?: 'text' | 'slide';

  /** Error message for invalid minimum input, or null if valid */
  minError?: string | null;

  /** Error message for invalid maximum input, or null if valid */
  maxError?: string | null;
}
