export function padLeft(number: number) {
  if (number >= 0 && number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}
