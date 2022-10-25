import { readable } from 'svelte/store'

function createAuth() {
  const { subscribe } = readable(undefined)

  function sign_in() {
    // trigger sign-in
  }

  function sign_out() {
    // trigger sign-out
  }

  return {
    subscribe,
    sign_in,
    sign_out,
  }
}

export const auth = createAuth()