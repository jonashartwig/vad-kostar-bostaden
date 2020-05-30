<script>
  import { _ } from "svelte-i18n";
  import { v4 } from "uuid";

  const id = v4(),
    idHelp = `${id}-show-help`,
    multiCollapseClassname = `multi-collapse-${id}`,
    SLOTS = $$props.$$slots;
</script>

<div class="row">
  <div class="col">
    <p>
      <slot name="introduction" />
      <a class="{multiCollapseClassname} badge collapse show collapse-no-transition"
        class:d-none={!SLOTS.help}
        data-toggle="collapse" href="#{id}" role="button"
        aria-expanded="true" aria-controls="{id} {idHelp}"
        data-target=".{multiCollapseClassname}" id="{idHelp}"
        >
        { $_("showMore") }...
      </a>
    </p>
  </div>
</div>
<div class="row collapse {multiCollapseClassname}" class:d-none={!SLOTS.help} id={id}>
  <div class="col">
    <slot name="help" />
    <a data-toggle="collapse" data-target=".{multiCollapseClassname}"
      href="#{id}-help" class="badge" role="button" aria-expanded="false"
      aria-controls="{id} {idHelp}">
      { $_("showLess") }...
    </a>
  </div>
</div>
