<script>
  import { _, number } from "svelte-i18n";

  export let state;
</script>

<section>
	<div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>{ $_("interest.title") }</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          { $_("interest.introduction") }
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input type=range bind:value={state.interest} min=0.005 max=0.05 step=0.001>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          {
            $_({
              id: "interest.summary",
              values: {
                interestPercent: $number(state.interest * 100),
                loan: $number(state.getLoan()),
                amountPerYear: $number(state.interest * state.getLoan())
              }
            })
          }
        </p>
      </div>
    </div>
  </div>
</section>
