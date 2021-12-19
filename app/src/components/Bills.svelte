<script>
  import { _, number } from "svelte-i18n";

  import CollapsableSection from "./CollapsableSection.svelte";
  import { BILL_FREQUENCY } from "../dto/bill";

	export let state;
</script>

<CollapsableSection let:minimized>
  <span slot="title">
    { $_("bills.title") }
  </span>
  <span slot="introduction">
    { $_("bills.introduction") }
  </span>
	<div class="row" slot="content" class:d-none={minimized}>
		<div class="col">
			<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">{ $_("bills.table.name") }</th>
			      <th scope="col">{ $_("bills.table.amount") }</th>
			      <th scope="col">{ $_("bills.table.frequency") }</th>
			    </tr>
			  </thead>
			  <tbody>
					{#each state.bills as bill}
            <tr>
              <td>
                <div class="form-label-group">
                  <input id="bill-{bill.getId()}-name" class="form-control" placeholder="Name" type="text" bind:value={bill.name} />
                  <label for="bill-{bill.getId()}-name">{ $_("bills.table.name") }</label>
                </div>
              </td>
              <td>
                <div class="form-label-group">
                  <input id="bill-{bill.getId()}-amount" class="form-control" placeholder="Salary" type="number" bind:value={bill.amount} />
                  <label for="bill-{bill.getId()}-salary">{ $_("bills.table.amount") }</label>
                </div>
              </td>
              <td>
                <div class="form-label-group">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      { $_(`bills.${BILL_FREQUENCY[bill.frequency].toLowerCase()}`) }
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {#each Object.keys(BILL_FREQUENCY).filter(k => !Number.isNaN(+k)) as frequency}
                        <a class="dropdown-item" on:click={ () => { bill.frequency = Number.parseInt(frequency)} }>{ $_(`bills.${BILL_FREQUENCY[frequency].toLowerCase()}`) }</a>
                      {/each}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <button type="button" class="float-right btn btn-danger" on:click={ () => state = state.removeBill(bill.id) }>
                  { $_("bills.table.remove") }
                </button>
              </td>
            </tr>
					{/each}
					<tr>
						<td></td>
						<td></td>
						<td></td>
					  <td>
					    <button type="button" class="float-right btn btn-secondary" on:click={ () => state = state.addBill() }>
					      { $_("bills.table.create") }
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
            id: "bills.summary",
            values: {
              amountToPayByYear: state.getYearlyBillAmount(),
              amountToPayByMomth: state.getMonthlyBillAmount()
            }
          })
        }
			</p>
		</div>
	</div>
</CollapsableSection>
