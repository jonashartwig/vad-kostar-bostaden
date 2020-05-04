export const percentageWhenSigned = 0.1;
export const percentageWhenAvailable = 0.05;

export function whenSigned(price: number): number {
  return percentageWhenSigned * price;
}

export function whenAvailable(price: number): number {
  return percentageWhenAvailable * price;
}

export function total(price: number): number {
  return whenSigned(price) + whenAvailable(price);
}
