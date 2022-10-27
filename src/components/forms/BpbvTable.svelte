<script>
	import BpbvTableBody from "../containers/BpbvTableBody.svelte";
  import BpbvTableHead from "../containers/BpbvTableHead.svelte";
</script>

<section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
  <div class="flex flex-col justify-center h-full">
    <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        
        <!-- Header Text -->
        <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">Bet Pa Baha Vet Start Standings</h2>
        </header>
        
        <!-- Table -->
        <div class="p-3">
            <div class="overflow-x-auto">
                <table class="table-auto w-full">
                    <BpbvTableHead />
                    <BpbvTableBody />
                </table>
            </div>
        </div>
    </div>
  </div>
</section>