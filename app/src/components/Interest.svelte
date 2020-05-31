<script>
  import { _, number } from "svelte-i18n";

  import CollapsableSection from "./CollapsableSection.svelte";

  export let state;
</script>

<CollapsableSection let:minimized>
  <span slot="title">
    { $_("interest.title") }
  </span>
  <span slot="introduction">
    { $_("interest.introduction") }
  </span>
  <div class="row" slot="content" class:d-none={minimized}>
    <div class="col">
      <input type=range bind:value={state.interest} min=0.005 max=0.05 step=0.0001>
    </div>
  </div>
  <div class="row" slot="content" class:d-none={minimized}>
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
</CollapsableSection>
