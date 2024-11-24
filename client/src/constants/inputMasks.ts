export const INPUT_MASKS = Object.freeze({
  LOWER: Symbol("Applies lower case to input content"),
  UPPER: Symbol("Applies upper case to input content"),
  PASCAL: Symbol("Applies pascal case to input content")
});

export const APPLY_MASK = {
  [INPUT_MASKS.LOWER]: (value: string): string => value.toLowerCase(),
  [INPUT_MASKS.UPPER]: (value: string): string => value.toUpperCase(),
  [INPUT_MASKS.PASCAL]: (value: string): string =>
    value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  default: (value: string): string => value
};
