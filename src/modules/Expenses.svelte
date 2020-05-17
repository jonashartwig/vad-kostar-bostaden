<script>
  import { _, number } from "svelte-i18n";
  import * as downPayment from "../mortgage/down_payment";
	import titleDeed, { fee as titleDeedFee, percentage as titleDeedPercent } from "../mortgage/title_deed"
	import mortgageDeed, { percentage as mortgageDeedPercent } from "../mortgage/mortgage_deed";
  import loanToValue from "../mortgage/loan_to_value";

  export let state;
</script>

<section>
	<div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>{ $_("expenses.title") }</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          { $_("expenses.introduction") }
          <a id="expenses-show-help" data-toggle="collapse" data-target=".multi-collapse-expenses" href="#expenses-help" class="badge collapse show multi-collapse-expenses collapse-no-transition" role="button" aria-expanded="true" aria-controls="expenses-help-1 expenses-help-2 expenses-show-help">{ $_("showMore") }...</a>
        </p>
				<p class="collapse multi-collapse-expenses" id="expenses-help-1">
          {
            $_({
              id: "expenses.downPayment",
              values: {
                whenSigned: $number(downPayment.percentageWhenSigned * 100),
                whenAvailable: $number(downPayment.percentageWhenAvailable * 100),
                total: $number(downPayment.totalPercentage * 100)
              }
            })
          }
        </p>
				<p class="collapse multi-collapse-expenses" id="expenses-help-2">
          {
            $_({
              id: "expenses.taxes",
              values: {
                titleDeedFee: $number(titleDeedFee),
                titleDeedPercent: $number(titleDeedPercent * 100),
                price: $number(5000000),
                titleDeed: $number(75000)
              }
            })
          }
          <a data-toggle="collapse" data-target=".multi-collapse-expenses" href="#expenses-help" class="badge" role="button" aria-expanded="true" aria-controls="expenses-show-help">{ $_("showLess") }...</a>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{ $_("downPayment") }</h5>
            <table class="card-table table">
              <thead>
                <tr>
                  <th scope="col">{ $_("expenses.card.percentage") }</th>
                  <th scope="col">{ $_("expenses.card.amount") }</th>
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
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{ $_("expenses.card.taxes.title") }</h5>
            <table class="card-table table">
              <thead>
                <tr>
                  <th scope="col">{ $_("expenses.card.name") }</th>
                  <th scope="col">{ $_("expenses.card.percentage") }</th>
                  <th scope="col">{ $_("expenses.card.amount") }</th>
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
    <div class="row mt-2 mb-2">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{ $_("expenses.card.monthlyExpenses.title") }</h5>
            <p class="card-text">
              { $_("expenses.card.monthlyExpenses.introduction") }
            </p>
            <table class="card-table table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    {
                      $_({
                        id: "expenses.card.monthlyExpenses.table.amortization",
                        values: {
                          amortizationPercent: $number(state.getAmortizationRate() * 100)
                        }
                      })
                    }
                  </th>
                  <th scope="col">
                    {
                      $_({
                        id: "expenses.card.monthlyExpenses.table.interest",
                        values: {
                          interestPercent: $number(state.interest * 100)
                        }
                      })
                    }
                  </th>
                  <th scope="col">
                    { $_("expenses.card.monthlyExpenses.table.sum") }
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ $_("expenses.card.monthlyExpenses.table.forYear") }</td>
                  <td>{ $number(state.getAmortizationPerYear()) }</td>
                  <td>{ $number(state.getInterestPerYear()) }</td>
                  <td>{ $number(state.getAmortizationPerYear() + state.getInterestPerYear()) }</td>
                </tr>
                <tr>
                  <td>{ $_("expenses.card.monthlyExpenses.table.forMonth") }</td>
                  <td>{ $number(state.getAmortizationPerMonth()) }</td>
                  <td>{ $number(state.getInterestPerMonth()) }</td>
                  <td>{ $number(state.getAmortizationPerMonth() + state.getInterestPerMonth()) }</td>
                </tr>
                <tr>
                  <td>{ $_("expenses.card.monthlyExpenses.table.forMonthPerLender") }</td>
                  <td>{ $number(state.getAmortizationPerMonthPerLender()) }</td>
                  <td>{ $number(state.getInterestPerMonthPerLender()) }</td>
                  <td><b>{ $number(state.getAmortizationPerMonthPerLender() + state.getInterestPerMonthPerLender()) }</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
