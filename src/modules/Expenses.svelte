<script>
  import * as downPayment from "../mortgage/down_payment";
	import lagfart from "../mortgage/lagfart"
	import pantbrev from "../mortgage/pantbrev";
	import amortization from "../mortgage/amortization";
	import amortizationPercent, { loanToDebtRatioPercent, loanToValuePercent } from "../mortgage/amortization_percent";
	import amortizationMonth from "../mortgage/amortization_month";
	import amortizationMonthBorrower from "../mortgage/amortization_month_borrower";
  import loanToValue from "../mortgage/loan_to_value";

  export let state;
</script>

<section>
	<div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>Expenses</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        This section provides information about payments requited. The down payment has two steps. First you have to pay 10% of the estate price at the time you sign the contract.
        When you get access to the estate, which usually comes with the keys, another 5% have to be paid. That makes a total of 15% of the estate price.
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Down Payment</h5>
            <table class="card-table table">
              <thead>
                <tr>
                  <th scope="col">Percentage</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10%</td>
                  <td><b>{downPayment.whenSigned(state.price)} kr</b></td>
                </tr>
                <tr>
                  <td>5%</td>
                  <td><b>{downPayment.whenAvailable(state.price)} kr</b></td>
                </tr>
                <tr>
                  <td>15%</td>
                  <td><b>{downPayment.total(state.price)} kr</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Taxes</h5>
            <table class="card-table table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lagfart</td>
                  <td>1,5%</td>
                  <td><b>{ lagfart(state.price) } kr</b></td>
                </tr>
                <tr>
                  <td>Pantbrev</td>
                  <td>2%</td>
                  <td><b>{ pantbrev(state.getLoan(), state.pantbrev) } kr</b></td>
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
            <h5 class="card-title">Monthly expenses</h5>
            <p class="card-text">
              Your amortization rate is: <b>{ amortizationPercent(state.price, state.getLoan(), state.getCombinedSalary()) * 100 }%</b>.
              {#if loanToDebtRatioPercent(state.getLoan(), state.getDebtRatio()) > 0}
                Because your loan is higher than the debt ratio 1% is added.
              {/if}
              {#if loanToValuePercent(state.price, state.getLoan()) > 0}
                Because amortization of your loan requires by law {loanToValuePercent(state.price, state.getLoan()) * 100}%.
              {/if}
            </p>
            <table class="card-table table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Amount (kr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>for a whole year</td>
                  <td><b>{ amortization(state.price, state.getLoan(), state.getCombinedSalary()) } kr</b></td>
                </tr>
                <tr>
                  <td>for a month</td>
                  <td><b>{ amortizationMonth(state.price, state.getLoan(), state.getCombinedSalary()) } kr</b></td>
                </tr>
                <tr>
                  <td>for a month per person</td>
                  <td><b>{ amortizationMonthBorrower(state.price, state.getLoan(), state.getCombinedSalary(), state.borrowers.length) } kr</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
