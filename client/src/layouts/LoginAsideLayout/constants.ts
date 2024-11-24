export const LAYOUT_DIRECTION = Object.freeze({
  left: Symbol("The container is located on the left"),
  right: Symbol("The container is located on the right")
});

export const LAYOUT_DIRECTION_VALUE = Object.freeze({
  [LAYOUT_DIRECTION.left]: "left",
  [LAYOUT_DIRECTION.right]: "right"
});
