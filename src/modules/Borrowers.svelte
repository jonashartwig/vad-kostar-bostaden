<script>
  import { _, number } from "svelte-i18n";
	import Borrower from "./Borrower.svelte"
  import { debtRatioMultiplyer } from "../mortgage/debt_ratio";
  import { totalPercentage } from "../mortgage/down_payment";

	export let state;
</script>

<section class="align-items-center">
	<div class="container">
		<div class="row vkb-secondary-color">
			<div class="col">
				<h2>{ $_("borrowers.title") }</h2>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					{ $_("borrowers.introduction") }
					<a class="badge collapse show multi-collapse-borrowers collapse-no-transition" data-toggle="collapse" data-target=".multi-collapse-borrowers" id="borrowers-show-help" href="#borrowers-help" role="button" aria-expanded="true" aria-controls="borrowers-help-1 borrowers-help-2 borrowers-show-help">{ $_("showMore") }...</a>
				</p>
				<p class="collapse multi-collapse-borrowers" id="borrowers-help-1">
          {
            $_({
              id: "borrowers.example",
              values: {
                sallaryJonas: $number(35000),
                sallaryEmelie: $number(41500),
                debtRatioMultiplyer: $number(debtRatioMultiplyer),
                sallaryJonasYear: $number(12 * 35000),
                sallaryEmelieYear: $number(12 * 41500),
                debtRatio: $number(4131000)
              }
            })
          }
				</p>
				<p class="collapse multi-collapse-borrowers" id="borrowers-help-2">
					{
            $_({
              id: "borrowers.downPayment",
              values: {
                downPaymentPercent: $number(totalPercentage * 100)
              }
            })
          }
					<a data-toggle="collapse" data-target=".multi-collapse-borrowers" href="#borrowers-help" class="badge" role="button" aria-expanded="true" aria-controls="borrowers-help-1 borrowers-help-2 borrowers-show-help">{ $_("showLess") }...</a>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<table class="table">
				  <thead>
				    <tr>
				      <th scope="col">{ $_("borrowers.table.name") }</th>
				      <th scope="col">{ $_("borrowers.table.salaryPerMonth") }</th>
				      <th scope="col">{ $_("borrowers.table.cash") }</th>
				      <th scope="col"></th>
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
						    <button type="button" class="float-right btn btn-secondary" on:click={ () => state = state.addBorrower() }>
						      { $_("borrowers.table.create") }
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
          { @html
            $_({
              id: "borrowers.summary",
              values: {
                combinedSalary: $number(state.getCombinedSalary()),
                debtRatio: $number(state.getDebtRatio())
              }
            })
          }
				</p>
			</div>
		</div>
	</div>
</section>
