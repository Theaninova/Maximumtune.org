<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({error, status}) {
    return {
      props: {
        status: status,
        error: error.message,
      },
    }
  }
</script>

<script>
  export let status
  export let error
</script>

<svelte:head>
  <title>{status}</title>
  <meta name="description" content={error.message} />
</svelte:head>

<main>
  <article>
    <h1>{status}</h1>

    <p>{error}</p>
  </article>
</main>
