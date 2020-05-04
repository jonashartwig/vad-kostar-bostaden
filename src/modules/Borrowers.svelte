<script>
	import Borrower from "./Borrower.svelte"

	export let state;
</script>

<section class="align-items-center">
	<div class="container">
		<div class="row vkb-secondary-color">
			<div class="col">
				<h2>Borrowers</h2>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					In this section you define what assets you have access to. In general that refers to salary and cash a loan taker has.
					You can add as many assets as you like. The salary is important for the debt ratio (skuldkvot).
					The Salary should be entered on a monthly level before taxes.
					If the loan exceeds 4,5 times the combined yearly salary, then amortization will increase (see below for more details).
					Filling the available cash is optional. If you do not fill it, the it will be assumed you will have the required down payment (kontantinsats) available.
					You can see the required cash in the section below.
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h3>Borrowers listing</h3>
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
					The combined <u>total salary</u> per year is: <b>{state.getCombinedSalary()} kr</b>
					That makes the <u>debt ratio</u>: <b>{state.getDebtRatio()} kr </b>
				</p>
			</div>
		</div>
	</div>
</section>
