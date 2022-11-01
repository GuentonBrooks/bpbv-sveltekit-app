<script>
	import { getCurrentUserId } from "../../firebase/auth";
	import { scanModel, storeCurrentUserFinalScan } from "../../firebase/finalScan";
	import { finalScansState, currentUserFinalScanState } from "../../store/scan";

  let finalScans;
  let currentUserFinalScan;
  finalScansState.subscribe((scans) => scans ? finalScans = scans : finalScans = []);
  currentUserFinalScanState.subscribe((state) => currentUserFinalScan = state);
  
  let uid = getCurrentUserId();
  let displayName;
  let age;
  let sex;

  const update = () => {
    const scanUpdate = { ...scanModel(), ...currentUserFinalScan };
    if (displayName) scanUpdate.displayName = displayName;
    if (age) scanUpdate.age = age;
    if (sex) scanUpdate.sex = sex;

    storeCurrentUserFinalScan(scanUpdate);
  };
</script>

<tbody class="text-sm divide-y divide-gray-100">
  {#each finalScans as scan (scan.uid)}
  <tr>
		<td class="p-2 whitespace-nowrap">
      <div class="flex items-center">
        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src={scan.photoURL} width="40" height="40" alt={scan.displayName}></div>
          {#if scan.uid === uid}
            <input type="text" class="font-medium text-gray-800" placeholder={scan.displayName} bind:value={displayName}>
          {:else}
            <div class="font-medium text-gray-800">{scan.displayName}</div>
          {/if}
      </div>
    </td>

    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.email || "N/A"}</div>
    </td>

    <td class="p-2 whitespace-nowrap">
      {#if scan.uid === uid}
        <input type="text" name="age" class="w-12 text-lg text-left" placeholder={scan.age} bind:value={age}>
      {:else if scan.age}
        <div class="text-left">{scan.age}</div>
      {:else}
        <div class="text-left">??</div>
      {/if}
    </td>

    <td class="p-2 whitespace-nowrap">
      {#if scan.uid === uid}
        <input type="text" name="age" class="w-12 hover:border-primary text-lg text-center" placeholder={scan.sex || "?"} bind:value={sex}>
      {:else if scan.sex && scan.sex.startsWith("F")}
        <div class="w-12 text-lg text-center font-medium text-pink-500">F</div>
      {:else if scan.sex && scan.sex.startsWith("V")}
        <div class="w-12 text-lg text-center font-medium text-pink-500">F</div>
      {:else if scan.sex && scan.sex.startsWith("M")}
        <div class="w-12 text-lg text-center font-medium text-blue-500">M</div>
      {:else}
        <div class="w-12 text-lg text-center font-medium text-grey-500">?</div>
      {/if}
    </td>

    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.len || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.weight || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.bmi || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left text-gray-800 font-bold">{scan.bodyFatPercent || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.muscleMassPercent || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.baseMetabolicRate || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.visceralFatLevel || "N/A"}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{scan.bodyAge || "N/A"}</div>
    </td>
    
    {#if scan.uid === uid}
      <button on:click={() => update()} type="button" class="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
    {/if}
  </tr>
	{/each}
</tbody>