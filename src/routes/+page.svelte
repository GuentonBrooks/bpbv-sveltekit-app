<script>
  import { goto } from '$app/navigation'; 
  import { userState } from '../store/user'
  import { fetchCurrentUserInfoAsync } from '../firebaseDatabase';

  import MainBackground from "../components/image/MainBackground.svelte";
  import Login from "../components/containers/Login.svelte";
  import BottomBar from "../components/containers/BottomBar.svelte";

  userState.subscribe((user) => {
    if (user) {
      fetchCurrentUserInfoAsync()
        .then(() => { goto('/home') })
        .catch((err) => console.error(err))
    }
  });
</script>

<MainBackground />
<Login />
<BottomBar />
