<script>
	import { _ } from "svelte-i18n";

  import { Type } from "../dto/type";
  import CollapsableIntroduction from "./CollapsableIntroduction.svelte"

  export let state;

  $: isHouse = state.isHouse()
  $: isAppartment = state.isAppartment()

  function asHouse() {
    state.type = Type.HOUSE
  }

  function asAppartment() {
    state.type = Type.APPARTMENT
  }
</script>

<section>
	<div class="container">
		<CollapsableIntroduction>
			<span slot="introduction">
				<p>
					{ $_("introduction.welcome") }
				</p>
				{ $_("introduction.dataPolicy") }
			</span>
			<span slot="help">
				{ $_("introduction.motivation") }
			</span>
		</CollapsableIntroduction>
    <div class="row">
      <div class="col">
        <p>
          { $_("introduction.type") }
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <button type="button" class="btn text-center" on:click={asAppartment} class:selected={isAppartment}>
          <i class="fas fa-building fa-3x"></i>
          <br />
          { $_("introduction.appartment") }
        </button>
      </div>
      <div class="col text-center">
        <button type="button" class="btn text-center" on:click={asHouse} class:selected={isHouse}>
          <i class="fas fa-home fa-3x"></i>
          <br />
          { $_("introduction.house") }
        </button>
      </div>
    </div>
	</div>
</section>
