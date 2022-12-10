<script>
  import TopBar from "../../components/containers/TopBar.svelte"
	import FlatAlert from "../../components/containers/FlatAlert.svelte";
	import FirstScanForm from "../../components/forms/FirstScanForm.svelte";
	import FinalScanForm from "../../components/forms/FinalScanForm.svelte";
	import AdminBar from "../../components/containers/AdminBar.svelte";

  let isFirstScan = true;
</script>

<TopBar />
<FlatAlert />
<AdminBar bind:isFirstScan={isFirstScan} />

<div>
  {#if isFirstScan}
     <FirstScanForm />
  {:else}
    <FinalScanForm />
  {/if}
</div>
