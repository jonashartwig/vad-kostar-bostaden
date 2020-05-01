export default function(loan: number, existingPantbrev: number): number {
  return 375 + (loan - existingPantbrev) * 0.02;
}
