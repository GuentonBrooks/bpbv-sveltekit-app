<script>
	import { scanModel, storeFirstScanByUidAsync } from "../../firebase/firstScan";
	import { selectedUserFirstScanState } from "../../store/scan";
	import UserSelectDropdown from "./UserSelectDropdown.svelte";

  let selectedUser;
  selectedUserFirstScanState.subscribe((scanState) => selectedUser = scanState);

  let age;
  let sex;
  let len;
  let weight;
	let bmi;
	let bodyFatPercent;
	let muscleMassPercent;
	let baseMetabolicRate;
	let visceralFatLevel;
	let bodyAge;
  let advice;

  const update = (scan) => {
    const scanUpdate = { ...scanModel(), ...scan };
    if (age) scanUpdate.age = age;
    if (sex) scanUpdate.sex = sex;
    if (len) scanUpdate.len = len;
    if (weight) scanUpdate.weight = weight;
    if (bmi) scanUpdate.bmi = bmi;
    if (bodyFatPercent) scanUpdate.bodyFatPercent = bodyFatPercent;
    if (muscleMassPercent) scanUpdate.muscleMassPercent = muscleMassPercent;
    if (baseMetabolicRate) scanUpdate.baseMetabolicRate = baseMetabolicRate;
    if (visceralFatLevel) scanUpdate.visceralFatLevel = visceralFatLevel;
    if (bodyAge) scanUpdate.bodyAge = bodyAge;
    if (advice) scanUpdate.advice = advice;

    storeFirstScanByUidAsync(scan.uid, scanUpdate)
      .then(() => console.log("stored"))
      .catch((err) => console.error(err))
  };
</script>

<div class="pt-24 px-10">
  <div class="sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">

      <!-- Top Left Section -->
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-600">Please Handle personal employee information with care.</p>
        </div>
        <UserSelectDropdown />

        {#if selectedUser}
        <div class="grid grid-cols-3">
          <div class="col-span-1 py-2 px-4"><img class="rounded-full" src={selectedUser.photoURL} width="40" height="40" alt={selectedUser.displayName}></div>
          <p class="col-span-2 block py-2 px-4 font-bold">{selectedUser.displayName}</p>
          
          <p class="col-span-1 block py-2 px-4">Email :</p>
          <p class="col-span-2 block py-2 px-4 font-bold">{selectedUser.email}</p>
        </div>
        {/if}
      </div>

      <!-- Top Right Section -->
      <div class="mt-5 md:col-span-2 md:mt-0">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">

              <div class="col-span-1">
                <p class="block mb-1 font-medium text-gray-700">Age</p>
                <input type="text" name="age" placeholder={ selectedUser && selectedUser.age || "Age"} bind:value={age}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              
              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">Sexe</p>
                <input type="text" name="gender" placeholder={selectedUser && selectedUser.sex || "Sexe"} bind:value={sex}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-3">
                <p class="block mb-1 font-medium text-gray-700">Length</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.len || "Length"} bind:value={len}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">Weight</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.weight || "Weight"} bind:value={weight}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">BMI</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.bmi || "BMI"} bind:value={bmi}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">MuscleMass %</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.muscleMassPercent || "Muscle Mass %"} bind:value={muscleMassPercent}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">Base Metabolic Rate</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.baseMetabolicRate || "Base Metabolic Rate"} bind:value={baseMetabolicRate}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              
              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">Visceral Fat</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.visceralFatLevel || "Visceral Fat Level"} bind:value={visceralFatLevel}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              
              <div class="col-span-2">
                <p class="block mb-1 font-medium text-gray-700">Body Age</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.bodyAge || "Body Age"} bind:value={bodyAge}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-6">
                <p class="block mb-1 font-bold text-gray-700">BodyFat %</p>
                <input type="text" name="length" placeholder={selectedUser && selectedUser.bodyFatPercent || "Body Fat %"} bind:value={bodyFatPercent}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>            
            </div>
          </div>

          {#if selectedUser}
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button on:click={() => update(selectedUser)} class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
            </div>
          {/if}

        </div>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>
  </div>


  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="mt-5 text-lg font-medium leading-6 text-gray-900">Advice (Optional)</h3>
          <p class="mt-1 text-sm text-gray-600">Optionally health advice can be recorded for each employee</p>
        </div>
      </div>

      <div class="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-3 gap-6">

                <div class="col-span-3">
                  <p class="block mb-1 font-medium text-gray-700">Health Advice</p>
                  <textarea rows="5" placeholder={selectedUser && selectedUser.advice || "(Optional Advice)"} bind:value={advice}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                
              </div>

             
            {#if selectedUser}
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button on:click={() => update(selectedUser)} class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
            </div>
            {/if}

          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>
  </div>
</div>
