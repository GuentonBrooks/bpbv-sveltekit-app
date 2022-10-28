<script>
	import { onMount } from "svelte";
  import { goto } from "$app/navigation";
	import { fetchAllUserFirstScansAsync, initCurrentUserFirstScanAsync } from "../../firebase/firstScan";
	import { userState } from "../../store/user";
	import { firstScansState, currentUserFirstScanState } from "../../store/scan";
  
  import TopBar from "../../components/containers/TopBar.svelte"
	import BpbvTable from "../../components/forms/BpbvTable.svelte";

  let user;
  let currentUserFirstScan;
  let firstScans;

  userState.subscribe((currentUserState) => user = currentUserState);
  currentUserFirstScanState.subscribe((scanState) => currentUserFirstScan = scanState);
  firstScansState.subscribe((scansState) => firstScans = scansState);

  console.log(currentUserFirstScan);
  
  onMount(() => {
    if (!user) return goto('/');

    if (!currentUserFirstScan) {
      console.log("synchronyzing current user to scan DB...");
      initCurrentUserFirstScanAsync()
        .then((scan) => currentUserFirstScanState.set(scan))
        .catch((err) => console.error(err))
    }

    if (!firstScans) {
      console.log("fetching First Scan Information from DB...");
      fetchAllUserFirstScansAsync()
        .then((scans) => firstScansState.set(scans))
        .catch((err) => console.error(err))
    }
  });
</script>

<TopBar />
<BpbvTable />
