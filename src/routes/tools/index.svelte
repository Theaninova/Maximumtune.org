<script context="module">
  export const prerender = true
  export const hydrate = false
</script>

<script>
  import CalculatorSelector from "../../lib/components/CalculatorSelector.svelte"
</script>

<svelte:head>
  <title>Tools</title>
  <meta name="description" content="Tools for Wangan Midnight Maximum Tune" />
</svelte:head>

<CalculatorSelector />
