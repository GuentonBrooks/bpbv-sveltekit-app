<script>
	import { onMount } from "svelte";
	import { fetchAllUserFinalScans, fetchCurrentUserFinalScan } from "../../firebase/finalScan";
	import { finalScansState, currentUserFinalScanState } from "../../store/scan";
  
  onMount(() => {
    currentUserFinalScanState.subscribe((state) => !state && fetchCurrentUserFinalScan())
    finalScansState.subscribe((state) => !state && fetchAllUserFinalScans());
  });
</script>

<slot />
