<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let borrower;
</script>

<div class="row">
  <div class="col">
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-name" class="form-control" placeholder="Name" type="text" bind:value={borrower.name} />
      <label for="borrower-{borrower.getId()}-name">Name</label>
    </div>
  </div>
  <div class="col">
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-salary" class="form-control" placeholder="Salary" type="number" bind:value={borrower.salary} />
      <label for="borrower-{borrower.getId()}-salary">Salary</label>
    </div>
  </div>
  <div class="col">
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-cash" class="form-control" placeholder="Cash" type="number" bind:value={borrower.downPayment} />
      <label for="borrower-{borrower.getId()}-cash">Cash</label>
    </div>
  </div>
  <div class="col">
    <button type="button" class="btn btn-default" on:click={ () => dispatch("remove", borrower.getId()) }>
      <span class="fas fa-minus"></span>
    </button>
  </div>
</div>
