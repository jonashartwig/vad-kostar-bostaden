export const percentage = 0.015;
export const fee = 825;

export default function(price: number): number {
  return fee + price * percentage;
}
