<script>
	import * as down_payment from './mortgage/down_payment.ts'
	export let name;
	export let price = 0;
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<input type="number" bind:value={price} on:change={ value => price = value } />

<h1>Hello {name}!</h1>
{down_payment.total(price || 0)}
