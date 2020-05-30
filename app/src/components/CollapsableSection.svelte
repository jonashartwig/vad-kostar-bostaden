<script>
  import { _ } from "svelte-i18n";
  import { v4 } from "uuid";

  import CollapsableIntroduction from "./CollapsableIntroduction.svelte";

  const id = v4(),
    SLOTS = $$props.$$slots
</script>

<section>
  <div class="container">
    <div class="row vkb-secondary-color" class:d-none={!SLOTS.title}>
      <div class="col">
        <h2><slot name="title" /></h2>
      </div>
    </div>
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
    <slot name="content" />
  </div>
</section>
