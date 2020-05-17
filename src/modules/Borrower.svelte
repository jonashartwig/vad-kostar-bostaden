<script>
  import { _ } from "svelte-i18n";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let borrower;
</script>

<tr>
  <td>
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-name" class="form-control" placeholder="Name" type="text" bind:value={borrower.name} />
      <label for="borrower-{borrower.getId()}-name">{ $_("borrowers.table.name") }</label>
    </div>
  </td>
  <td>
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-salary" class="form-control" placeholder="Salary" type="number" bind:value={borrower.salary} />
      <label for="borrower-{borrower.getId()}-salary">{ $_("borrowers.table.salaryPerMonth") }</label>
    </div>
  </td>
  <td>
    <div class="form-label-group">
      <input id="borrower-{borrower.getId()}-cash" class="form-control" placeholder="Cash" type="number" bind:value={borrower.downPayment} />
      <label for="borrower-{borrower.getId()}-cash">{ $_("borrowers.table.cash") }</label>
    </div>
  </td>
  <td>
    <button type="button" class="float-right btn btn-danger" on:click={ () => dispatch("remove", borrower.getId()) }>
      { $_("borrowers.table.remove") }
    </button>
  </td>
</tr>
