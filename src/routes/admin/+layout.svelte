<script>
	import { onMount } from "svelte";
	import { fetchAllUserFirstScans } from "../../firebase/firstScan";
	import { firstScansState } from "../../store/scan";

  let firstScans;

  firstScansState.subscribe((scansState) => firstScans = scansState);
  
  onMount(() => {
    if (!firstScans) fetchAllUserFirstScans()
  });
</script>

<slot />