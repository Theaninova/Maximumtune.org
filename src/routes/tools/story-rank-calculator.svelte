<script context="module">
  export let prerender = true
</script>

<script>
  import {calculateStoryRank} from "$lib/rank-calculator.ts"
  import "$lib/style/table.scss"
  import "$lib/style/rank-themes.scss"
  import RankHeader from "../../lib/components/RankHeader.svelte"
  import CalculatorHeader from "../../lib/components/CalculatorHeader.svelte"

  export let rankConfig
  export let input = Object.fromEntries(Object.entries(rankConfig).map(([key]) => [key, 0]))

  const themes = {
    N: "neutral",
    C: "blue",
    B: "green",
    A: "yellow",
    S: "orange",
    SS: "red",
    SSS: "pink",
    SSSS: "gold",
    SSSSS: "rainbow",
    SSSSSS: "leather",
  }

  $: result = calculateStoryRank(input, rankConfig)
</script>

<svelte:head>
  <title>Story Rank Calculator</title>
  <meta name="description" content="Story Rank Calculator for Wangan Midnight Maximum Tune" />
</svelte:head>

<main>
  <h1 style="min-height: 43px">Story Rank Calculator</h1>

  <form>
    <table class="input">
      <thead>
        <RankHeader />
      </thead>
      <tr>
        {#each Object.keys(rankConfig) as medalName}
          <td
            ><input
              on:change={event => (input = {...input, [medalName]: Number(event.target.value)})}
              id={medalName}
              type="number"
              placeholder="0"
              name={medalName}
            /></td
          >
        {/each}
      </tr>
    </table>
  </form>

  <section class="center">
    <h2 class="rank-theme-{themes[result.name]}">
      {result.name}{result.number ?? ""}
    </h2>
  </section>

  <CalculatorHeader />
</main>

<style lang="scss">
  @import "../../lib/style/theme.scss";

  h2 {
    min-height: 32px;

    border-radius: 16px;
    font-stretch: 150%;
    padding: 0 60px;
    box-shadow: none;
  }
</style>
