<script>
  import { _, number } from "svelte-i18n";

  import CollapsableSection from "./CollapsableSection.svelte";
	import Borrower from "./Borrower.svelte";
  import { debtRatioMultiplyer } from "../modules/debt_ratio";
  import { totalPercentage } from "../modules/down_payment";

	export let state;
</script>

<CollapsableSection let:minimized>
  <span slot="title">
    { $_("borrowers.title") }
  </span>
  <span slot="introduction">
    { $_("borrowers.introduction") }
  </span>
  <span slot="help">
    <p>
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
    {
      $_({
        id: "borrowers.downPayment",
        values: {
          downPaymentPercent: $number(totalPercentage * 100)
        }
      })
    }
  </span>
	<div class="row" slot="content" class:d-none={minimized}>
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
	<div class="row" slot="content" class:d-none={minimized}>
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
</CollapsableSection>
