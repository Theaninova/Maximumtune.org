<script>
  import {page} from "$app/stores"
</script>

<svelte:head>
  <title>{$page.status}</title>
  <meta name="description" content={$page.error.message} />
</svelte:head>

<article>
  <h1>{$page.status}</h1>

  <p>{$page.error.message}</p>
</article>
