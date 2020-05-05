<script>
	import Borrower from "./Borrower.svelte"

	export let state;
</script>

<section class="align-items-center">
	<div class="container">
		<div class="row vkb-secondary-color">
			<div class="col">
				<h2>Lenders</h2>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					Help us understand your financial situation. Please enter your salary in kr/month before tax. The salary is required for the debt ratio (skuldkvot).
					Debt ratio is one of the factors that determine your amortization rate.
					<a class="badge collapse show multi-collapse-lenders collapse-no-transition" data-toggle="collapse" data-target=".multi-collapse-lenders" id="lenders-show-help" href="#lenders-help" role="button" aria-expanded="true" aria-controls="lenders-help-1 lenders-help-2 lenders-show-help">Show more...</a>
				</p>
				<p class="collapse multi-collapse-lenders" id="lenders-help-1">
					The debt ratio is calculated by multiplying the sum of the lenders yearly salary by 4,5.
					Imagine you have two lenders: Jonas and Emelie. Jonas earns 35000kr a month before tax and Emelie earns 41500kr a month before tax.
					The debt ratio is therefore: (12 * 35000kr + 12 * 41500kr) * 4,5 = (420000kr + 498000kr) * 4,5 = 4131000kr.
					If the loan exceeds 4131000kr you need to amortize an additional 1%.
				</p>
				<p class="collapse multi-collapse-lenders" id="lenders-help-2">
					The down payment is calculeted as 15% of the final price of your estate. This is the required minimum. You may use the fields for cash to identify each individuals assets.
					You may leave it empty. All other calculations below assume that you will pay the minimum amount.
					You can use those fields to understand how amortization changes in case you add more down payment.
					<a data-toggle="collapse" data-target=".multi-collapse-lenders" href="#lenders-help" class="badge" role="button" aria-expanded="true" aria-controls="lenders-help-1 lenders-help-2 lenders-show-help">Show less...</a>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<table class="table">
				  <thead>
				    <tr>
				      <th scope="col">Name</th>
				      <th scope="col">Salary (kr/month)</th>
				      <th scope="col">Cash (kr)</th>
				      <th scope="col">Action</th>
				    </tr>
				  </thead>
				  <tbody>
						{#each state.borrowers as borrower}
							<Borrower bind:borrower={borrower} on:remove={ event => state = state.removeBorrower(event.detail) } />
						{/each}
						<tr>
							<td></td>
							<td></td>
							<td></td>
						  <td>
						    <button type="button" class="btn btn-secondary" on:click={ () => state = state.addBorrower() }>
						      Create
						    </button>
						  </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					The combined <u>total salary</u> per year is: <b>{state.getCombinedSalary()} kr</b>.
					The resulting <u>debt ratio</u> is therefore <b>{state.getDebtRatio()} kr </b>.
				</p>
			</div>
		</div>
	</div>
</section>
