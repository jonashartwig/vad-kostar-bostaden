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
        <p>
          Now the expensive part. Let us sum up the coming expenses. We group them in four parts: down payment, fees, monthly costs for amortization and intrest.
          <a id="expenses-show-help" data-toggle="collapse" data-target=".multi-collapse-expenses" href="#expenses-help" class="badge collapse show multi-collapse-expenses collapse-no-transition" role="button" aria-expanded="true" aria-controls="expenses-help-1 expenses-help-2 expenses-show-help">Read more...</a>
        </p>
				<p class="collapse multi-collapse-expenses" id="expenses-help-1">
          Down payment is made in 2 steps. The first step is payed immidiately after you sign the contract finalizing the affair. This fee is set to 10%.
          The second fee is payed when the estate is handed over to you and it is ready to move in. It is set to 5%. In total that is 15%.
        </p>
				<p class="collapse multi-collapse-expenses" id="expenses-help-2">
          There are two fees that have to be payed: mortgage deed and title deed.
          The title deed is payed within three months after you bought the estate. It is payed to Lantmäteriet and registers you as the new owner.
          An additional fee is required of 825kr to create new title deed. It is calculates as 1,5% of the total value of the purchase. If you buy a hous worth 5000000kr then title deed is 1,5% of 5000000kr which calculates to 75000kr.
          See section estate for information about mortgage deed.
          <a data-toggle="collapse" data-target=".multi-collapse-expenses" href="#expenses-help" class="badge" role="button" aria-expanded="true" aria-controls="expenses-show-help">Show less...</a>
        </p>
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
