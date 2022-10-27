<script>
  import { beforeUpdate } from 'svelte';
  import { goto } from '$app/navigation'; 
  import { userState } from '../store/user'

  import MainBackground from "../components/image/MainBackground.svelte";
  import Login from "../components/containers/Login.svelte";
  import BottomBar from "../components/containers/BottomBar.svelte";

  export let data;
  console.log(data);

  beforeUpdate(() => data.hasUser ? goto('/home') : null);
</script>

<MainBackground />
<Login />
<BottomBar />
