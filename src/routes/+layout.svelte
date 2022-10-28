<script>
  import "../app.css";

  import { onMount } from 'svelte'; 
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from '../firebase/auth';
  import { userState } from '../store/user'

  onMount(() => {
    onAuthStateChanged(
      auth,
      (user) => userState.set(user)),
      (err) => console.error(err);
  });
</script>

<div class="h-screen">
  <slot />
</div>