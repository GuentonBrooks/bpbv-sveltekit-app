<script>
	import { onMount } from "svelte";
	import { fetchAllUserFirstScans, storeCurrentUserFirstScanAsync } from "../../firebase/firstScan";
	import { firstScansState, currentUserFirstScanState } from "../../store/scan";

  let currentUserFirstScan;
  let firstScans;

  currentUserFirstScanState.subscribe((scanState) => currentUserFirstScan = scanState);
  firstScansState.subscribe((scansState) => firstScans = scansState);
  
  onMount(() => {
    if (!currentUserFirstScan) {
      console.log("synchronyzing current user to scan DB...");
      storeCurrentUserFirstScanAsync()
        .catch((err) => console.error(err))
    }

    if (!firstScans) fetchAllUserFirstScans()
  });
</script>

<slot />
