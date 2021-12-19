<script>
  import { _, number } from "svelte-i18n";

  import CollapsableSection from "./CollapsableSection.svelte";
  import { Type } from "../dto/type";

  export let state;
</script>

<CollapsableSection let:minimized>
  <span slot="title">
    { $_("expensesRecurring.title") }
  </span>
  <span slot="introduction">
    { $_("expensesRecurring.introduction") }
  </span>
  <div class="row mt-2 mb-2" slot="content" class:d-none={minimized}>
    <div class="col">
      <div class="card no-border">
        <div class="card-body">
          <table class="card-table table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">
                  {
                    $_({
                      id: "expensesRecurring.table.amortization",
                      values: {
                        amortizationPercent: $number(state.getAmortizationRate() * 100)
                      }
                    })
                  }
                </th>
                <th scope="col">
                  {
                    $_({
                      id: "expensesRecurring.table.interest",
                      values: {
                        interestPercent: $number(state.interest * 100)
                      }
                    })
                  }
                </th>
                <th scope="col">
                  { $_("expensesRecurring.table.bills") }
                </th>
                <th scope="col">
                  { $_("expensesRecurring.table.sum") }
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ $_("expensesRecurring.table.forYear") }</td>
                <td>{ $number(state.getAmortizationPerYear()) }</td>
                <td>{ $number(state.getInterestPerYear()) }</td>
                <td>{ $number(state.getYearlyBillAmount()) }</td>
                <td>{ $number(state.getAmortizationPerYear() + state.getInterestPerYear() + state.getYearlyBillAmount()) }</td>
              </tr>
              <tr>
                <td>{ $_("expensesRecurring.table.forMonth") }</td>
                <td>{ $number(state.getAmortizationPerMonth()) }</td>
                <td>{ $number(state.getInterestPerMonth()) }</td>
                <td>{ $number(state.getMonthlyBillAmount()) }</td>
                <td>{ $number(state.getAmortizationPerMonth() + state.getInterestPerMonth() + state.getMonthlyBillAmount()) }</td>
              </tr>
              <tr>
                <td>{ $_("expensesRecurring.table.forMonthPerBorrower") }</td>
                <td>{ $number(state.getAmortizationPerMonthPerBorrower() || 0) }</td>
                <td>{ $number(state.getInterestPerMonthPerBorrower() || 0) }</td>
                <td>{ $number(state.getMonthlyBillAmountByBorrower()) }</td>
                <td><b>{ $number((state.getAmortizationPerMonthPerBorrower() + state.getInterestPerMonthPerBorrower() + state.getMonthlyBillAmountByBorrower()) || 0) }</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</CollapsableSection>
