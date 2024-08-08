export function stringNormalize(str) {
  return str.replace(/\n/g, "").replace(/\s+/g, " ").trim();
}

export function sql(strings) {
  if (strings.length > 1) {
    throw new Error(
      "Misused sugar function. This is a mock immplementation to support syntax highlighting in tests and nothing more.",
    );
  }
  return strings.join("");
}

export const BASEPATH = "/api/v1";
