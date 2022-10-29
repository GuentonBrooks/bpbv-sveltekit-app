<script>
	import { afterUpdate, onMount } from 'svelte';
  import { goto } from '$app/navigation'; 
  import { currentUserState } from '../store/user'
  import { fetchCurrentUser } from '../firebase/users';

  import MainBackground from "../components/image/MainBackground.svelte";
  import Login from "../components/containers/Login.svelte";
  import BottomBar from "../components/containers/BottomBar.svelte";

  onMount(() => {
    currentUserState.subscribe((state) => state && goto('/home'))
  });
</script>

<MainBackground />
<Login />
<BottomBar />
