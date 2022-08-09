const k = 1024;
const nano = BigInt(1e3);
const milli = BigInt(1e6);
const second = BigInt(1e9);

export function formatYear(date: string) {
  if (date.startsWith("-")) {
    return date.slice(1) + " BC";
  }

  return date;
}

export function formatNumber(number: number) {
  return number.toLocaleString();
}

export function formatNanoseconds(value: number | bigint): string {
  if (typeof value === "number") {
    value = BigInt(value);
  }

  if (value < nano) {
    return `${value}ns`;
  } else if (value < milli) {
    return `${value / nano}μs`;
  } else if (value < second) {
    return `${value / milli}ms`;
  }

  return `${value / second}s`;
}

const isServer = typeof window === "undefined";

export function getNanosecondsTime(): bigint {
  if (isServer) {
    return process.hrtime.bigint();
  }

  return BigInt(Math.floor(performance.now() * 1e6));
}
