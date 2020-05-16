export const debtRatioMultiplyer: number = 4.5;

export default function(salary: number): number {
  return debtRatioMultiplyer * salary;
}
