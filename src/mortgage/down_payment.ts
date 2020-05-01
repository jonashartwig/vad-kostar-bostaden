export function whenSigned(price: number): number {
  return 0.1 * price;
}

export function whenAvailable(price: number): number {
  return 0.05 * price;
}

export function total(price: number): number {
  return whenSigned(price) + whenAvailable(price);
}
