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

		{#each state.borrowers as borrower}
			<Borrower bind:borrower={borrower} on:remove={ event => state = state.removeBorrower(event.detail) } />
		{:else}
		<div class="row">
			<div class="col">
				You need at least one loan taker.
			</div>
		</div>
		{/each}

		<div class="row">
			<div class="col">
				Press the plus to add a new asset:
				<button type="button" class="btn btn-default" on:click={ () => state = state.addBorrower() }>
					<span class="fas fa-plus"></span>
				</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					The combined total salary per year is: {state.getCombinedSalary()}
					That makes the debt ratio: {state.getDebtRatio()}
				</p>
			</div>
		</div>
	</div>
</section>
