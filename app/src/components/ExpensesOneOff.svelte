<script>
  import { _, number } from "svelte-i18n";

  import CollapsableSection from "./CollapsableSection.svelte";
  import { Type } from "../dto/type";
  import * as downPayment from "../modules/down_payment";
	import titleDeed, { fee as titleDeedFee, percentage as titleDeedPercent } from "../modules/title_deed";
	import mortgageDeed, { percentage as mortgageDeedPercent } from "../modules/mortgage_deed";
  import loanToValue from "../modules/loan_to_value";

  export let state;
</script>

<CollapsableSection let:minimized>
  <span slot="title">
    { $_("expensesOneOff.title") }
  </span>
  <span slot="introduction">
    { $_("expensesOneOff.introduction") }
  </span>
  <span slot="help">
    <p>
      {
        $_({
          id: "expensesOneOff.downPayment",
          values: {
            whenSigned: $number(downPayment.percentageWhenSigned * 100),
            whenAvailable: $number(downPayment.percentageWhenAvailable * 100),
            total: $number(downPayment.totalPercentage * 100)
          }
        })
      }
    </p>
    {
      $_({
        id: "expensesOneOff.taxes",
        values: {
          titleDeedFee: $number(titleDeedFee),
          titleDeedPercent: $number(titleDeedPercent * 100),
          price: $number(5000000),
          titleDeed: $number(75000)
        }
      })
    }
  </span>
  <div class="row" slot="content" class:d-none={minimized}>
    <div class="col">
      <div class="card h-100 no-border">
        <div class="card-body">
          <h5 class="card-title">{ $_("downPayment") }</h5>
          <table class="card-table table">
            <thead>
              <tr>
                <th scope="col">{ $_("expensesOneOff.table.header.percentage") }</th>
                <th scope="col">{ $_("expensesOneOff.table.header.amount") }</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ $number(downPayment.percentageWhenSigned * 100) }%</td>
                <td><b>{ $number(downPayment.whenSigned(state.price)) }</b></td>
              </tr>
              <tr>
                <td>{ $number(downPayment.percentageWhenAvailable * 100) }%</td>
                <td><b>{ $number(downPayment.whenAvailable(state.price)) }</b></td>
              </tr>
              <tr>
                <td>{ $number(downPayment.totalPercentage * 100) }%</td>
                <td><b>{ $number(downPayment.total(state.price)) }</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col" class:d-none={state.type == Type.APPARTMENT}>
      <div class="card h-100 no-border">
        <div class="card-body">
          <h5 class="card-title">{ $_("expensesOneOff.table.taxes.title") }</h5>
          <table class="card-table table">
            <thead>
              <tr>
                <th scope="col">{ $_("expensesOneOff.table.header.name") }</th>
                <th scope="col">{ $_("expensesOneOff.table.header.percentage") }</th>
                <th scope="col">{ $_("expensesOneOff.table.header.amount") }</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ $_("titleDeed") }</td>
                <td>{ $number(titleDeedPercent * 100) }%</td>
                <td><b>{ $number(titleDeed(state.price)) }</b></td>
              </tr>
              <tr>
                <td>{ $_("mortgageDeed") }</td>
                <td>{ $number(mortgageDeedPercent * 100) }%</td>
                <td><b>{ $number(mortgageDeed(state.getLoan(), state.pantbrev)) }</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</CollapsableSection>
