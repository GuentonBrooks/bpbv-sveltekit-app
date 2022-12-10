<script>
	import { finalScansState, selectedUserFinalScanState } from "../../store/scan";

  let finalScans;
  let isOpen = false;
  
  finalScansState.subscribe((scansState) => finalScans = scansState);
  
  const toggelOpen = () => isOpen = !isOpen

  const selectUser = (scan) => {
    selectedUserFinalScanState.set(scan);
    isOpen = false;
  };
</script>

<div class="grid grid-cols-1 p-8">
  <!-- Button -->
  <button on:click={toggelOpen} class="grid-span-1 justify-center text-white bg-blue-700 hover:bg-blue-800 {isOpen && "ring-4 outline-none ring-blue-300"} font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">User Select <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

  <!-- Dropdown -->
  <div class="{!isOpen && "hidden"} grid-span-1 justify-center bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" style="inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 10px);" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
      {#each finalScans as scan (scan.uid)}
        <li>
          <button on:click={() => selectUser(scan)} class="flex py-1">
            <div class="w-10 h-10 flex-shrink-0 ml-2"><img class="rounded-full" src={scan.photoURL} width="40" height="40" alt={scan.displayName}></div>
            <p class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{scan.displayName}</p>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
  