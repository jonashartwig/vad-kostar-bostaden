<script>
  import { total as requiredDownPayment } from "../mortgage/down_payment";

  export let state;
</script>

<div class="row">
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
    The resulting loan will be: { state.getLoan() }
    {#if state.getCombinedDownPayment() }
      The loan is based on the combined down payment from the assets of: {state.getCombinedDownPayment()}
    {:else}
      The loan is based on the minimum required downPayment of: {requiredDownPayment(state.price)}
    {/if}
  </div>
</div>
