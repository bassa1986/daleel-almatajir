// =============================================================
// دليل المتاجر — Generic numeric helpers
// =============================================================

/** Rounds to 2 decimal places, avoiding floating-point artifacts like 12.000000000000002. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Clamps a value to be >= 0. Used to sanitize user-entered numbers. */
export function nonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}
