<script>
  import { googleSignIn } from "../../firebase/auth";

  import GoogleSignInLogo from "../image/GoogleSignInLogo.svelte"
  import BpbvBannerTransparent from "../image/BpbvBannerTransparent.svelte"

  const signIn = () => googleSignIn();
</script>

<div class="grid grid-flow-row gap-10 p-12 h-fit m-auto">
  <div class="mt-auto">
    <div class="w-1/4 mt-auto mx-auto">
      <BpbvBannerTransparent />
    </div>
    <h3 class="text-center text-primary font-bold text-2xl">Welcome Please sign in Below</h3>
  </div>
  
  <button on:click={signIn} class="m-auto bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><GoogleSignInLogo /></button>
  
  <div class="mt-40 mx-auto">
    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Read the <a href="/tos" class="text-primary hover:underline dark:text-blue-500">terms and conditions</a>.</label>
  </div>
</div>