<script>
  import { _, number } from "svelte-i18n";
  import { total as requiredDownPayment } from "../mortgage/down_payment";
  import { percentage as mortgageDeedPercent, fee as mortgageDeedFee } from "../mortgage/mortgage_deed";
	import amortizationPercent, { loanToDebtRatioPercent, loanToValuePercent, isLoanMoreThenHalfButLessThenLoanLevel, loanLevelValueStep1, loanLevelValueStep2, isLoanHalfOrLessOfPrice } from "../mortgage/amortization_percent";

  export let state;
</script>

<section>
	<div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>{ $_("estate.title") }</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          { $_("estate.introduction") }
          <a class="badge collapse show multi-collapse-estate collapse-no-transition" data-toggle="collapse" data-target=".multi-collapse-estate" href="#estate-help" role="button" aria-expanded="true" id="estate-show-help" aria-controls="estate-help estate-show-help">{ $_("showMore") }...</a>
        </p>
        <p class="collapse multi-collapse-estate" id="estate-help">
          {
            $_({
              id: "estate.example",
              values: {
                mortgageDeedPercent: $number(mortgageDeedPercent * 100),
                price: $number(5000000),
                downPayment: $number(750000),
                loan: $number(4250000),
                mortgageDeed: $number(1200000),
                mortgageDeedRequired: $number(3050000),
                mortgageDeedToPay: $number(61000),
                mortgageDeedFee: $number(mortgageDeedFee),
                bankFee: $number(1500)
              }
            })
          }
          <a data-toggle="collapse" data-target=".multi-collapse-estate" href="#estate-help" class="badge" role="button" aria-expanded="true" aria-controls="estate-show-help">{ $_("showLess") }...</a>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-label-group">
          <input id="estate-price" class="form-control" placeholder="Price" type="text" bind:value={state.price} />
          <label for="estate-price">{ $_("estate.price") }</label>
        </div>
      </div>
      <div class="col">
        <div class="form-label-group">
          <input id="estate-pantbrev" class="form-control" placeholder="Pantbrev" type="text" bind:value={state.pantbrev} />
          <label for="estate-pantbrev">{ $_("estate.mortgageDeed") }</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          { @html
            $_({
              id: "estate.resultingLoan",
              values: {
                loan: $number(state.getLoan())
              }
            })
          }
        {#if state.getCombinedDownPayment() }
          { @html
            $_({
              id: "estate.basedOnExistingDownPayment",
              values: {
                downPayment: $number(state.getCombinedDownPayment())
              }
            })
          }
          {#if state.getCombinedDownPayment() < requiredDownPayment(state.price) }
            { @html
              $_({
                id: "estate.insufficientDownPayment",
                values: {
                  missingAmount: $number(requiredDownPayment(state.price) - state.getCombinedDownPayment())
                }
              })
            }
          {/if}
        {:else}
          { @html
            $_({
              id: "estate.basedOnMinimumDownPayment",
              values: {
                downPayment: $number(requiredDownPayment(state.price))
              }
            })
          }
        {/if}
        </p>
        <p>
          { @html
            $_({
              id: "estate.amortization.summary",
              values: {
                amortizationRate: $number(state.getAmortizationRate() * 100)}
            })
          }
          {#if loanToDebtRatioPercent(state.getLoan(), state.getDebtRatio()) > 0 }
            { $_("estate.amortization.becauseOfDebtRatio") }
          {/if}
          {#if isLoanMoreThenHalfButLessThenLoanLevel(state.price, state.getLoan()) }
            {
              $_({
                id: "estate.amortization.becauseOfLoanLessThan70",
                values: {
                  level1: $number(loanLevelValueStep1 * 100),
                  level2: $number(loanLevelValueStep2 * 100)
                }
              })
            }
          {/if}
          {#if !isLoanHalfOrLessOfPrice(state.price, state.getLoan()) && !isLoanMoreThenHalfButLessThenLoanLevel(state.price, state.getLoan()) }
            {
              $_({
                id: "estate.amortization.becauseOfLoanMoreThan70",
                values: {
                  level: $number(loanLevelValueStep1 * 100)
                }
              })
            }
          {/if}
        </p>
      </div>
    </div>
  </div>
</section>
