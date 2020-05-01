<script>
	import State from "./dto/state"
	import * as downPayment from "./mortgage/down_payment"
	import lagfart from "./mortgage/lagfart"
	import pantbrev from "./mortgage/pantbrev"
	import amortization from "./mortgage/amortization"
	import amortizationPercent from "./mortgage/amortization_percent"
	import amortizationMonth from "./mortgage/amortization_month"
	import amortizationMonthBorrower from "./mortgage/amortization_month_borrower"

	export let state = new State();
	export const loan = state.price - state.getCombinedDownPaymentOrMinimum(state.price)
</script>

<button title="add burrower" on:click={() => state = state.addBorrower() } />

<h2>Borrowers list</h2>

{#each state.borrowers as borrower}
<input type="text" bind:value={borrower.name} />: <input type="number" bind:value={borrower.salary} />: <input type="number" bind:value={borrower.downPayment} />
{/each}

{state.getCombinedSalary()} {state.getDebtRatio()}

<h2>Estate</h2>

<input type="number" bind:value={state.price} />
<input type="number" bind:value={state.pantbrev} />
Loan: {loan}

<h2>Expenses</h2>
Down payment (total): {downPayment.total(state.price)}
Down payment (when signed): {downPayment.whenSigned(state.price)}
Down payment (when handed over): {downPayment.whenAvailable(state.price)}
Lagfart: { lagfart(state.price) }
Pantbrev: { pantbrev(loan, state.pantbrev) }
Amortization %: { amortizationPercent(state.price, loan, state.getCombinedSalary()) }
Amortization (year): { amortization(state.price, loan, state.getCombinedSalary()) }
Amortization (month): { amortizationMonth(state.price, loan, state.getCombinedSalary()) }
Amortization (each): { amortizationMonthBorrower(state.price, loan, state.getCombinedSalary(), state.borrowers.length) }

{JSON.stringify(state)}
