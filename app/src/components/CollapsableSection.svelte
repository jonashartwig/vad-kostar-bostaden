<script>
  import { _ } from "svelte-i18n";
  import { v4 } from "uuid";

  import CollapsableIntroduction from "./CollapsableIntroduction.svelte";

  const id = v4(),
    SLOTS = $$props.$$slots;

  let minimized = false;
</script>

<section>
  <div class="container">
    <div class="row vkb-secondary-color" class:d-none={!SLOTS.title}>
      <div class="col-11">
        <h2><slot name="title" /></h2>
      </div>
      <div class="col-1 pointer" on:click={() => minimized = !minimized}>
        <i class="fas fa-chevron-up align-bottom" class:d-none={!minimized}></i>
        <i class="fas fa-chevron-down align-bottom" class:d-none={minimized}></i>
      </div>
    </div>
    {#if !minimized}
      {#if !SLOTS.help}
        <CollapsableIntroduction>
          <span slot="introduction">
            <slot name="introduction" />
          </span>
        </CollapsableIntroduction>
      {:else}
        <CollapsableIntroduction>
          <span slot="introduction">
            <slot name="introduction" />
          </span>
          <span slot="help">
            <slot name="help" />
          </span>
        </CollapsableIntroduction>
      {/if}
    {/if}
    <slot name="content" minimized={minimized} />
  </div>
</section>
