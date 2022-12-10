<script>
	import { onMount } from "svelte";
	import { fetchAllUserFirstScans } from "../../firebase/firstScan";
	import { fetchAllUserFinalScans } from "../../firebase/finalScan";
	import { firstScansState } from "../../store/scan";
	import { finalScansState } from "../../store/scan";

  onMount(() => {
    firstScansState.subscribe((state) => !state && fetchAllUserFirstScans());
    finalScansState.subscribe((state) => !state && fetchAllUserFinalScans());
  });
</script>

<slot />