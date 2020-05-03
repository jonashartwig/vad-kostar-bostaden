<script>
  import * as downPayment from "../mortgage/down_payment";
	import lagfart from "../mortgage/lagfart"
	import pantbrev from "../mortgage/pantbrev";
	import amortization from "../mortgage/amortization";
	import amortizationPercent from "../mortgage/amortization_percent";
	import amortizationMonth from "../mortgage/amortization_month";
	import amortizationMonthBorrower from "../mortgage/amortization_month_borrower";

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
        <h3>Down Payment</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          Down payment (when signed): {downPayment.whenSigned(state.price)}
          Down payment (when handed over): {downPayment.whenAvailable(state.price)}
          Down payment (total): {downPayment.total(state.price)}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>Lagfart</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          Lagfart is a fee required to pay to register you as the new owner. Lagfart is 1,5% of the estate price. The money goes to lantmäteriet.
          You need to apply for lagfart within 3 months of the purchase. An administrative fee is required of 825 kr.
          The lagfart for your estate will be: { lagfart(state.price) }
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>Pantbrev</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          Pantbrev is an insurance for your bank on the value of the estate. It is paid to lantmäteriet. It is 2% of the loan minus existing pantbrev.
          In addition an administration fee of 375 kr is taken.
          The pantbrev for your estate will be: { pantbrev(state.getLoan(), state.pantbrev) }
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>Monthly expenses</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          This section contains a list of monthly expenses.
          Your amortization rate is: { amortizationPercent(state.price, state.getLoan(), state.getCombinedSalary()) * 100 }%
          That sums up the amortization per year to be: { amortization(state.price, state.getLoan(), state.getCombinedSalary()) }, which makes it { amortizationMonth(state.price, state.getLoan(), state.getCombinedSalary()) } per month.
          On a loan taker level that will be { amortizationMonthBorrower(state.price, state.getLoan(), state.getCombinedSalary(), state.borrowers.length) } per month.
        </p>
      </div>
    </div>
  </div>
</section>
