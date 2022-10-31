<script>
	import { onMount } from "svelte";
	import { fetchAllUserFirstScans, fetchCurrentUserFirstScan } from "../../firebase/firstScan";
	import { firstScansState, currentUserFirstScanState } from "../../store/scan";
  
  onMount(() => {
    currentUserFirstScanState.subscribe((state) => !state && fetchCurrentUserFirstScan())
    firstScansState.subscribe((state) => !state && fetchAllUserFirstScans());
  });
</script>

<slot />
