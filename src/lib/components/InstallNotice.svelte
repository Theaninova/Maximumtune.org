<script lang="ts">
  import {useRegisterSW} from "virtual:pwa-register/svelte"

  const {offlineReady, needRefresh, updateServiceWorker} = useRegisterSW({
    onRegistered(serviceWorker) {
      console.log("ServiceWorker registered:", serviceWorker)
    },
    onRegisterError(error) {
      console.log("ServiceWorker registration error", error)
    },
  })

  function close() {
    offlineReady.set(false)
    needRefresh.set(false)
  }

  $: showNotice = $offlineReady || $needRefresh
</script>

{#if showNotice}
  <div class="install-notice">
    {#if $offlineReady}
      <button on:click={close}>x</button>
      App is now offline-ready.
    {/if}
    {#if $needRefresh}
      <button on:click={() => updateServiceWorker(true)}>Update</button>
    {/if}
  </div>
{/if}

<style>
  @media (display-mode: standalone), (min-width: 481px) {
    .install-notice {
      display: none;
    }
  }
</style>
