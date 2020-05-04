<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let borrower;
</script>

<tr>
  <td>
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-name" class="form-control" placeholder="Name" type="text" bind:value={borrower.name} />
      <label for="borrower-{borrower.getId()}-name">Name</label>
    </div>
  </td>
  <td>
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-salary" class="form-control" placeholder="Salary" type="number" bind:value={borrower.salary} />
      <label for="borrower-{borrower.getId()}-salary">Salary</label>
    </div>
  </td>
  <td>
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-cash" class="form-control" placeholder="Cash" type="number" bind:value={borrower.downPayment} />
      <label for="borrower-{borrower.getId()}-cash">Cash</label>
    </div>
  </td>
  <td>
    <button type="button" class="btn btn-danger" on:click={ () => dispatch("remove", borrower.getId()) }>
      Remove
    </button>
  </td>
</tr>
