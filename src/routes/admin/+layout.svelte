<script>
	import { onMount } from "svelte";
	import { fetchAllUserFirstScans } from "../../firebase/firstScan";
	import { firstScansState } from "../../store/scan";

  onMount(() => {
    firstScansState.subscribe((state) => !state && fetchAllUserFirstScans());
  });
</script>

<slot />