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
        This section contains information about the estate. Please enter the price and the existing pantbrev. Each estate has existing pantbrev.You can use both fields to investigate how your expanses might change.
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
