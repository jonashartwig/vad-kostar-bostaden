<script>
	import { _ } from "svelte-i18n";

	import { loadFromFile } from "../modules/save";
	import toastr from "../modules/toastr";
	import { Type } from "../dto/type";
	import CollapsableSection from "./CollapsableSection.svelte";

	export let state;

	$: isHouse = state.isHouse()
	$: isAppartment = state.isAppartment()

	function asHouse() {
		state.type = Type.HOUSE
	}

	function asAppartment() {
		state.type = Type.APPARTMENT
	}

	function loadFile(event) {
		toastr(
			state.getLanguageOrDefault(),
			loadFromFile(event.target.files)
				.then(loadedState => state = loadedState)
		)
	}
</script>

<section>
	<div class="container">
		<CollapsableSection>
			<span slot="introduction">
				<p>
					{ $_("introduction.welcome") }
				</p>
				{ $_("introduction.dataPolicy") }
			</span>
			<span slot="help">
				{ $_("introduction.motivation") }
			</span>
	    <div class="row" slot="content">
	      <div class="col">
	        <p>
	          { $_("introduction.type") }
						<input type="file" on:change={loadFile} />
	        </p>
	      </div>
	    </div>
	    <div class="row" slot="content">
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
		</CollapsableSection>
	</div>
</section>
