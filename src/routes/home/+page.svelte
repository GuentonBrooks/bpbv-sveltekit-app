<script>
  import TopBar from "../../components/containers/TopBar.svelte"
	import BpbvTable from "../../components/forms/BpbvTable.svelte";
	import { fetchAllUsersAsync } from "../../firebaseDatabase";
	import { dbUsersState } from "../../store/user";

  dbUsersState.subscribe((dbUsers) => {
    if (!dbUsers) {
      console.log("fetching users from database...");
      fetchAllUsersAsync()
        .then((users) => dbUsersState.set(users))
        .catch((err) => console.error(err))
    }
  })
</script>

<TopBar />
<BpbvTable />
