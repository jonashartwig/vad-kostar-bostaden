export const percentage = 0.02;
export const fee = 375;

export default function(loan: number, existingPantbrev: number): number {
  return fee + (loan - existingPantbrev) * percentage;
}
