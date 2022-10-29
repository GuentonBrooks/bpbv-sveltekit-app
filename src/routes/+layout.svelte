<script>
  import "../app.css";

  import { onMount } from 'svelte';
  import { goto } from "$app/navigation"; 
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from '../firebase/auth';
	import { fetchCurrentUserFirstScan } from "../firebase/firstScan";
	import { fetchCurrentUser } from "../firebase/users";
  import { currentUserState } from '../store/user'
  
  onMount(() => {
    onAuthStateChanged(auth, (user) => user && fetchCurrentUser());

    currentUserState.subscribe((userState) => {
      if (!userState) return goto('/');
      fetchCurrentUserFirstScan();
    });

  });

</script>

<div class="h-screen">
  <slot />
</div>