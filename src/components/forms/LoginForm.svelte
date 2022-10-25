<script>
  import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
  import GoogleSignInLogo from "../image/GoogleSignInLogo.svelte"
  import BpbvTransparent from "../image/BpbvTransparent.svelte"
  
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const GoogleSignIn = () => signInWithRedirect(auth, provider);

  const getSignInInfo = () => {

    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("token: " + token);
      console.log("user: " + JSON.stringify(result.user));
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  
</script>

<div class="grid grid-flow-row gap-10 auto-rows-max p-12">
  <h1 class="text-center text-primary font-bold text-2xl">Welcome Please sign in Below</h1>
  
  <button type="submit" on:click={GoogleSignIn} class="mx-auto my-10 bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><GoogleSignInLogo /></button>
  
  <!-- <div class="row-span-6"></div> -->
  <div class="mx-auto row-start-6">
    <BpbvTransparent />
  </div>
  
  <div class="mx-auto row-start-7">
    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Read the <a href="/tos" class="text-primary hover:underline dark:text-blue-500">terms and conditions</a>.</label>
  </div>
</div>