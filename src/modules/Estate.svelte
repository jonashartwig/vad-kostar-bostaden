<script>
  import { total as requiredDownPayment } from "../mortgage/down_payment";

  export let state;
</script>

<section>
	<div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>Estate</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          Let us now look at your estate. Please enter the price and the existing mortgage deed (pantbrev). When you buy a new house you need to pay tax on the amount you loan.
          <a class="badge collapse show multi-collapse-estate collapse-no-transition" data-toggle="collapse" data-target=".multi-collapse-estate" href="#estate-help" role="button" aria-expanded="true" id="estate-show-help" aria-controls="estate-help estate-show-help">Show more...</a>
        </p>
        <p class="collapse multi-collapse-estate" id="estate-help">
          Each house has a mortgage deed (pantbrev) from the previous owner. You have to pay this fee to your bank as a form of insurance. It is calculated based on the prevous existing mortgage deed.
          It is calculated by substracting the existing mortgage deeds from the loan you have to take loan. You have to pay 2% of that amount.
          Imagine you want to buy a house worth 5000000kr. You pay the minimum down payment of 750000kr. That results in a loan of 4250000kr.
          The existing mortgage deeds cover 1200000kr. Then you have to pay 2% of 4250000kr - 1200000kr = 2 % of 3050000kr = 61000kr.
          A fee of 375 kr is taken by Lantmäteriet to buy new mortgage deeds. Each bank takes an additional fee on top of that. Handelsbanken takes 1500 kr, for example. This fee varies by bank. Therefor it is not included in the calculation.
          <a data-toggle="collapse" data-target=".multi-collapse-estate" href="#estate-help" class="badge" role="button" aria-expanded="true" aria-controls="estate-show-help">Show less...</a>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-label-group">
          <input id="estate-price" class="form-control" placeholder="Price" type="text" bind:value={state.price} />
          <label for="estate-price">Price</label>
        </div>
      </div>
      <div class="col">
        <div class="form-label-group">
          <input id="estate-pantbrev" class="form-control" placeholder="Pantbrev" type="text" bind:value={state.pantbrev} />
          <label for="estate-pantbrev">Pantbrev</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          The resulting loan will be: <b>{ state.getLoan() } kr</b>.
        </p>
        {#if state.getCombinedDownPayment() }
          The loan is based on the <u>combined down payment</u> from the assets of: <b>{state.getCombinedDownPayment()} kr</b>.
          {#if state.getCombinedDownPayment() < requiredDownPayment(state.price) }
          The available down payment is not enouth. You need to invest <b>{requiredDownPayment(state.price) - state.getCombinedDownPayment()} kr</b> more.
          {/if}
        {:else}
          <p>
            The loan is based on the minimum required <u>down payment</u> of: <b>{requiredDownPayment(state.price)} kr</b>.
          </p>
        {/if}
      </div>
    </div>
  </div>
</section>
