<script>
  import { _, number } from "svelte-i18n";
	import Lender from "./Lender.svelte"
  import { debtRatioMultiplyer } from "../mortgage/debt_ratio";
  import { totalPercentage } from "../mortgage/down_payment";

	export let state;
</script>

<section class="align-items-center">
	<div class="container">
		<div class="row vkb-secondary-color">
			<div class="col">
				<h2>{ $_("lenders.title") }</h2>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p>
					{ $_("lenders.introduction") }
					<a class="badge collapse show multi-collapse-lenders collapse-no-transition" data-toggle="collapse" data-target=".multi-collapse-lenders" id="lenders-show-help" href="#lenders-help" role="button" aria-expanded="true" aria-controls="lenders-help-1 lenders-help-2 lenders-show-help">{ $_("showMore") }...</a>
				</p>
				<p class="collapse multi-collapse-lenders" id="lenders-help-1">
          {
            $_({
              id: "lenders.example",
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
				<p class="collapse multi-collapse-lenders" id="lenders-help-2">
					{
            $_({
              id: "lenders.downPayment",
              values: {
                downPaymentPercent: $number(totalPercentage * 100)
              }
            })
          }
					<a data-toggle="collapse" data-target=".multi-collapse-lenders" href="#lenders-help" class="badge" role="button" aria-expanded="true" aria-controls="lenders-help-1 lenders-help-2 lenders-show-help">{ $_("showLess") }...</a>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<table class="table">
				  <thead>
				    <tr>
				      <th scope="col">{ $_("lenders.table.name") }</th>
				      <th scope="col">{ $_("lenders.table.salaryPerMonth") }</th>
				      <th scope="col">{ $_("lenders.table.cash") }</th>
				      <th scope="col"></th>
				    </tr>
				  </thead>
				  <tbody>
						{#each state.lenders as borrower}
							<Lender bind:borrower={borrower} on:remove={ event => state = state.removeLender(event.detail) } />
						{/each}
						<tr>
							<td></td>
							<td></td>
							<td></td>
						  <td>
						    <button type="button" class="float-right btn btn-secondary" on:click={ () => state = state.addLender() }>
						      { $_("lenders.table.create") }
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
              id: "lenders.summary",
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
