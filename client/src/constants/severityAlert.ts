export const SEVERITY_ALERT = Object.freeze({
  info: Symbol("Represents a message of info"),
  error: Symbol("Represents a message of error"),
  warning: Symbol("Represents a message of warning"),
  success: Symbol("Represents a message of success")
});

export const SEVERITY_ALERT_VALUE = Object.freeze({
  [SEVERITY_ALERT.info]: "info",
  [SEVERITY_ALERT.error]: "error",
  [SEVERITY_ALERT.warning]: "warning",
  [SEVERITY_ALERT.success]: "success"
});
