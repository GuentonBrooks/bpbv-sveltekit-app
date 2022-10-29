<script>
  import "../app.css";

  import { onMount } from 'svelte';
  import { goto } from "$app/navigation"; 
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from '../firebase/auth';
  import { userState } from '../store/user'

  let user;
  userState.subscribe((currentUserState) => user = currentUserState);
  
  onMount(() => {
    onAuthStateChanged(auth, (user) => userState.set(user));
    if (!user) goto('/');
  });

</script>

<div class="h-screen">
  <slot />
</div>